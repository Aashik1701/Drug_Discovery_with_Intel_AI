"""
Asynchronous molecular docking endpoints using AutoDock Vina CLI.

Endpoints:
- POST /api/dock/start
- POST /api/dock/cancel/{task_id}
- GET /api/dock/status/{task_id}
- GET /api/dock/history
- GET /api/dock/receptor/{target}

Design:
- In-memory task registry for MVP polling architecture.
- Background task execution to avoid request timeouts.
- Real physics-based docking via AutoDock Vina CLI binary (subprocess).
- Ligand PDBQT preparation via RDKit + Meeko.
- Cancellation via subprocess PID tracking.
- No mock affinities — real kcal/mol from Vina.
"""

from __future__ import annotations

import logging
import os
import re
import signal
import subprocess
import tempfile
import threading
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Optional

from fastapi import APIRouter, BackgroundTasks, HTTPException

from schemas.docking import (
    DockStartRequest,
    DockStartResponse,
    DockStatusResponse,
)
from utils.rdkit_helper import validate_smiles

logger = logging.getLogger(__name__)
router = APIRouter()

# --- Paths ---
BACKEND_DIR = Path(__file__).resolve().parents[1]
TARGETS_DIR = Path(os.getenv("DOCKING_TARGETS_DIR", BACKEND_DIR / "targets"))
VINA_BIN = Path(os.getenv("VINA_BIN", BACKEND_DIR / "bin" / "vina"))

# --- Target definitions (active site coordinates) ---
TARGET_CONFIG: dict[str, dict[str, Any]] = {
    "cox2": {
        "receptor": "cox2_receptor.pdbqt",
        "center": [22.1, 10.5, -14.3],
        "box_size": [20.0, 20.0, 20.0],
    },
    "ace2": {
        "receptor": "ace2_receptor.pdbqt",
        "center": [15.1, 22.5, 9.0],
        "box_size": [20.0, 20.0, 20.0],
    },
}

# --- Task registry ---
DOCKING_TASKS: dict[str, dict[str, Any]] = {}
DOCKING_TASKS_LOCK = threading.Lock()

# Track running subprocess PIDs for cancellation
_RUNNING_PROCS: dict[str, subprocess.Popen] = {}
_RUNNING_PROCS_LOCK = threading.Lock()


def _utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _set_task(task_id: str, **fields: Any) -> None:
    with DOCKING_TASKS_LOCK:
        task = DOCKING_TASKS.get(task_id)
        if task is None:
            return
        task.update(fields)


def _read_receptor_content(target: str) -> tuple[str, str, Optional[str]]:
    """Read receptor PDBQT content for a target."""
    target_cfg = TARGET_CONFIG[target]
    receptor_name = target_cfg["receptor"]
    receptor_path = TARGETS_DIR / receptor_name

    if receptor_path.exists():
        return receptor_path.read_text(), receptor_name, "file"

    raise FileNotFoundError(
        f"Receptor file not found: {receptor_path}. "
        f"Run `python download_targets.py` to fetch protein structures."
    )


def _prepare_ligand_pdbqt_from_smiles(smiles: str) -> str:
    """Convert SMILES → 3D conformer → PDBQT using RDKit + Meeko."""
    from rdkit import Chem
    from rdkit.Chem import AllChem

    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError("Invalid SMILES string")

    mol = Chem.AddHs(mol)
    params = AllChem.ETKDGv3()
    params.randomSeed = 42
    embed_res = AllChem.EmbedMolecule(mol, params)
    if embed_res == -1:
        embed_res = AllChem.EmbedMolecule(mol, useRandomCoords=True)
        if embed_res == -1:
            raise ValueError("Failed to embed ligand in 3D")

    try:
        AllChem.MMFFOptimizeMolecule(mol, maxIters=300)
    except Exception:
        logger.warning("MMFF optimization skipped for docking ligand")

    from meeko import MoleculePreparation

    preparator = MoleculePreparation()
    setups = preparator.prepare(mol)
    if not setups:
        raise ValueError("Meeko failed to prepare ligand")

    pdbqt_str: Optional[str] = None

    try:
        from meeko import PDBQTWriterLegacy

        pdbqt_str, is_ok, error_msg = PDBQTWriterLegacy.write_string(setups[0])
        if not is_ok:
            raise ValueError(error_msg or "Unable to generate ligand PDBQT")
    except ImportError:
        for setup in setups:
            if hasattr(setup, "write_pdbqt_string"):
                pdbqt_str = setup.write_pdbqt_string()
                break

    if not pdbqt_str:
        raise ValueError("Unable to generate ligand PDBQT from Meeko setup")

    return pdbqt_str


def _parse_vina_stdout(stdout: str) -> list[dict[str, float]]:
    """
    Parse Vina CLI stdout to extract binding affinities.

    Vina output contains lines like:
       1     -7.3      0.000      0.000
       2     -7.1      1.234      2.345
    """
    results: list[dict[str, float]] = []
    # Match lines with: mode_number  affinity  rmsd_lb  rmsd_ub
    pattern = re.compile(r"^\s*(\d+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)", re.MULTILINE)
    for match in pattern.finditer(stdout):
        results.append({
            "mode": int(match.group(1)),
            "affinity": float(match.group(2)),
            "rmsd_lb": float(match.group(3)),
            "rmsd_ub": float(match.group(4)),
        })
    return results


def _is_cancelled(task_id: str) -> bool:
    """Check if a task has been cancelled."""
    with DOCKING_TASKS_LOCK:
        task = DOCKING_TASKS.get(task_id)
        return task is not None and task.get("status") == "cancelled"


def _run_real_docking(smiles: str, target: str, task_id: str = "", exhaustiveness: int = 8) -> dict[str, Any]:
    """
    Execute real AutoDock Vina docking via CLI subprocess.

    Steps:
    1. Convert SMILES → PDBQT ligand (RDKit + Meeko)
    2. Call `vina` CLI with receptor, ligand, search box
    3. Parse affinity from stdout and docked pose from output file
    """
    # Validate prerequisites
    if not VINA_BIN.exists():
        raise FileNotFoundError(
            f"Vina binary not found at {VINA_BIN}. "
            f"Download it from https://github.com/ccsb-scripps/AutoDock-Vina/releases"
        )

    target_cfg = TARGET_CONFIG[target]
    receptor_path = TARGETS_DIR / target_cfg["receptor"]
    if not receptor_path.exists():
        raise FileNotFoundError(
            f"Missing receptor file: {receptor_path}. "
            f"Run `python download_targets.py` to fetch protein structures."
        )

    # Step 1: Prepare ligand PDBQT
    logger.info("Preparing ligand PDBQT for SMILES: %s", smiles[:50])
    ligand_pdbqt = _prepare_ligand_pdbqt_from_smiles(smiles)

    # Check cancellation after ligand prep
    if _is_cancelled(task_id):
        raise RuntimeError("Task cancelled by user")

    # Step 2: Run Vina CLI
    with tempfile.TemporaryDirectory(prefix="drugforge_dock_") as temp_dir:
        temp_path = Path(temp_dir)
        ligand_file = temp_path / "ligand.pdbqt"
        out_file = temp_path / "out.pdbqt"
        ligand_file.write_text(ligand_pdbqt)

        center = target_cfg["center"]
        box = target_cfg["box_size"]
        n_poses = int(os.getenv("DOCKING_N_POSES", "5"))

        cmd = [
            str(VINA_BIN),
            "--receptor", str(receptor_path),
            "--ligand", str(ligand_file),
            "--out", str(out_file),
            "--center_x", str(center[0]),
            "--center_y", str(center[1]),
            "--center_z", str(center[2]),
            "--size_x", str(box[0]),
            "--size_y", str(box[1]),
            "--size_z", str(box[2]),
            "--exhaustiveness", str(exhaustiveness),
            "--num_modes", str(n_poses),
        ]

        logger.info("Running Vina (exhaustiveness=%d): %s", exhaustiveness, " ".join(cmd))

        proc = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )

        # Track PID so we can kill on cancel
        if task_id:
            with _RUNNING_PROCS_LOCK:
                _RUNNING_PROCS[task_id] = proc

        try:
            stdout, stderr = proc.communicate(timeout=600)
        except subprocess.TimeoutExpired:
            proc.kill()
            stdout, stderr = proc.communicate()
            raise RuntimeError("Vina docking timed out after 600 seconds")
        finally:
            if task_id:
                with _RUNNING_PROCS_LOCK:
                    _RUNNING_PROCS.pop(task_id, None)

        # Check if cancelled during execution
        if _is_cancelled(task_id):
            raise RuntimeError("Task cancelled by user")

        if proc.returncode != 0:
            # returncode -9 or -15 means killed (cancel)
            if proc.returncode in (-9, -15):
                raise RuntimeError("Task cancelled by user")
            error_detail = stderr or stdout or "Unknown error"
            logger.error("Vina failed (code %d): %s", proc.returncode, error_detail)
            raise RuntimeError(f"Vina docking failed: {error_detail[:500]}")

        # Step 3: Parse results
        vina_results = _parse_vina_stdout(stdout)
        if not vina_results:
            # Try parsing stderr (some Vina builds write results there)
            vina_results = _parse_vina_stdout(stderr)

        if not vina_results:
            logger.warning("Could not parse Vina output. stdout: %s", stdout[:500])
            raise RuntimeError("Vina completed but no binding affinities were parsed from output")

        best = vina_results[0]
        best_affinity = best["affinity"]

        # Read docked pose
        if out_file.exists():
            docked_pdbqt = out_file.read_text()
        else:
            raise RuntimeError("Vina did not produce output file")

        logger.info(
            "Docking complete: affinity=%.2f kcal/mol, %d poses, exhaustiveness=%d",
            best_affinity,
            len(vina_results),
            exhaustiveness,
        )

        return {
            "affinity_kcal_mol": best_affinity,
            "docked_ligand_pdbqt": docked_pdbqt,
            "mode": "vina",
            "receptor_pdbqt": str(receptor_path.name),
            "all_poses": vina_results,
            "exhaustiveness": exhaustiveness,
        }


def _execute_docking_task(task_id: str) -> None:
    """Background task: run real AutoDock Vina docking."""
    with DOCKING_TASKS_LOCK:
        task = DOCKING_TASKS.get(task_id)
        if task is None:
            return
        smiles = task["smiles"]
        target = task["target"]
        exhaustiveness = task.get("exhaustiveness", 8)

    _set_task(task_id, status="processing")
    started = time.perf_counter()

    try:
        # Check if already cancelled before starting
        if _is_cancelled(task_id):
            raise RuntimeError("Task cancelled by user")

        result = _run_real_docking(
            smiles=smiles,
            target=target,
            task_id=task_id,
            exhaustiveness=exhaustiveness,
        )

        # Don't overwrite if cancelled during execution
        if _is_cancelled(task_id):
            return

        elapsed_seconds = round(time.perf_counter() - started, 3)
        _set_task(
            task_id,
            status="completed",
            affinity_kcal_mol=result.get("affinity_kcal_mol"),
            docked_ligand_pdbqt=result.get("docked_ligand_pdbqt"),
            receptor_pdbqt=result.get("receptor_pdbqt"),
            mode=result.get("mode"),
            elapsed_seconds=elapsed_seconds,
            finished_at=_utc_now_iso(),
        )
    except Exception as exc:
        # Don't overwrite cancel status with failure
        if _is_cancelled(task_id):
            return
        logger.exception("Docking task failed for task_id=%s", task_id)
        elapsed_seconds = round(time.perf_counter() - started, 3)
        _set_task(
            task_id,
            status="failed",
            error=str(exc),
            elapsed_seconds=elapsed_seconds,
            finished_at=_utc_now_iso(),
        )


@router.post("/start", response_model=DockStartResponse)
async def start_docking(payload: DockStartRequest, background_tasks: BackgroundTasks) -> DockStartResponse:
    """
    Queue a docking task and return immediately with a task ID.
    """
    if payload.target not in TARGET_CONFIG:
        supported = ", ".join(sorted(TARGET_CONFIG.keys()))
        raise HTTPException(status_code=400, detail=f"Unsupported target '{payload.target}'. Supported: {supported}")

    try:
        validate_smiles(payload.smiles)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    task_id = f"dock_{uuid.uuid4().hex[:12]}"
    created_at = _utc_now_iso()
    exhaustiveness = payload.exhaustiveness or int(os.getenv("DOCKING_EXHAUSTIVENESS", "8"))

    with DOCKING_TASKS_LOCK:
        DOCKING_TASKS[task_id] = {
            "task_id": task_id,
            "status": "queued",
            "target": payload.target,
            "smiles": payload.smiles,
            "exhaustiveness": exhaustiveness,
            "started_at": created_at,
            "finished_at": None,
            "elapsed_seconds": None,
            "affinity_kcal_mol": None,
            "docked_ligand_pdbqt": None,
            "receptor_pdbqt": None,
            "mode": None,
            "error": None,
        }

    background_tasks.add_task(_execute_docking_task, task_id)

    return DockStartResponse(
        task_id=task_id,
        status="queued",
        target=payload.target,
        smiles=payload.smiles,
        message=f"Docking task queued (exhaustiveness={exhaustiveness})",
    )


@router.get("/status/{task_id}", response_model=DockStatusResponse)
async def get_docking_status(task_id: str) -> DockStatusResponse:
    """
    Poll the status/result of a docking task.
    """
    with DOCKING_TASKS_LOCK:
        task: Optional[dict[str, Any]] = DOCKING_TASKS.get(task_id)

    if task is None:
        raise HTTPException(status_code=404, detail=f"Task not found: {task_id}")

    return DockStatusResponse(**task)


@router.post("/cancel/{task_id}")
async def cancel_docking(task_id: str) -> dict[str, Any]:
    """
    Cancel a running/queued docking task.
    Kills the Vina subprocess if running.
    """
    with DOCKING_TASKS_LOCK:
        task = DOCKING_TASKS.get(task_id)

    if task is None:
        raise HTTPException(status_code=404, detail=f"Task not found: {task_id}")

    current_status = task.get("status")
    if current_status in ("completed", "failed", "cancelled"):
        return {
            "task_id": task_id,
            "cancelled": False,
            "message": f"Task already {current_status}",
        }

    # Mark as cancelled first
    _set_task(
        task_id,
        status="cancelled",
        error="Cancelled by user",
        finished_at=_utc_now_iso(),
    )

    # Kill subprocess if running
    with _RUNNING_PROCS_LOCK:
        proc = _RUNNING_PROCS.pop(task_id, None)

    if proc is not None:
        try:
            proc.kill()
            logger.info("Killed Vina subprocess for task_id=%s (pid=%d)", task_id, proc.pid)
        except (ProcessLookupError, OSError):
            pass  # already exited

    logger.info("Cancelled docking task: %s", task_id)
    return {
        "task_id": task_id,
        "cancelled": True,
        "message": "Docking task cancelled",
    }


@router.get("/history")
async def get_docking_history() -> list[dict[str, Any]]:
    """
    Return all docking tasks (most recent first), excluding large PDBQT blobs.
    """
    with DOCKING_TASKS_LOCK:
        tasks = list(DOCKING_TASKS.values())

    # Return summary — strip large fields for list view
    history = []
    for t in reversed(tasks):
        history.append({
            "task_id": t.get("task_id"),
            "status": t.get("status"),
            "target": t.get("target"),
            "smiles": t.get("smiles"),
            "affinity_kcal_mol": t.get("affinity_kcal_mol"),
            "mode": t.get("mode"),
            "exhaustiveness": t.get("exhaustiveness"),
            "started_at": t.get("started_at"),
            "finished_at": t.get("finished_at"),
            "elapsed_seconds": t.get("elapsed_seconds"),
            "error": t.get("error"),
        })

    return history


@router.get("/receptor/{target}")
async def get_receptor_for_target(target: str) -> dict[str, Any]:
    """
    Return receptor PDBQT content for frontend 3D overlay.
    """
    target_key = target.strip().lower()
    if target_key not in TARGET_CONFIG:
        supported = ", ".join(sorted(TARGET_CONFIG.keys()))
        raise HTTPException(status_code=400, detail=f"Unsupported target '{target_key}'. Supported: {supported}")

    receptor_pdbqt, receptor_name, source = _read_receptor_content(target_key)
    return {
        "target": target_key,
        "receptor_name": receptor_name,
        "source": source,
        "receptor_pdbqt": receptor_pdbqt,
    }

"""
Utility endpoints for molecular operations.

Endpoint: POST /utils/generate-3d
"""

import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from rdkit import Chem
from rdkit.Chem import AllChem

logger = logging.getLogger(__name__)
router = APIRouter()


class MoleculeRequest(BaseModel):
    """Request body for 3D coordinate generation."""
    smiles: str


@router.post("/generate-3d")
async def generate_3d_coordinates(data: MoleculeRequest) -> dict:
    """
    Convert a SMILES string into a 3D MOL block with optimised geometry.

    Uses ETKDGv3 distance-geometry embedding followed by MMFF force-field
    optimisation to produce realistic 3D atomic coordinates.

    Args:
        data: Request body containing a SMILES string.

    Returns:
        Dictionary with ``mol_block`` (V2000 MOL block text).

    Raises:
        HTTPException 400: If SMILES is invalid or embedding fails.
    """
    smiles = data.smiles.strip()
    if not smiles:
        raise HTTPException(status_code=400, detail="SMILES string is required")

    try:
        # 1. Parse SMILES
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            raise ValueError(f"Invalid SMILES: {smiles}")

        # 2. Add hydrogens (critical for realistic 3D geometry)
        mol = Chem.AddHs(mol)

        # 3. Generate 3D coordinates via ETKDGv3
        params = AllChem.ETKDGv3()
        params.randomSeed = 42  # Reproducible results
        res = AllChem.EmbedMolecule(mol, params)

        if res == -1:
            # Fallback: random coordinates for difficult molecules
            logger.warning(f"ETKDGv3 failed for {smiles}, falling back to random coords")
            res = AllChem.EmbedMolecule(mol, useRandomCoords=True)
            if res == -1:
                raise ValueError("Could not generate 3D coordinates for this molecule")

        # 4. Optimise geometry with MMFF force field
        try:
            AllChem.MMFFOptimizeMolecule(mol, maxIters=200)
        except Exception:
            # Skip optimisation if force field fails — raw embedding is okay
            logger.warning(f"MMFF optimisation skipped for {smiles}")

        # 5. Return the 3D MOL block
        mol_block = Chem.MolToMolBlock(mol)
        logger.info(f"✅ Generated 3D coordinates for: {smiles}")
        return {"mol_block": mol_block}

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"3D generation failed: {e}")
        raise HTTPException(status_code=400, detail=f"3D generation failed: {str(e)}")

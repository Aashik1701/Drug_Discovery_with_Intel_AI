import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlaskConical, Loader2, Play, Target } from 'lucide-react';
import { useDocking } from '../hooks/useDocking';
import { dockingService } from '../services/api';
import DockingPoseViewer from './DockingPoseViewer';

const TARGET_OPTIONS = [
  { value: 'cox2', label: 'COX-2' },
  { value: 'ace2', label: 'ACE2' },
];

const STATUS_LABEL = {
  idle: 'Idle',
  queued: 'Queued',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
};

const DockingStudio = () => {
  const [smiles, setSmiles] = useState('CC(=O)OC1=CC=CC=C1C(=O)O');
  const [target, setTarget] = useState('cox2');
  const [receptorPdbqt, setReceptorPdbqt] = useState('');
  const [receptorInfo, setReceptorInfo] = useState(null);
  const [receptorError, setReceptorError] = useState('');

  const {
    taskId,
    status,
    result,
    error,
    isSubmitting,
    isProcessing,
    startDocking,
  } = useDocking();

  const canRun = useMemo(() => smiles.trim().length > 0 && !isProcessing && !isSubmitting, [smiles, isProcessing, isSubmitting]);

  const loadReceptor = useCallback(async (selectedTarget) => {
    try {
      setReceptorError('');
      const response = await dockingService.getReceptor(selectedTarget);
      setReceptorPdbqt(response.data?.receptor_pdbqt || '');
      setReceptorInfo(response.data || null);
    } catch (err) {
      const message = err?.response?.data?.detail || err?.message || 'Failed to load receptor';
      setReceptorError(message);
      setReceptorPdbqt('');
      setReceptorInfo(null);
    }
  }, []);

  useEffect(() => {
    loadReceptor(target);
  }, [target, loadReceptor]);

  const handleRun = async (e) => {
    e.preventDefault();
    if (!canRun) return;
    await startDocking({ smiles: smiles.trim(), target });
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
          <Target className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            Docking Studio
          </h1>
          <p className="text-xs text-slate-400">Async AutoDock Vina task runner (polling)</p>
        </div>
      </div>

      <form onSubmit={handleRun} className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-4 md:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-400 mb-1">SMILES</label>
            <input
              value={smiles}
              onChange={(e) => setSmiles(e.target.value)}
              placeholder="Enter ligand SMILES"
              className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Target</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            >
              {TARGET_OPTIONS.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!canRun}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-medium hover:bg-cyan-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing || isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {isProcessing ? 'Docking in progress...' : 'Run Docking'}
        </button>
      </form>

      <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-4 md:p-5 space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-slate-300">
            Status: {STATUS_LABEL[status] || status}
          </span>
          {taskId && (
            <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-slate-300 font-mono text-xs">
              Task: {taskId}
            </span>
          )}
          {result?.elapsed_seconds != null && (
            <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-slate-300">
              Time: {result.elapsed_seconds}s
            </span>
          )}
        </div>

        {error && (
          <div className="text-sm text-rose-300 border border-rose-500/30 bg-rose-500/10 rounded-xl p-3">
            {error}
          </div>
        )}

        {receptorError && (
          <div className="text-sm text-rose-300 border border-rose-500/30 bg-rose-500/10 rounded-xl p-3">
            {receptorError}
          </div>
        )}

        {result?.status === 'completed' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                <p className="text-slate-400 text-xs">Affinity</p>
                <p className="text-white font-semibold">
                  {result.affinity_kcal_mol ?? '—'} kcal/mol
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                <p className="text-slate-400 text-xs">Mode</p>
                <p className="text-white font-semibold">{result.mode || '—'}</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                <p className="text-slate-400 text-xs">Receptor</p>
                <p className="text-white font-semibold">{result.receptor_pdbqt || receptorInfo?.receptor_name || 'N/A'}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Docking Pose Overlay</p>
              <DockingPoseViewer
                receptorPdbqt={receptorPdbqt}
                ligandPdbqt={result.docked_ligand_pdbqt || ''}
                height={430}
              />
              {receptorInfo?.source && (
                <p className="text-[11px] text-slate-500 mt-2">
                  Receptor source: {receptorInfo.source}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Docked ligand PDBQT</p>
              <textarea
                value={result.docked_ligand_pdbqt || ''}
                readOnly
                rows={10}
                className="w-full px-3 py-2.5 rounded-xl bg-black/20 border border-white/20 text-xs text-slate-200 font-mono focus:outline-none"
              />
            </div>
          </>
        )}

        {!taskId && (
          <div className="text-sm text-slate-400 inline-flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            Start a docking task to see live status updates and results.
          </div>
        )}
      </div>
    </div>
  );
};

export default DockingStudio;

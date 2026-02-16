import React, { useState, useCallback } from 'react';
import { Beaker, Search, RotateCcw, Atom, FlaskConical } from 'lucide-react';
import Molecule3DViewer from './Molecule3DViewer';

const EXAMPLES = [
  { name: 'Aspirin', smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O' },
  { name: 'Caffeine', smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C' },
  { name: 'Ibuprofen', smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O' },
  { name: 'Paracetamol', smiles: 'CC(=O)NC1=CC=C(C=C1)O' },
  { name: 'Penicillin G', smiles: 'CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C' },
  { name: 'Morphine', smiles: 'CN1CC[C@]23C4=C5C(=C(C=C4)O)O[C@H]2[C@@H](C=C3)[C@H]1C5' },
  { name: 'Warfarin', smiles: 'CC(=O)CC(C1=CC=CC=C1)C2=C(C3=CC=CC=C3OC2=O)O' },
  { name: 'Metformin', smiles: 'CN(C)C(=N)NC(=N)N' },
];

/**
 * Molecule Studio – full-page immersive 3D molecular visualization.
 *
 * Uses the upgraded Molecule3DViewer with glass toolbar, view-mode
 * toggles, VDW surface overlay, atom hover labels, and screenshot.
 */
const MolecularVisualizationPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [currentSmiles, setCurrentSmiles] = useState(EXAMPLES[0].smiles);
  const [currentName, setCurrentName] = useState(EXAMPLES[0].name);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      const trimmed = inputValue.trim();
      if (trimmed) {
        setCurrentSmiles(trimmed);
        setCurrentName('Custom');
      }
    },
    [inputValue],
  );

  const handleExample = useCallback((ex) => {
    setInputValue(ex.smiles);
    setCurrentSmiles(ex.smiles);
    setCurrentName(ex.name);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
    setCurrentSmiles('');
    setCurrentName('');
  }, []);

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-4rem)] gap-4 p-4">
      {/* ── Header bar ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/10">
            <Atom className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Molecule Studio</h1>
            <p className="text-xs text-slate-400">
              Interactive 3D molecular visualization
            </p>
          </div>
        </div>

        {/* SMILES search */}
        <form onSubmit={handleSubmit} className="flex gap-2 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter SMILES string…"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-medium hover:bg-cyan-500/30 transition-colors"
          >
            Visualize
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Clear"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
        {/* Left sidebar – example molecules */}
        <div className="lg:w-56 shrink-0">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              Examples
            </h2>
            <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => handleExample(ex)}
                  className={`text-left px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    currentSmiles === ex.smiles
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {ex.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Viewer – fills remaining space */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* current molecule label */}
          {currentName && currentSmiles && (
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-medium text-white">
                {currentName}
              </span>
              <span className="text-xs font-mono text-slate-500 truncate max-w-xs">
                {currentSmiles}
              </span>
            </div>
          )}

          <div className="flex-1 rounded-xl border border-white/10 overflow-hidden bg-[#0a0f1a] min-h-[400px]">
            {currentSmiles ? (
              <Molecule3DViewer
                smiles={currentSmiles}
                width="100%"
                height="100%"
                showControls={true}
                spin={true}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                <Beaker className="w-12 h-12 opacity-40" />
                <p className="text-sm">
                  Enter a SMILES string or pick an example to begin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MolecularVisualizationPage;

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Play, Download, Loader2, CheckCircle2, XCircle,
  FileSpreadsheet, Trash2, BarChart3, ChevronDown
} from 'lucide-react';
import GlassCard, { GlassPanel, GlassButton, GlassBadge } from './ui/GlassCard';
import { ShimmerTable } from './ui/ShimmerLoader';

// ─── Model Options ────────────────────────────────────────────
const MODEL_OPTIONS = [
  { id: 'solubility', name: 'Solubility (LogS)', endpoint: '/predict/solubility' },
  { id: 'bbbp', name: 'BBB Permeability', endpoint: '/predict/bbbp' },
  { id: 'toxicity', name: 'Toxicity', endpoint: '/predict/toxicity' },
  { id: 'cyp3a4', name: 'CYP3A4 Inhibition', endpoint: '/predict/cyp3a4' },
  { id: 'half-life', name: 'Half-Life', endpoint: '/predict/half-life' },
  { id: 'cox2', name: 'COX-2 Binding', endpoint: '/predict/cox2' },
  { id: 'hepg2', name: 'HepG2 Cytotoxicity', endpoint: '/predict/hepg2' },
  { id: 'ace2', name: 'ACE2 Binding', endpoint: '/predict/ace2' },
  { id: 'binding-score', name: 'Binding Score', endpoint: '/predict/binding-score' },
];

const BatchProcessor = () => {
  const [molecules, setMolecules] = useState([]);
  const [selectedModels, setSelectedModels] = useState(['solubility']);
  const [results, setResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // ─── CSV Parsing ─────────────────────────────────────
  const parseCSV = useCallback((text) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const smilesCol = headers.findIndex(h =>
      h === 'smiles' || h === 'smi' || h === 'molecule' || h === 'canonical_smiles'
    );
    if (smilesCol === -1) {
      // Try first column as SMILES
      return lines.slice(1)
        .map(l => l.split(',')[0]?.trim())
        .filter(Boolean);
    }
    return lines.slice(1)
      .map(l => l.split(',')[smilesCol]?.trim())
      .filter(Boolean);
  }, []);

  const handleFile = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const parsed = parseCSV(e.target.result);
      if (parsed.length === 0) return;
      setMolecules(parsed);
      setResults({});
    };
    reader.readAsText(file);
  }, [parseCSV]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt') || file.name.endsWith('.smi'))) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const handleDragLeave = () => setDragActive(false);

  const toggleModel = (id) => {
    setSelectedModels(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  // ─── Run Batch ───────────────────────────────────────
  const runBatch = useCallback(async () => {
    if (molecules.length === 0 || selectedModels.length === 0) return;
    setIsRunning(true);
    setResults({});
    const total = molecules.length * selectedModels.length;
    setProgress({ done: 0, total });
    let done = 0;

    for (const smiles of molecules) {
      const rowResults = {};
      const promises = selectedModels.map(async (modelId) => {
        const model = MODEL_OPTIONS.find(m => m.id === modelId);
        if (!model) return;
        try {
          const res = await fetch(`${apiBase}${model.endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ smiles }),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          rowResults[modelId] = { value: data.prediction ?? data['Predicted Class'] ?? JSON.stringify(data) };
        } catch (err) {
          rowResults[modelId] = { error: err.message };
        } finally {
          done++;
          setProgress({ done, total });
        }
      });
      await Promise.all(promises);
      setResults(prev => ({ ...prev, [smiles]: rowResults }));
    }
    setIsRunning(false);
  }, [molecules, selectedModels, apiBase]);

  // ─── Export CSV ──────────────────────────────────────
  const exportCSV = useCallback(() => {
    const header = ['SMILES', ...selectedModels.map(id => MODEL_OPTIONS.find(m => m.id === id)?.name || id)];
    const rows = molecules.map(smiles => {
      const row = [smiles];
      selectedModels.forEach(modelId => {
        const res = results[smiles]?.[modelId];
        row.push(res?.error ? `ERROR: ${res.error}` : res?.value ?? '');
      });
      return row;
    });
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `drugforge_batch_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [molecules, selectedModels, results]);

  const hasResults = Object.keys(results).length > 0;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-thin text-gray-800 dark:text-gray-100">
            Batch <span className="text-cyan-500">Processor</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Upload a CSV of SMILES and run multiple models at once.
          </p>
        </motion.div>

        {/* Upload Zone + Model Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Drop Zone */}
          <GlassPanel className="lg:col-span-2 p-8">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-2xl p-12
                flex flex-col items-center justify-center
                cursor-pointer transition-all duration-200
                ${dragActive
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-white/20 dark:border-gray-700/30 hover:border-cyan-500/50 hover:bg-white/5'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.txt,.smi"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <Upload className={`w-12 h-12 mb-4 ${dragActive ? 'text-cyan-500' : 'text-gray-400'}`} />
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {molecules.length > 0
                  ? `${molecules.length} molecules loaded`
                  : 'Drop CSV here or click to upload'
                }
              </p>
              <p className="text-xs text-gray-400 mt-2">
                CSV must contain a "smiles" column (or first column is used)
              </p>
            </div>

            {molecules.length > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {molecules.length} molecules
                  </span>
                </div>
                <button
                  onClick={() => { setMolecules([]); setResults({}); }}
                  className="text-sm text-gray-400 hover:text-rose-500 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            )}
          </GlassPanel>

          {/* Model Selector */}
          <GlassCard className="p-6" hoverable={false}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Select Models
            </h3>
            <div className="space-y-2">
              {MODEL_OPTIONS.map(model => (
                <label
                  key={model.id}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl cursor-pointer
                    transition-all duration-200
                    ${selectedModels.includes(model.id)
                      ? 'bg-cyan-500/15 border border-cyan-500/30'
                      : 'bg-white/5 dark:bg-black/5 border border-transparent hover:bg-white/10'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={selectedModels.includes(model.id)}
                    onChange={() => toggleModel(model.id)}
                    className="rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{model.name}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <GlassButton
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
                onClick={runBatch}
                disabled={isRunning || molecules.length === 0 || selectedModels.length === 0}
              >
                {isRunning ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                ) : (
                  <><Play className="w-4 h-4" /> Run Batch</>
                )}
              </GlassButton>
              {hasResults && (
                <GlassButton
                  variant="ghost"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={exportCSV}
                >
                  <Download className="w-4 h-4" /> Export CSV
                </GlassButton>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Progress */}
        {isRunning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="p-4" hoverable={false}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Processing {progress.done} / {progress.total}
                </span>
                <span className="text-sm font-mono text-cyan-500">
                  {Math.round((progress.done / progress.total) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-white/10 dark:bg-black/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                  animate={{ width: `${(progress.done / progress.total) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Results Table */}
        {hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassPanel className="p-6 overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Results
                </h3>
                <GlassBadge variant="success">
                  {Object.keys(results).length}/{molecules.length} completed
                </GlassBadge>
              </div>
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 dark:border-gray-700/20">
                    <th className="text-left px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">SMILES</th>
                    {selectedModels.map(id => {
                      const model = MODEL_OPTIONS.find(m => m.id === id);
                      return (
                        <th key={id} className="text-left px-4 py-3 text-gray-500 dark:text-gray-400 font-medium">
                          {model?.name || id}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 dark:divide-gray-700/10">
                  {molecules.map((smiles) => (
                    <tr key={smiles} className="hover:bg-white/5 dark:hover:bg-black/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                        {smiles}
                      </td>
                      {selectedModels.map(modelId => {
                        const res = results[smiles]?.[modelId];
                        return (
                          <td key={modelId} className="px-4 py-3">
                            {!res ? (
                              <span className="text-gray-400">—</span>
                            ) : res.error ? (
                              <span className="text-rose-500 text-xs flex items-center gap-1">
                                <XCircle className="w-3 h-3" /> {res.error}
                              </span>
                            ) : (
                              <span className="font-mono text-gray-900 dark:text-white flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                {String(res.value)}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassPanel>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BatchProcessor;

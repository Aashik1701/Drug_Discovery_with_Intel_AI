import React, { useEffect, useRef, useState } from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';
import { AlertTriangle, Loader2 } from 'lucide-react';

const DockingPoseViewer = ({ receptorPdbqt, ligandPdbqt, height = 420 }) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return;

    viewerRef.current = $3Dmol.createViewer(containerRef.current, {
      backgroundColor: '#0f172a',
    });

    const observer = new ResizeObserver(() => {
      if (viewerRef.current) {
        try {
          viewerRef.current.resize();
          viewerRef.current.render();
        } catch (_) {
          // ignore resize errors
        }
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (viewerRef.current) {
        try {
          viewerRef.current.spin(false);
          viewerRef.current.clear();
        } catch (_) {
          // ignore cleanup errors
        }
      }
      viewerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    if (!receptorPdbqt || !ligandPdbqt) {
      viewer.clear();
      viewer.render();
      return;
    }

    try {
      setError('');
      viewer.clear();
      viewer.removeAllModels();

      // Detect format — support both PDB and PDBQT
      const receptorFormat =
        receptorPdbqt.includes('PDBQT') ||
        /\s[+-]?\d+\.\d+\s+[A-Z]{1,2}\s*$/.test(receptorPdbqt.split('\n')[3] || '')
          ? 'pdbqt'
          : 'pdb';

      viewer.addModel(receptorPdbqt, receptorFormat);
      viewer.setStyle(
        { model: 0 },
        {
          cartoon: { color: '#94a3b8', opacity: 0.55 },
          line: { color: '#9ca3af', opacity: 0.4 },
        },
      );

      viewer.addModel(ligandPdbqt, 'pdbqt');
      viewer.setStyle(
        { model: 1 },
        {
          stick: { radius: 0.2, colorscheme: 'Jmol' },
          sphere: { scale: 0.28, colorscheme: 'Jmol' },
        },
      );

      viewer.zoomTo({ model: 1 });
      viewer.zoom(1.2, 900);
      viewer.spin('y', 0.3);
      viewer.render();
    } catch (err) {
      console.error('[DockingPoseViewer] render error', err);
      setError('Unable to render docking overlay');
    }
  }, [receptorPdbqt, ligandPdbqt]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#0f172a]" style={{ height }}>
      <div ref={containerRef} className="w-full h-full" />

      {!receptorPdbqt || !ligandPdbqt ? (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Preparing docking overlay...
        </div>
      ) : null}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-sm text-rose-300 bg-black/40">
          <AlertTriangle className="w-5 h-5 mb-2" />
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default DockingPoseViewer;

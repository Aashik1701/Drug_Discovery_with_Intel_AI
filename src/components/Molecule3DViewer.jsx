/**
 * Molecule3DViewer – WebGL-powered 3D molecular visualization.
 *
 * Uses a static import of 3Dmol.js and a single container div
 * to avoid the race condition where the canvas draws with 0 height.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';
import { Loader2, AlertTriangle } from 'lucide-react';

const Molecule3DViewer = ({ smiles, width = 400, height = 300 }) => {
  const viewerRef = useRef(null);       // DOM container
  const viewerInstance = useRef(null);   // 3Dmol viewer (reused)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!smiles) return;

    let isMounted = true;

    const fetchAndRender3D = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log('[3DViewer] Fetching 3D coordinates for', smiles);

        // 1. Get 3D MOL block from backend
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const res = await fetch(`${API_URL}/utils/generate-3d`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ smiles }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.detail || `Server error ${res.status}`);
        }

        const { mol_block } = await res.json();
        if (!isMounted) return;

        // 2. Initialize viewer (only once, then reuse)
        if (!viewerInstance.current && viewerRef.current) {
          // Force dimensions before creation to prevent 0-height canvas
          viewerRef.current.style.width = `${width}px`;
          viewerRef.current.style.height = `${height}px`;

          // Small delay to let the browser compute layout
          await new Promise(r => setTimeout(r, 100));

          console.log('[3DViewer] Creating WebGL context…');
          viewerInstance.current = $3Dmol.createViewer(viewerRef.current, {
            backgroundColor: 'rgba(0,0,0,0)',
          });
        }

        const viewer = viewerInstance.current;
        if (!viewer) throw new Error('Viewer failed to initialize');

        // 3. Render molecule
        viewer.clear();
        viewer.addModel(mol_block, 'mol');

        viewer.setStyle({}, {
          stick: { radius: 0.15, colorscheme: 'Jmol' },
          sphere: { scale: 0.3, colorscheme: 'Jmol' },
        });

        viewer.zoomTo();
        viewer.render();

        // Gentle spin
        viewer.spin('y', 0.5);
        console.log('[3DViewer] ✅ Render success');

      } catch (err) {
        console.error('[3DViewer] Error:', err);
        if (isMounted) setError('Could not generate 3D structure');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAndRender3D();

    return () => {
      isMounted = false;
      if (viewerInstance.current) {
        viewerInstance.current.spin(false);
      }
    };
  }, [smiles, width, height]);

  return (
    <div
      ref={viewerRef}
      className="relative rounded-xl overflow-hidden cursor-move border border-white/10 bg-[#111827] shadow-inner"
      style={{ width, height, position: 'relative' }}
    >
      {/* Loading */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl z-10"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }}
        >
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-400 text-sm p-4 text-center z-20">
          <AlertTriangle className="w-6 h-6 mb-2 opacity-80" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty */}
      {!smiles && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
          Waiting for molecule…
        </div>
      )}
    </div>
  );
};

export default Molecule3DViewer;

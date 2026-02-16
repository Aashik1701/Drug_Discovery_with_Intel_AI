/**
 * Molecule3DViewer – WebGL-powered 3D molecular visualization.
 *
 * Uses a static import of 3Dmol.js and a single container div.
 * Features: view-mode toggles (stick/sphere/line), VDW surface overlay,
 * atom hover labels, screenshot export, and glass floating toolbar.
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';
import {
  Loader2,
  AlertTriangle,
  Box,
  Circle,
  Minus,
  Camera,
  RefreshCw,
  Layers,
} from 'lucide-react';

/* ── tiny toolbar button ─────────────────────────────────────────── */
const ControlButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    title={label}
    className={`p-1.5 rounded-lg transition-all duration-200 ${
      active
        ? 'bg-cyan-500/30 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]'
        : 'text-slate-400 hover:text-white hover:bg-white/10'
    }`}
  >
    <Icon className="w-4 h-4" />
  </button>
);

/* ── main component ──────────────────────────────────────────────── */
const Molecule3DViewer = ({
  smiles,
  width = 400,
  height = 300,
  showControls = true,
  spin = true,
}) => {
  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);
  const molBlockRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('stick');   // stick | sphere | line
  const [showSurface, setShowSurface] = useState(false);
  const [hoveredAtom, setHoveredAtom] = useState(null);

  /* ── style map ─────────────────────────────────────────────────── */
  const styleForMode = useCallback((mode) => {
    switch (mode) {
      case 'sphere':
        return { sphere: { scale: 0.4, colorscheme: 'Jmol' } };
      case 'line':
        return { line: { colorscheme: 'Jmol' } };
      case 'stick':
      default:
        return {
          stick: { radius: 0.15, colorscheme: 'Jmol' },
          sphere: { scale: 0.25, colorscheme: 'Jmol' },
        };
    }
  }, []);

  /* ── apply current style + surface to an existing viewer ─────── */
  const applyStyle = useCallback(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;

    viewer.setStyle({}, styleForMode(viewMode));
    viewer.removeAllSurfaces();

    if (showSurface) {
      viewer.addSurface($3Dmol.SurfaceType.VDW, {
        opacity: 0.25,
        color: 'white',
      });
    }

    viewer.render();
  }, [viewMode, showSurface, styleForMode]);

  /* ── re-apply whenever viewMode / showSurface change ─────────── */
  useEffect(() => {
    applyStyle();
  }, [applyStyle]);

  /* ── fetch 3-D coords & render ─────────────────────────────────── */
  useEffect(() => {
    if (!smiles) return;

    let isMounted = true;

    const fetchAndRender3D = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const API_URL =
          import.meta.env.VITE_API_URL || 'http://localhost:5001';
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
        molBlockRef.current = mol_block;

        /* initialise viewer once */
        if (!viewerInstance.current && viewerRef.current) {
          const w = typeof width === 'number' ? `${width}px` : width;
          const h = typeof height === 'number' ? `${height}px` : height;
          viewerRef.current.style.width = w;
          viewerRef.current.style.height = h;

          await new Promise((r) => setTimeout(r, 100));

          viewerInstance.current = $3Dmol.createViewer(viewerRef.current, {
            backgroundColor: 'rgba(0,0,0,0)',
          });
        }

        const viewer = viewerInstance.current;
        if (!viewer) throw new Error('Viewer failed to initialize');

        viewer.clear();
        viewer.removeAllSurfaces();
        viewer.addModel(mol_block, 'mol');

        /* atom hover labels */
        viewer.setHoverable(
          {},
          true,
          (atom) => {
            if (!isMounted) return;
            setHoveredAtom({
              elem: atom.elem,
              serial: atom.serial,
              x: atom.x?.toFixed(2),
              y: atom.y?.toFixed(2),
              z: atom.z?.toFixed(2),
            });
            viewer.addLabel(atom.elem, {
              position: atom,
              backgroundColor: 'rgba(0,0,0,0.7)',
              fontColor: 'white',
              fontSize: 12,
              borderRadius: 4,
            });
            viewer.render();
          },
          (atom) => {
            if (!isMounted) return;
            setHoveredAtom(null);
            viewer.removeAllLabels();
            viewer.render();
          },
        );

        applyStyle();
        viewer.zoomTo();
        viewer.render();
        if (spin) viewer.spin('y', 0.5);
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
      if (viewerInstance.current) viewerInstance.current.spin(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [smiles]);

  /* ── screenshot ────────────────────────────────────────────────── */
  const handleScreenshot = useCallback(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    const png = viewer.pngURI();
    const a = document.createElement('a');
    a.href = png;
    a.download = `molecule-${smiles?.slice(0, 12) || 'capture'}.png`;
    a.click();
  }, [smiles]);

  /* ── reset camera ──────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    viewer.zoomTo();
    viewer.render();
    if (spin) viewer.spin('y', 0.5);
  }, [spin]);

  /* ── dimensions (handle both number & string props) ────────────── */
  const cssWidth = typeof width === 'number' ? `${width}px` : width;
  const cssHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div className="relative" style={{ width: cssWidth, height: cssHeight }}>
      {/* WebGL canvas target */}
      <div
        ref={viewerRef}
        className="absolute inset-0 rounded-xl cursor-move border border-white/10 bg-[#111827] shadow-inner"
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />

      {/* ── Glass Floating Toolbar ────────────────────────────────── */}
      {showControls && !isLoading && !error && smiles && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          <ControlButton
            icon={Box}
            label="Stick"
            active={viewMode === 'stick'}
            onClick={() => setViewMode('stick')}
          />
          <ControlButton
            icon={Circle}
            label="Sphere"
            active={viewMode === 'sphere'}
            onClick={() => setViewMode('sphere')}
          />
          <ControlButton
            icon={Minus}
            label="Line"
            active={viewMode === 'line'}
            onClick={() => setViewMode('line')}
          />

          <div className="w-px h-5 bg-white/20 mx-1" />

          <ControlButton
            icon={Layers}
            label="Surface"
            active={showSurface}
            onClick={() => setShowSurface((p) => !p)}
          />
          <ControlButton
            icon={Camera}
            label="Screenshot"
            active={false}
            onClick={handleScreenshot}
          />
          <ControlButton
            icon={RefreshCw}
            label="Reset View"
            active={false}
            onClick={handleReset}
          />
        </div>
      )}

      {/* ── Hover Atom Info ────────────────────────────────────────── */}
      {hoveredAtom && showControls && (
        <div className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-xs text-slate-200 font-mono">
          {hoveredAtom.elem} #{hoveredAtom.serial} ({hoveredAtom.x},{' '}
          {hoveredAtom.y}, {hoveredAtom.z})
        </div>
      )}

      {/* ── Loading ───────────────────────────────────────────────── */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl z-10"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }}
        >
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      )}

      {/* ── Error ─────────────────────────────────────────────────── */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-400 text-sm p-4 text-center z-20">
          <AlertTriangle className="w-6 h-6 mb-2 opacity-80" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Empty ─────────────────────────────────────────────────── */}
      {!smiles && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
          Waiting for molecule…
        </div>
      )}
    </div>
  );
};

export default Molecule3DViewer;

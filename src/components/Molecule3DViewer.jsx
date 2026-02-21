/**
 * Molecule3DViewer – WebGL-powered 3D molecular visualization & analysis.
 *
 * Uses a static import of 3Dmol.js and a single container div.
 * Features:
 *   - View-mode toggles (stick/sphere/line)
 *   - Spin play/pause, screenshot, reset
 *   - Electrostatic surface (Gasteiger charges, Red-White-Blue)
 *   - Pharmacophore markers (Donor/Acceptor/Aromatic spheres)
 *   - Interactive distance measurement (click two atoms)
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
  Pause,
  Play,
  Zap,
  Magnet,
  Ruler,
} from 'lucide-react';

/* -- tiny toolbar button -------------------------------------------------- */
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

/* -- science toolbar button (right side, vertical) ------------------------ */
const ScienceButton = ({ icon: Icon, label, active, onClick, activeColor }) => (
  <button
    onClick={onClick}
    title={label}
    className={`p-2.5 rounded-xl backdrop-blur-md border transition-all duration-200 group relative ${
      active
        ? 'bg-white/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
        : 'bg-black/20 border-white/10 hover:bg-white/10'
    }`}
  >
    <Icon className={`w-4 h-4 ${active ? activeColor : 'text-slate-300'}`} />
    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      {label}
    </span>
  </button>
);

/* -- main component ------------------------------------------------------- */
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
  const [viewMode, setViewMode] = useState('stick');
  const [showSurface, setShowSurface] = useState(false);
  const [hoveredAtom, setHoveredAtom] = useState(null);
  const [isSpinning, setIsSpinning] = useState(spin);

  /* -- science layer states ----------------------------------------------- */
  const [molData, setMolData] = useState(null);
  const [showElectrostatics, setShowElectrostatics] = useState(false);
  const [showPharmacophores, setShowPharmacophores] = useState(false);
  const [measureMode, setMeasureMode] = useState(false);
  const measureAtomRef = useRef(null);
  const [measurement, setMeasurement] = useState(null);

  /* -- style map ---------------------------------------------------------- */
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

  /* -- apply style (non-science surfaces) --------------------------------- */
  const applyStyle = useCallback(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;

    viewer.setStyle({}, styleForMode(viewMode));
    viewer.removeAllSurfaces();

    if (showSurface && !showElectrostatics) {
      viewer.addSurface($3Dmol.SurfaceType.VDW, {
        opacity: 0.25,
        color: 'white',
      });
    }

    viewer.render();
  }, [viewMode, showSurface, showElectrostatics, styleForMode]);

  /* re-apply style when viewMode / showSurface change */
  useEffect(() => {
    applyStyle();
  }, [applyStyle]);

  /* -- fetch 3-D coords + charges + features ------------------------------ */
  useEffect(() => {
    if (!smiles) return;
    let isMounted = true;

    const fetchAndRender3D = async () => {
      setIsLoading(true);
      setError(null);
      setShowElectrostatics(false);
      setShowPharmacophores(false);
      setMeasureMode(false);
      setMeasurement(null);
      measureAtomRef.current = null;

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

        const data = await res.json();
        if (!isMounted) return;
        molBlockRef.current = data.mol_block;
        setMolData(data);

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
        viewer.removeAllShapes();
        viewer.removeAllLabels();
        viewer.addModel(data.mol_block, 'mol');

        // Attach Gasteiger charges to atoms for electrostatic colouring
        if (data.charges) {
          try {
            const atoms = viewer.getModel().selectedAtoms({});
            if (atoms.length === data.charges.length) {
              atoms.forEach((atom, i) => {
                if (!atom.properties) atom.properties = {};
                atom.properties.charge = data.charges[i];
              });
            }
          } catch (_) {
            /* charges unavailable */
          }
        }

        /* atom hover labels (now include partial charge) */
        viewer.setHoverable(
          {},
          true,
          (atom) => {
            if (!isMounted) return;
            const charge = atom.properties?.charge;
            setHoveredAtom({
              elem: atom.elem,
              serial: atom.serial,
              x: atom.x?.toFixed(2),
              y: atom.y?.toFixed(2),
              z: atom.z?.toFixed(2),
              charge: charge != null ? charge.toFixed(3) : null,
            });
            const lbl =
              charge != null
                ? `${atom.elem} (${charge >= 0 ? '+' : ''}${charge.toFixed(2)})`
                : atom.elem;
            viewer.addLabel(lbl, {
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

        viewer.setStyle({}, styleForMode(viewMode));
        viewer.zoomTo();
        viewer.render();
        if (spin) {
          viewer.spin('y', 0.5);
          setIsSpinning(true);
        }
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

  /* -- science layers effect ---------------------------------------------- */
  useEffect(() => {
    const viewer = viewerInstance.current;
    if (!viewer || !molData) return;

    viewer.removeAllShapes();
    viewer.removeAllSurfaces();

    // Re-apply plain surface if on and ESP is off
    if (showSurface && !showElectrostatics) {
      viewer.addSurface($3Dmol.SurfaceType.VDW, {
        opacity: 0.25,
        color: 'white',
      });
    }

    // A. Electrostatic surface (Red-White-Blue)
    if (showElectrostatics && molData.charges?.length) {
      viewer.addSurface($3Dmol.SurfaceType.VDW, {
        opacity: 0.6,
        colorscheme: {
          prop: 'charge',
          gradient: 'rwb',
          min: -0.5,
          max: 0.5,
        },
      });
    }

    // B. Pharmacophore spheres
    if (showPharmacophores && molData.features?.length) {
      molData.features.forEach((feat) => {
        let color = 'gray';
        if (feat.family === 'Donor') color = '#00ff00';
        if (feat.family === 'Acceptor') color = '#a020f0';
        if (feat.family === 'Aromatic') color = '#ffa500';

        viewer.addSphere({
          center: { x: feat.x, y: feat.y, z: feat.z },
          radius: 1.0,
          color,
          alpha: 0.4,
        });
      });
    }

    // C. Measurement mode
    if (measureMode) {
      viewer.setClickable({}, true, (atom) => {
        const first = measureAtomRef.current;
        if (!first) {
          measureAtomRef.current = atom;
          viewer.addSphere({
            center: { x: atom.x, y: atom.y, z: atom.z },
            radius: 0.35,
            color: '#facc15',
            alpha: 0.8,
          });
          viewer.addLabel(`${atom.elem}${atom.serial}`, {
            position: atom,
            backgroundColor: '#facc15',
            fontColor: 'black',
            fontSize: 11,
            borderRadius: 4,
          });
          viewer.render();
        } else {
          const dx = atom.x - first.x;
          const dy = atom.y - first.y;
          const dz = atom.z - first.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          viewer.addCylinder({
            start: { x: first.x, y: first.y, z: first.z },
            end: { x: atom.x, y: atom.y, z: atom.z },
            radius: 0.05,
            color: '#facc15',
            fromCap: true,
            toCap: true,
          });

          viewer.addLabel(`${dist.toFixed(2)} \u00C5`, {
            position: {
              x: (first.x + atom.x) / 2,
              y: (first.y + atom.y) / 2,
              z: (first.z + atom.z) / 2,
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            fontColor: '#facc15',
            fontSize: 13,
            borderRadius: 4,
          });

          viewer.addSphere({
            center: { x: atom.x, y: atom.y, z: atom.z },
            radius: 0.35,
            color: '#facc15',
            alpha: 0.8,
          });

          setMeasurement({
            dist: dist.toFixed(2),
            a1: `${first.elem}${first.serial}`,
            a2: `${atom.elem}${atom.serial}`,
          });

          viewer.render();
          measureAtomRef.current = null;
        }
      });
    } else {
      viewer.setClickable({}, false);
      setMeasurement(null);
      measureAtomRef.current = null;
    }

    viewer.render();
  }, [showElectrostatics, showPharmacophores, measureMode, molData, showSurface]);

  /* -- science toggles ---------------------------------------------------- */
  const toggleElectrostatics = useCallback(() => {
    setShowElectrostatics((p) => !p);
    if (!showElectrostatics) setShowSurface(false);
  }, [showElectrostatics]);

  const togglePharmacophores = useCallback(() => {
    setShowPharmacophores((p) => !p);
  }, []);

  const toggleMeasure = useCallback(() => {
    setMeasureMode((p) => !p);
  }, []);

  /* -- screenshot --------------------------------------------------------- */
  const handleScreenshot = useCallback(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    const png = viewer.pngURI();
    const a = document.createElement('a');
    a.href = png;
    a.download = `molecule-${smiles?.slice(0, 12) || 'capture'}.png`;
    a.click();
  }, [smiles]);

  /* -- spin toggle -------------------------------------------------------- */
  const handleToggleSpin = useCallback(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    if (isSpinning) {
      viewer.spin(false);
      setIsSpinning(false);
    } else {
      viewer.spin('y', 0.5);
      setIsSpinning(true);
    }
  }, [isSpinning]);

  /* -- reset camera ------------------------------------------------------- */
  const handleReset = useCallback(() => {
    const viewer = viewerInstance.current;
    if (!viewer) return;
    viewer.zoomTo();
    viewer.render();
    if (isSpinning) viewer.spin('y', 0.5);
  }, [isSpinning]);

  /* -- dimensions --------------------------------------------------------- */
  const cssWidth = typeof width === 'number' ? `${width}px` : width;
  const cssHeight = typeof height === 'number' ? `${height}px` : height;

  const hasScienceData =
    molData?.charges?.length > 0 || molData?.features?.length > 0;

  return (
    <div className="relative" style={{ width: cssWidth, height: cssHeight }}>
      {/* WebGL canvas target */}
      <div
        ref={viewerRef}
        className={`absolute inset-0 rounded-xl border border-white/10 bg-[#111827] shadow-inner ${
          measureMode ? 'cursor-crosshair' : 'cursor-move'
        }`}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />

      {/* -- Bottom Glass Toolbar ------------------------------------------ */}
      {showControls && !isLoading && !error && smiles && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          <ControlButton icon={Box} label="Stick" active={viewMode === 'stick'} onClick={() => setViewMode('stick')} />
          <ControlButton icon={Circle} label="Sphere" active={viewMode === 'sphere'} onClick={() => setViewMode('sphere')} />
          <ControlButton icon={Minus} label="Line" active={viewMode === 'line'} onClick={() => setViewMode('line')} />
          <div className="w-px h-5 bg-white/20 mx-1" />
          <ControlButton icon={Layers} label="Surface" active={showSurface} onClick={() => setShowSurface((p) => !p)} />
          <ControlButton icon={isSpinning ? Pause : Play} label={isSpinning ? 'Stop Spin' : 'Start Spin'} active={isSpinning} onClick={handleToggleSpin} />
          <ControlButton icon={Camera} label="Screenshot" active={false} onClick={handleScreenshot} />
          <ControlButton icon={RefreshCw} label="Reset View" active={false} onClick={handleReset} />
        </div>
      )}

      {/* -- Right Science Toolbar ----------------------------------------- */}
      {showControls && !isLoading && !error && smiles && hasScienceData && (
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
          <ScienceButton icon={Zap} label="Electrostatics" active={showElectrostatics} onClick={toggleElectrostatics} activeColor="text-rose-400" />
          <ScienceButton icon={Magnet} label="Pharmacophores" active={showPharmacophores} onClick={togglePharmacophores} activeColor="text-emerald-400" />
          <ScienceButton icon={Ruler} label="Measure Distance" active={measureMode} onClick={toggleMeasure} activeColor="text-amber-400" />
        </div>
      )}

      {/* -- Electrostatic Legend ------------------------------------------- */}
      {showElectrostatics && showControls && (
        <div className="absolute bottom-14 left-4 z-30 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-xs text-white">
          <div className="font-bold mb-2">Surface Charge (ESP)</div>
          <div className="w-24 h-2 bg-gradient-to-r from-red-500 via-white to-blue-500 rounded-full" />
          <div className="flex justify-between mt-1 text-[10px] text-slate-300">
            <span>{"\u03B4"}&minus; Neg</span>
            <span>{"\u03B4"}+ Pos</span>
          </div>
        </div>
      )}

      {/* -- Pharmacophore Legend ------------------------------------------- */}
      {showPharmacophores && showControls && (
        <div className="absolute bottom-14 left-4 z-30 p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-xs text-white">
          <div className="font-bold mb-2">Binding Features</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2" /> H-Bond Donor</div>
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 mr-2" /> H-Bond Acceptor</div>
            <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2" /> Aromatic Ring</div>
          </div>
        </div>
      )}

      {/* -- Measurement HUD ----------------------------------------------- */}
      {measureMode && showControls && (
        <div className="absolute top-4 left-4 z-30 px-3 py-2 bg-black/60 backdrop-blur-md rounded-xl border border-amber-500/30 text-xs text-white">
          <div className="font-bold text-amber-400 mb-1 flex items-center gap-1">
            <Ruler className="w-3 h-3" /> Measure Mode
          </div>
          {measurement ? (
            <div className="font-mono">
              {measurement.a1} &rarr; {measurement.a2}:{' '}
              <span className="text-amber-300 font-bold">{measurement.dist} &#x212B;</span>
            </div>
          ) : (
            <div className="text-slate-400">Click two atoms to measure</div>
          )}
        </div>
      )}

      {/* -- Hover Atom Info ------------------------------------------------ */}
      {hoveredAtom && showControls && !measureMode && (
        <div className="absolute top-3 right-3 z-30 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-xs text-slate-200 font-mono">
          {hoveredAtom.elem} #{hoveredAtom.serial}
          {hoveredAtom.charge != null && (
            <span className={parseFloat(hoveredAtom.charge) >= 0 ? ' text-blue-400' : ' text-rose-400'}>
              {' '}({parseFloat(hoveredAtom.charge) >= 0 ? '+' : ''}{hoveredAtom.charge})
            </span>
          )}
          <span className="text-slate-500">
            {' '}({hoveredAtom.x}, {hoveredAtom.y}, {hoveredAtom.z})
          </span>
        </div>
      )}

      {/* -- Loading ------------------------------------------------------- */}
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl z-10"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', pointerEvents: 'none' }}
        >
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      )}

      {/* -- Error --------------------------------------------------------- */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-400 text-sm p-4 text-center z-20">
          <AlertTriangle className="w-6 h-6 mb-2 opacity-80" />
          <span>{error}</span>
        </div>
      )}

      {/* -- Empty --------------------------------------------------------- */}
      {!smiles && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
          Waiting for molecule...
        </div>
      )}
    </div>
  );
};

export default Molecule3DViewer;

import React, { useState, useEffect, useRef } from 'react';
import { Eye, Download, Maximize2, RotateCcw, Settings, Info } from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';
import { getTextClasses } from '../utils/themeUtils';

/**
 * Molecular Visualization Component
 * Displays 2D/3D molecular structures using RDKit or similar libraries
 */
const MolecularVisualization = ({ 
  smiles, 
  title = "Molecular Structure",
  showControls = true,
  autoRotate = false,
  style2D = true 
}) => {
  const { isDarkMode } = useDrugForge();
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(style2D ? '2d' : '3d');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    atomLabels: true,
    bondStyle: 'solid',
    colorScheme: 'cpk',
    showHydrogens: false,
    bondWidth: 2
  });

  // Mock molecular properties (in real implementation, would come from RDKit)
  const [molecularProps, setMolecularProps] = useState(null);

  useEffect(() => {
    if (smiles) {
      generateMolecularVisualization();
      calculateMolecularProperties();
    }
  }, [smiles, currentStyle, settings]);

  const generateMolecularVisualization = async () => {
    if (!smiles || !canvasRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      // Mock implementation - in real app, would use RDKit-JS or similar
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mock molecular drawing
      await drawMockMolecule(ctx, canvas.width, canvas.height);
      
    } catch (err) {
      setError(`Failed to generate molecular structure: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const drawMockMolecule = async (ctx, width, height) => {
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 500));

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 8;

    // Mock benzene ring structure
    const atoms = [];
    const bonds = [];

    // Generate benzene ring coordinates
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      atoms.push({
        x: centerX + Math.cos(angle) * scale,
        y: centerY + Math.sin(angle) * scale,
        element: 'C',
        color: settings.colorScheme === 'cpk' ? '#909090' : '#000000'
      });
    }

    // Add bonds
    for (let i = 0; i < 6; i++) {
      bonds.push({
        from: i,
        to: (i + 1) % 6,
        type: i % 2 === 0 ? 'double' : 'single'
      });
    }

    // Add functional groups based on SMILES complexity
    if (smiles.includes('O')) {
      atoms.push({
        x: centerX + scale * 1.5,
        y: centerY,
        element: 'O',
        color: '#ff0000'
      });
      bonds.push({ from: 0, to: atoms.length - 1, type: 'single' });
    }

    if (smiles.includes('N')) {
      atoms.push({
        x: centerX - scale * 1.5,
        y: centerY,
        element: 'N',
        color: '#0000ff'
      });
      bonds.push({ from: 3, to: atoms.length - 1, type: 'single' });
    }

    // Draw bonds
    ctx.strokeStyle = isDarkMode ? '#ffffff' : '#000000';
    ctx.lineWidth = settings.bondWidth;
    bonds.forEach(bond => {
      const fromAtom = atoms[bond.from];
      const toAtom = atoms[bond.to];
      
      ctx.beginPath();
      ctx.moveTo(fromAtom.x, fromAtom.y);
      ctx.lineTo(toAtom.x, toAtom.y);
      
      if (bond.type === 'double') {
        ctx.stroke();
        // Draw second line for double bond
        const offset = 5;
        const dx = toAtom.x - fromAtom.x;
        const dy = toAtom.y - fromAtom.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const offsetX = -dy / length * offset;
        const offsetY = dx / length * offset;
        
        ctx.beginPath();
        ctx.moveTo(fromAtom.x + offsetX, fromAtom.y + offsetY);
        ctx.lineTo(toAtom.x + offsetX, toAtom.y + offsetY);
      }
      ctx.stroke();
    });

    // Draw atoms
    atoms.forEach(atom => {
      if (settings.atomLabels) {
        ctx.fillStyle = atom.color;
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(atom.element, atom.x, atom.y + 5);
      }
    });

    // Add title
    ctx.fillStyle = isDarkMode ? '#ffffff' : '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, centerX, 30);
    
    // Add SMILES string
    ctx.font = '12px monospace';
    ctx.fillText(smiles, centerX, height - 20);
  };

  const calculateMolecularProperties = async () => {
    if (!smiles) return;

    // Mock molecular properties calculation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setMolecularProps({
      molecularWeight: (Math.random() * 400 + 100).toFixed(2),
      logP: (Math.random() * 6 - 1).toFixed(2),
      hbd: Math.floor(Math.random() * 5),
      hba: Math.floor(Math.random() * 10),
      rotBonds: Math.floor(Math.random() * 15),
      psa: (Math.random() * 150).toFixed(1),
      atomCount: smiles.length - smiles.split('').filter(c => '()[]'.includes(c)).length
    });
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `molecule_${title.replace(/\s+/g, '_')}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const resetView = () => {
    generateMolecularVisualization();
  };

  const toggleFullscreen = () => {
    if (canvasRef.current) {
      if (canvasRef.current.requestFullscreen) {
        canvasRef.current.requestFullscreen();
      }
    }
  };

  if (!smiles) {
    return (
      <div className={`p-8 text-center rounded-lg border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}>
        <Eye className={`h-12 w-12 mx-auto mb-4 ${getTextClasses(isDarkMode, 'muted')}`} />
        <p className={getTextClasses(isDarkMode, 'secondary')}>
          Enter a SMILES string to visualize the molecular structure
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className={`text-lg font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
          {title}
        </h3>
        
        {showControls && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentStyle(currentStyle === '2d' ? '3d' : '2d')}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title="Toggle 2D/3D view"
            >
              {currentStyle.toUpperCase()}
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1 rounded transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            
            <button
              onClick={resetView}
              className={`p-1 rounded transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            
            <button
              onClick={toggleFullscreen}
              className={`p-1 rounded transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            
            <button
              onClick={downloadImage}
              className={`p-1 rounded transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Download image"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.atomLabels}
                onChange={(e) => setSettings(prev => ({ ...prev, atomLabels: e.target.checked }))}
                className="rounded"
              />
              <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                Atom Labels
              </span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showHydrogens}
                onChange={(e) => setSettings(prev => ({ ...prev, showHydrogens: e.target.checked }))}
                className="rounded"
              />
              <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                Show Hydrogens
              </span>
            </label>
            
            <div>
              <label className={`block text-sm ${getTextClasses(isDarkMode, 'secondary')} mb-1`}>
                Color Scheme
              </label>
              <select
                value={settings.colorScheme}
                onChange={(e) => setSettings(prev => ({ ...prev, colorScheme: e.target.value }))}
                className={`w-full text-sm p-1 border rounded ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="cpk">CPK Colors</option>
                <option value="mono">Monochrome</option>
                <option value="element">By Element</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Visualization Canvas */}
        <div className="flex-1 p-4">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                    Generating structure...
                  </p>
                </div>
              </div>
            )}
            
            {error ? (
              <div className={`p-8 text-center rounded border ${
                isDarkMode ? 'border-red-600 bg-red-900/20' : 'border-red-300 bg-red-50'
              }`}>
                <p className="text-red-500 mb-2">{error}</p>
                <button
                  onClick={generateMolecularVisualization}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                className="w-full border rounded"
                style={{ maxHeight: '300px' }}
              />
            )}
          </div>
        </div>

        {/* Properties Panel */}
        {molecularProps && (
          <div className={`w-64 p-4 border-l border-gray-200 dark:border-gray-700 ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
            <div className="flex items-center mb-3">
              <Info className="h-4 w-4 mr-2 text-blue-500" />
              <h4 className={`font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
                Properties
              </h4>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={getTextClasses(isDarkMode, 'secondary')}>MW:</span>
                <span className={getTextClasses(isDarkMode, 'primary')}>{molecularProps.molecularWeight}</span>
              </div>
              <div className="flex justify-between">
                <span className={getTextClasses(isDarkMode, 'secondary')}>LogP:</span>
                <span className={getTextClasses(isDarkMode, 'primary')}>{molecularProps.logP}</span>
              </div>
              <div className="flex justify-between">
                <span className={getTextClasses(isDarkMode, 'secondary')}>HBD:</span>
                <span className={getTextClasses(isDarkMode, 'primary')}>{molecularProps.hbd}</span>
              </div>
              <div className="flex justify-between">
                <span className={getTextClasses(isDarkMode, 'secondary')}>HBA:</span>
                <span className={getTextClasses(isDarkMode, 'primary')}>{molecularProps.hba}</span>
              </div>
              <div className="flex justify-between">
                <span className={getTextClasses(isDarkMode, 'secondary')}>RotBonds:</span>
                <span className={getTextClasses(isDarkMode, 'primary')}>{molecularProps.rotBonds}</span>
              </div>
              <div className="flex justify-between">
                <span className={getTextClasses(isDarkMode, 'secondary')}>PSA:</span>
                <span className={getTextClasses(isDarkMode, 'primary')}>{molecularProps.psa}</span>
              </div>
              <div className="flex justify-between">
                <span className={getTextClasses(isDarkMode, 'secondary')}>Atoms:</span>
                <span className={getTextClasses(isDarkMode, 'primary')}>{molecularProps.atomCount}</span>
              </div>
            </div>

            <div className={`mt-4 p-2 rounded text-xs ${
              molecularProps.molecularWeight < 500 && 
              molecularProps.logP < 5 && 
              molecularProps.hbd <= 5 && 
              molecularProps.hba <= 10
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              <strong>Lipinski's Rule:</strong> {
                molecularProps.molecularWeight < 500 && 
                molecularProps.logP < 5 && 
                molecularProps.hbd <= 5 && 
                molecularProps.hba <= 10
                  ? 'Passes'
                  : 'Violations detected'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MolecularVisualization;

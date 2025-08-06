import React, { useState } from 'react';
import { Beaker, Eye, RotateCcw, Info } from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';
import { getTextClasses, getBackgroundClasses } from '../utils/themeUtils';
import RDKitMolecularVisualization from './RDKitMolecularVisualization';
import DirectSVGTest from './DirectSVGTest';

/**
 * Interactive Molecular Visualization Page
 * Provides input interface for SMILES strings and displays molecular structures
 */
const MolecularVisualizationPage = () => {
  const { isDarkMode } = useDrugForge();
  const [smilesInput, setSmilesInput] = useState('');
  const [currentSmiles, setCurrentSmiles] = useState('');
  const [examples] = useState([
    { name: 'Aspirin', smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O', description: 'Common pain reliever' },
    { name: 'Caffeine', smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C', description: 'Stimulant compound' },
    { name: 'Ibuprofen', smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O', description: 'Anti-inflammatory drug' },
    { name: 'Paracetamol', smiles: 'CC(=O)NC1=CC=C(C=C1)O', description: 'Acetaminophen pain reliever' },
    { name: 'Penicillin G', smiles: 'CC1([C@@H](N2[C@H](S1)[C@@H](C2=O)NC(=O)CC3=CC=CC=C3)C(=O)O)C', description: 'β-lactam antibiotic' },
    { name: 'Morphine', smiles: 'CN1CC[C@]23C4=C5C(=C(C=C4)O)O[C@H]2[C@@H](C=C3)[C@H]1C5', description: 'Opioid analgesic' },
    { name: 'Warfarin', smiles: 'CC(=O)CC(C1=CC=CC=C1)C2=C(C3=CC=CC=C3OC2=O)O', description: 'Anticoagulant medication' },
    { name: 'Metformin', smiles: 'CN(C)C(=N)NC(=N)N', description: 'Type 2 diabetes medication' }
  ]);

  const handleVisualize = () => {
    if (smilesInput.trim()) {
      setCurrentSmiles(smilesInput.trim());
    }
  };

  const handleExampleClick = (smiles, name) => {
    setSmilesInput(smiles);
    setCurrentSmiles(smiles);
  };

  const handleClear = () => {
    setSmilesInput('');
    setCurrentSmiles('');
  };

  const isValidSmiles = (smiles) => {
    // Basic SMILES validation
    if (!smiles) return false;
    
    // Check for basic chemical characters
    const smilesPattern = /^[A-Za-z0-9@+\-\[\]()=#\\\/\.]+$/;
    return smilesPattern.test(smiles) && smiles.length > 1;
  };

  return (
    <div className={`min-h-screen p-6 ${getBackgroundClasses(isDarkMode)}`}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 flex items-center ${getTextClasses(isDarkMode, 'primary')}`}>
            <Beaker className="w-8 h-8 mr-3 text-blue-500" />
            Molecular Visualization Studio
          </h1>
          <p className={`text-lg ${getTextClasses(isDarkMode, 'secondary')}`}>
            Visualize molecular structures using RDKit-powered chemical informatics
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
                SMILES Input
              </h2>

              {/* SMILES Input Field */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Enter SMILES String
                </label>
                <div className="space-y-2">
                  <textarea
                    value={smilesInput}
                    onChange={(e) => setSmilesInput(e.target.value)}
                    placeholder="Enter SMILES string (e.g., CC(=O)OC1=CC=CC=C1C(=O)O)"
                    className={`w-full p-3 border rounded-lg resize-none ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    } ${
                      smilesInput && !isValidSmiles(smilesInput) 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                        : ''
                    }`}
                    rows={3}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleVisualize();
                      }
                    }}
                  />
                  
                  {/* Validation Message */}
                  {smilesInput && !isValidSmiles(smilesInput) && (
                    <div className="flex items-center text-sm text-red-500">
                      <Info className="w-4 h-4 mr-1" />
                      Please enter a valid SMILES string
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex mb-6 space-x-2">
                <button
                  onClick={handleVisualize}
                  disabled={!isValidSmiles(smilesInput)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    !isValidSmiles(smilesInput)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Visualize
                </button>
                
                <button
                  onClick={handleClear}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } ${getTextClasses(isDarkMode, 'primary')}`}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </button>
              </div>

              {/* Example Molecules */}
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Example Molecules
                </h3>
                <div className="space-y-2 overflow-y-auto max-h-64">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example.smiles, example.name)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        isDarkMode 
                          ? 'border-gray-600 bg-gray-700 hover:bg-gray-650' 
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className={`font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                        {example.name}
                      </div>
                      <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                        {example.description}
                      </div>
                      <div className={`text-xs font-mono mt-1 ${getTextClasses(isDarkMode, 'muted')}`}>
                        {example.smiles.length > 30 
                          ? `${example.smiles.substring(0, 30)}...` 
                          : example.smiles
                        }
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Help Section */}
              <div className={`mt-6 p-4 rounded-lg border ${
                isDarkMode ? 'bg-blue-900/20 border-blue-600' : 'bg-blue-50 border-blue-200'
              }`}>
                <h4 className={`font-semibold mb-2 flex items-center ${getTextClasses(isDarkMode, 'primary')}`}>
                  <Info className="w-4 h-4 mr-2 text-blue-500" />
                  SMILES Help
                </h4>
                <div className={`text-sm space-y-1 ${getTextClasses(isDarkMode, 'secondary')}`}>
                  <p>• SMILES (Simplified Molecular Input Line Entry System)</p>
                  <p>• Use standard chemical notation (C, N, O, etc.)</p>
                  <p>• Brackets [] for atoms with properties</p>
                  <p>• Parentheses () for branching</p>
                  <p>• Numbers for ring closures</p>
                  <p>• = for double bonds, # for triple bonds</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Panel */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-lg border min-h-96 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
                Molecular Structure
              </h2>

              {currentSmiles ? (
                <div className="space-y-4">
                  {/* Current SMILES Display */}
                  <div className={`p-3 rounded-lg border ${
                    isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                      Current SMILES:
                    </div>
                    <div className={`font-mono text-sm ${getTextClasses(isDarkMode, 'primary')}`}>
                      {currentSmiles}
                    </div>
                  </div>

                  {/* RDKit Visualization Component */}
                  <RDKitMolecularVisualization
                    smiles={currentSmiles}
                    title="Molecular Structure"
                    showControls={true}
                    showProperties={true}
                    width={500}
                    height={400}
                  />

                  {/* Debug: Direct SVG Test */}
                  <div className="mt-6">
                    <DirectSVGTest smiles={currentSmiles} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <Beaker className={`h-16 w-16 mb-4 ${getTextClasses(isDarkMode, 'muted')}`} />
                  <h3 className={`text-lg font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                    Ready to Visualize
                  </h3>
                  <p className={`text-center ${getTextClasses(isDarkMode, 'secondary')}`}>
                    Enter a SMILES string or select an example molecule to see its 2D/3D structure,
                    <br />
                    molecular properties, and chemical descriptors
                  </p>
                  
                  {/* Quick Start Examples */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button
                      onClick={() => handleExampleClick('CC(=O)OC1=CC=CC=C1C(=O)O', 'Aspirin')}
                      className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Try Aspirin
                    </button>
                    <button
                      onClick={() => handleExampleClick('CN1C=NC2=C1C(=O)N(C(=O)N2C)C', 'Caffeine')}
                      className="flex items-center px-4 py-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Try Caffeine
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className={`mt-8 p-6 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
            Features
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h4 className={`font-semibold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                Molecular Rendering
              </h4>
              <ul className={`text-sm space-y-1 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <li>• High-quality 2D structure visualization</li>
                <li>• Customizable atom and bond styling</li>
                <li>• Stereo annotation support</li>
                <li>• SVG-based scalable graphics</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                Chemical Properties
              </h4>
              <ul className={`text-sm space-y-1 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <li>• Molecular weight calculation</li>
                <li>• LogP and TPSA values</li>
                <li>• H-bond donors/acceptors</li>
                <li>• Drug-likeness assessment</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                Advanced Features
              </h4>
              <ul className={`text-sm space-y-1 ${getTextClasses(isDarkMode, 'secondary')}`}>
                <li>• Morgan fingerprint generation</li>
                <li>• RDKit descriptor calculations</li>
                <li>• Structure export capabilities</li>
                <li>• Interactive controls and settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MolecularVisualizationPage;

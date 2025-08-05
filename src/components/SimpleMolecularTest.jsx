import React, { useState } from 'react';
import { useDrugForge } from '../context/DrugForgeContext';

/**
 * Simple test component to debug molecular visualization
 */
const SimpleMolecularTest = () => {
  const { isDarkMode } = useDrugForge();
  const [currentSVG, setCurrentSVG] = useState('');

  const generateTestSVG = (smilesString) => {
    const structures = {
      'CC(=O)OC1=CC=CC=C1C(=O)O': {
        title: 'Aspirin',
        paths: `
          <!-- Benzene ring -->
          <polygon points="100,150 150,120 200,120 250,150 250,200 200,230 150,230 100,200" 
                   fill="none" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
          <!-- Ester group -->
          <line x1="250" y1="150" x2="300" y2="120" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
          <circle cx="320" cy="110" r="6" fill="#ff0000"/>
          <text x="335" y="115" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">O</text>
          <!-- Carboxyl group -->
          <line x1="150" y1="230" x2="150" y2="280" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
          <circle cx="130" cy="300" r="6" fill="#ff0000"/>
          <circle cx="170" cy="300" r="6" fill="#ff0000"/>
          <text x="110" y="305" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">O</text>
          <text x="180" y="305" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">OH</text>
          <!-- Acetyl group -->
          <line x1="300" y1="120" x2="350" y2="90" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
          <text x="360" y="95" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">CH₃</text>
        `
      }
    };

    const structure = structures[smilesString];
    if (structure) {
      return `
        <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${isDarkMode ? '#1f2937' : 'white'}"/>
          <g transform="translate(50, 0)">
            ${structure.paths}
          </g>
          <text x="200" y="30" text-anchor="middle" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="16" font-weight="bold">
            ${structure.title}
          </text>
          <text x="200" y="285" text-anchor="middle" fill="${isDarkMode ? '#888888' : '#666666'}" font-size="10" font-family="monospace">
            ${smilesString}
          </text>
        </svg>
      `;
    }

    return `
      <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${isDarkMode ? '#1f2937' : 'white'}"/>
        <text x="200" y="150" text-anchor="middle" fill="${isDarkMode ? '#ffffff' : '#666666'}" font-size="14">
          Unknown molecule: ${smilesString}
        </text>
      </svg>
    `;
  };

  const handleTestClick = () => {
    const aspirinSMILES = 'CC(=O)OC1=CC=CC=C1C(=O)O';
    const svg = generateTestSVG(aspirinSMILES);
    setCurrentSVG(svg);
    console.log('Generated SVG:', svg);
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Molecular Test</h1>
        
        <div className="space-y-6">
          <button
            onClick={handleTestClick}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Generate Aspirin Structure
          </button>

          <div className={`border rounded-lg p-4 ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <h2 className="text-xl font-semibold mb-4">Visualization Result</h2>
            
            {currentSVG ? (
              <div className="border rounded-lg overflow-hidden">
                <div dangerouslySetInnerHTML={{ __html: currentSVG }} />
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Click the button above to generate a molecular structure
              </div>
            )}
          </div>

          <div className={`border rounded-lg p-4 ${
            isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            <h3 className="text-lg font-semibold mb-2">Debug Info</h3>
            <div className="space-y-2 text-sm">
              <div>Dark Mode: {isDarkMode ? 'Yes' : 'No'}</div>
              <div>SVG Generated: {currentSVG ? 'Yes' : 'No'}</div>
              <div>SVG Length: {currentSVG.length} characters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleMolecularTest;

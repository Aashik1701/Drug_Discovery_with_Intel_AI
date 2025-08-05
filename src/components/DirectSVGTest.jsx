import React, { useState, useEffect, useCallback } from 'react';
import { Eye, AlertTriangle } from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';

const DirectSVGTest = ({ smiles = 'CC(=O)OC1=CC=CC=C1C(=O)O' }) => {
  const { isDarkMode } = useDrugForge();
  const [svgContent, setSvgContent] = useState(null);
  const [error, setError] = useState(null);

  const generateDirectSVG = useCallback((smilesString) => {
    console.log('DirectSVGTest: Generating SVG for SMILES:', smilesString);
    
    try {
      // Direct SVG generation for known molecules
      const structures = {
        'CC(=O)OC1=CC=CC=C1C(=O)O': {
          title: 'Aspirin',
          svg: `
            <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="${isDarkMode ? '#1f2937' : 'white'}"/>
              
              <!-- Benzene ring -->
              <polygon points="150,150 200,120 250,120 300,150 300,200 250,230 200,230 150,200" 
                       fill="none" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
              
              <!-- Ester group -->
              <line x1="300" y1="150" x2="350" y2="120" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
              <circle cx="370" cy="110" r="6" fill="#ff0000"/>
              <text x="380" y="115" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">O</text>
              
              <!-- Carboxyl group -->  
              <line x1="200" y1="230" x2="200" y2="280" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
              <circle cx="180" cy="300" r="6" fill="#ff0000"/>
              <circle cx="220" cy="300" r="6" fill="#ff0000"/>
              <text x="160" y="305" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">O</text>
              <text x="230" y="305" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">OH</text>
              
              <!-- Acetyl group -->
              <line x1="350" y1="120" x2="380" y2="90" stroke="${isDarkMode ? '#ffffff' : '#000000'}" stroke-width="2"/>
              <text x="385" y="95" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="12">CH₃</text>
              
              <!-- Title -->
              <text x="200" y="30" text-anchor="middle" fill="${isDarkMode ? '#ffffff' : '#000000'}" font-size="16" font-weight="bold">
                Aspirin
              </text>
              
              <!-- SMILES -->
              <text x="200" y="280" text-anchor="middle" fill="${isDarkMode ? '#888888' : '#666666'}" font-size="10" font-family="monospace">
                ${smilesString}
              </text>
            </svg>
          `
        }
      };

      const structure = structures[smilesString];
      if (structure) {
        console.log('DirectSVGTest: Found structure for', smilesString);
        return structure.svg;
      } else {
        console.log('DirectSVGTest: No structure found for', smilesString, 'generating generic');
        return `
          <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="${isDarkMode ? '#1f2937' : 'white'}"/>
            <text x="200" y="150" text-anchor="middle" fill="${isDarkMode ? '#ffffff' : '#666666'}" font-size="14">
              Unknown molecule: ${smilesString}
            </text>
          </svg>
        `;
      }
    } catch (err) {
      console.error('DirectSVGTest: Error generating SVG:', err);
      throw err;
    }
  }, [isDarkMode]);

  useEffect(() => {
    console.log('DirectSVGTest: useEffect triggered with SMILES:', smiles);
    
    if (smiles) {
      try {
        const svg = generateDirectSVG(smiles);
        setSvgContent(svg);
        setError(null);
        console.log('DirectSVGTest: SVG generated successfully, length:', svg.length);
      } catch (err) {
        console.error('DirectSVGTest: Error in useEffect:', err);
        setError(err.message);
        setSvgContent(null);
      }
    }
  }, [smiles, generateDirectSVG]);

  const handleManualGenerate = () => {
    console.log('DirectSVGTest: Manual generate triggered');
    try {
      const svg = generateDirectSVG(smiles);
      setSvgContent(svg);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSvgContent(null);
    }
  };

  return (
    <div className={`p-6 rounded-lg border ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Direct SVG Test - {smiles}
      </h3>

      <div className="space-y-4">
        {/* Controls */}
        <div className="flex space-x-2">
          <button
            onClick={handleManualGenerate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Generate SVG
          </button>
        </div>

        {/* Debug Info */}
        <div className={`p-3 rounded text-sm ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
        }`}>
          <div>SMILES: {smiles}</div>
          <div>SVG Generated: {svgContent ? 'Yes' : 'No'}</div>
          <div>SVG Length: {svgContent ? svgContent.length : 0} chars</div>
          <div>Error: {error || 'None'}</div>
          <div>Dark Mode: {isDarkMode ? 'Yes' : 'No'}</div>
        </div>

        {/* Visualization */}
        <div className="border rounded-lg" style={{ minHeight: '300px' }}>
          {error ? (
            <div className="flex items-center justify-center h-64 text-red-500">
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
                <p>Error: {error}</p>
              </div>
            </div>
          ) : svgContent ? (
            <div 
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No SVG generated yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectSVGTest;

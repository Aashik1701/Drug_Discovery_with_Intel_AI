// filepath: /Users/aashik/Documents/Drug_Discovery_with_Intel_AI/src/components/VirtualScreening.js
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Loader2, ChevronDown, Search, RefreshCw, Beaker } from 'lucide-react';

function VirtualScreening() {
  const [smiles, setSmiles] = useState('');
  const [targetProtein, setTargetProtein] = useState('ACE2');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [screeningResults, setScreeningResults] = useState([]);
  const [error, setError] = useState('');
  
  // Additional parameters for advanced mode
  const [exhaustiveness, setExhaustiveness] = useState(8);
  const [energyRange, setEnergyRange] = useState(3);
  const [maxEvals, setMaxEvals] = useState(250000);
  
  const proteinOptions = [
    { value: 'ACE2', label: 'ACE2 Receptor', pdbId: '6LZG' },
    { value: 'TMPRSS2', label: 'TMPRSS2 Protease', pdbId: '7MEQ' },
    { value: 'COX2', label: 'Cyclooxygenase-2', pdbId: '5KIR' },
    { value: 'HERG', label: 'hERG Potassium Channel', pdbId: '7CN1' }
  ];
  
  const handleScreenMolecule = useCallback(async (e) => {
    e.preventDefault();
    
    if (!smiles.trim()) {
      setError('Please enter a valid SMILES string');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real implementation, this would call your API
      // Here we'll simulate an API call with a delay
      
      // const apiUrl = import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000";
      // const response = await axios.post(`${apiUrl}/screen`, { 
      //   smiles, 
      //   target: targetProtein,
      //   exhaustiveness,
      //   energyRange,
      //   maxEvals 
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate screening results with more realistic data
      const results = [
        { 
          name: 'Native Pose', 
          smiles: smiles,
          score: -(Math.random() * 8 + 4).toFixed(1), // Negative values are better in docking
          rmsd: 0.0,
          hydrogen_bonds: Math.floor(Math.random() * 5) + 1,
          probability: (Math.random() * 30 + 70).toFixed(1)
        },
        { 
          name: 'Pose 2', 
          smiles: smiles,
          score: -(Math.random() * 6 + 2).toFixed(1),
          rmsd: (Math.random() * 2).toFixed(2),
          hydrogen_bonds: Math.floor(Math.random() * 4),
          probability: (Math.random() * 20 + 50).toFixed(1)
        },
        { 
          name: 'Pose 3', 
          smiles: smiles,
          score: -(Math.random() * 3 + 1).toFixed(1),
          rmsd: (Math.random() * 4).toFixed(2),
          hydrogen_bonds: Math.floor(Math.random() * 3),
          probability: (Math.random() * 30 + 20).toFixed(1)
        },
      ];
      
      setScreeningResults(results);
    } catch (err) {
      console.error("Screening error:", err);
      setError('An error occurred during virtual screening. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [smiles, targetProtein, exhaustiveness, energyRange, maxEvals]);
  
  const getScoreColor = (score) => {
    const absScore = Math.abs(parseFloat(score));
    if (absScore >= 7) return 'text-green-600';
    if (absScore >= 5) return 'text-blue-600';
    if (absScore >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16 p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-6 space-x-2">
        <Beaker className="text-blue-500" size={28} />
        <h1 className="text-3xl font-bold text-gray-800">Virtual Screening</h1>
      </div>
      
      <p className="mb-6 text-gray-600">
        Screen molecules against protein targets to predict binding affinity and potential therapeutic activity.
      </p>
      
      <form onSubmit={handleScreenMolecule} className="space-y-6">
        {/* SMILES Input */}
        <div>
          <label htmlFor="smiles" className="block text-sm font-medium text-gray-700 mb-1">
            SMILES String
          </label>
          <input
            id="smiles"
            type="text"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter SMILES notation (e.g., CC(=O)OC1=CC=CC=C1C(=O)O)"
          />
        </div>
        
        {/* Target Protein Selection */}
        <div>
          <label htmlFor="protein-target" className="block text-sm font-medium text-gray-700 mb-1">
            Target Protein
          </label>
          <select
            id="protein-target"
            value={targetProtein}
            onChange={(e) => setTargetProtein(e.target.value)}
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {proteinOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} (PDB: {option.pdbId})
              </option>
            ))}
          </select>
        </div>
        
        {/* Advanced Options Toggle */}
        <div>
          <button 
            type="button" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            <ChevronDown 
              size={16} 
              className={`ml-1 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {showAdvanced && (
            <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200 space-y-4">
              {/* Exhaustiveness */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="exhaustiveness" className="block text-sm font-medium text-gray-700">
                    Exhaustiveness
                  </label>
                  <span className="text-sm text-gray-500">{exhaustiveness}</span>
                </div>
                <input
                  id="exhaustiveness"
                  type="range"
                  min="1"
                  max="32"
                  step="1"
                  value={exhaustiveness}
                  onChange={(e) => setExhaustiveness(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-100 rounded-md appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Higher values produce more thorough searches but take longer
                </div>
              </div>
              
              {/* Energy Range */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="energy-range" className="block text-sm font-medium text-gray-700">
                    Energy Range (kcal/mol)
                  </label>
                  <span className="text-sm text-gray-500">{energyRange}</span>
                </div>
                <input
                  id="energy-range"
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={energyRange}
                  onChange={(e) => setEnergyRange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-blue-100 rounded-md appearance-none cursor-pointer"
                />
              </div>
              
              {/* Max Evaluations */}
              <div>
                <label htmlFor="max-evals" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Evaluations
                </label>
                <select
                  id="max-evals"
                  value={maxEvals}
                  onChange={(e) => setMaxEvals(parseInt(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={25000}>Quick (25,000)</option>
                  <option value={250000}>Standard (250,000)</option>
                  <option value={1000000}>Thorough (1,000,000)</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center justify-center w-full px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
              isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Search size={20} className="mr-2" />
                Run Screening
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Display */}
      {screeningResults.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Screening Results</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pose</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Binding Score (kcal/mol)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RMSD</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">H-Bonds</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability (%)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {screeningResults.map((result, index) => (
                    <tr key={index} className={index === 0 ? "bg-blue-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.name}
                        {index === 0 && <span className="ml-2 text-xs font-medium text-blue-600">Best</span>}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${getScoreColor(result.score)}`}>
                        {result.score}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {result.rmsd} Å
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {result.hydrogen_bonds}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {result.probability}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <p><strong>Target:</strong> {proteinOptions.find(p => p.value === targetProtein)?.label}</p>
                <p className="mt-1"><strong>SMILES:</strong> <span className="font-mono text-xs">{smiles}</span></p>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                <p>More negative binding scores indicate stronger predicted binding affinity.</p>
              </div>
              
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCw size={16} className="mr-2" />
                Run Another Screening
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VirtualScreening;

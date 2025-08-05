import React, { useState } from 'react';
import { TestTube, CheckCircle, XCircle, Info } from 'lucide-react';
import RDKitMolecularVisualization from './RDKitMolecularVisualization';

/**
 * Test page to verify that different SMILES strings produce different molecular structures
 */
const MolecularVisualizationTest = () => {
  const [currentTest, setCurrentTest] = useState(0);
  
  const testMolecules = [
    {
      name: 'Aspirin',
      smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
      expectedFeatures: ['benzene ring', 'ester group', 'carboxyl group', 'acetyl group'],
      description: 'Should show benzene ring with ester and carboxyl substituents'
    },
    {
      name: 'Caffeine',
      smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
      expectedFeatures: ['purine ring system', 'nitrogens', 'methyls', 'carbonyls'],
      description: 'Should show fused ring system with multiple nitrogens'
    },
    {
      name: 'Ibuprofen',
      smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
      expectedFeatures: ['benzene ring', 'propyl chain', 'carboxyl side chain'],
      description: 'Should show benzene ring with alkyl and carboxyl substituents'
    },
    {
      name: 'Paracetamol',
      smiles: 'CC(=O)NC1=CC=C(C=C1)O',
      expectedFeatures: ['benzene ring', 'hydroxyl group', 'amide group'],
      description: 'Should show para-substituted benzene ring'
    },
    {
      name: 'Simple Chain',
      smiles: 'CCCCCCCC',
      expectedFeatures: ['linear chain', 'no rings'],
      description: 'Should show linear alkyl chain structure'
    },
    {
      name: 'Benzene',
      smiles: 'c1ccccc1',
      expectedFeatures: ['aromatic ring', 'symmetrical'],
      description: 'Should show simple aromatic ring'
    }
  ];

  const nextTest = () => {
    setCurrentTest((prev) => (prev + 1) % testMolecules.length);
  };

  const prevTest = () => {
    setCurrentTest((prev) => (prev - 1 + testMolecules.length) % testMolecules.length);
  };

  const currentMolecule = testMolecules[currentTest];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
            <TestTube className="h-8 w-8 mr-3 text-blue-500" />
            Molecular Structure Verification Test
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Testing that different SMILES strings produce unique molecular structures
          </p>
        </div>

        {/* Test Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Test {currentTest + 1} of {testMolecules.length}: {currentMolecule.name}
            </h2>
            
            <div className="flex space-x-2">
              <button
                onClick={prevTest}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextTest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Test Information */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Test Details
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Molecule:</strong> {currentMolecule.name}</p>
                  <p><strong>SMILES:</strong> <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{currentMolecule.smiles}</code></p>
                  <p><strong>Description:</strong> {currentMolecule.description}</p>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Expected Features
                </h3>
                <ul className="space-y-1 text-sm">
                  {currentMolecule.expectedFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-green-800 dark:text-green-200">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progress Indicator */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Progress</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentTest + 1) / testMolecules.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {currentTest + 1} / {testMolecules.length} molecules tested
                </p>
              </div>
            </div>

            {/* Molecular Visualization */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Rendered Structure
              </h3>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                <RDKitMolecularVisualization
                  smiles={currentMolecule.smiles}
                  title={currentMolecule.name}
                  showControls={true}
                  showProperties={true}
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>

        {/* All Molecules Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            All Test Molecules Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testMolecules.map((molecule, index) => (
              <button
                key={index}
                onClick={() => setCurrentTest(index)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  index === currentTest
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {molecule.name}
                  </span>
                  {index === currentTest && (
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono block mb-2">
                  {molecule.smiles.length > 30 ? `${molecule.smiles.substring(0, 30)}...` : molecule.smiles}
                </code>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {molecule.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            Testing Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
            <li>Click through each test molecule using the Previous/Next buttons</li>
            <li>Verify that each molecule shows a unique structure (not the same generic ring)</li>
            <li>Check that known drugs (Aspirin, Caffeine, etc.) show recognizable structures</li>
            <li>Ensure molecular properties change appropriately for each compound</li>
            <li>Confirm that different functional groups are visible in the structures</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MolecularVisualizationTest;

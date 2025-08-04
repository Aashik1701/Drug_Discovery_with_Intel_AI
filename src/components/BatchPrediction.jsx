import React, { useState, useCallback, useRef } from 'react';
import { Upload, Download, Play, Pause, Trash2, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';
import { validateSmiles } from '../utils/chemUtils';
import { getTextClasses, getBackgroundClasses } from '../utils/themeUtils';
import LoadingSpinner from './shared/LoadingSpinner';

/**
 * Batch Prediction Component for processing multiple SMILES at once
 * Supports CSV upload, real-time progress tracking, and result export
 */
const BatchPrediction = () => {
  const { isDarkMode } = useDrugForge();
  const fileInputRef = useRef(null);
  
  const [batchData, setBatchData] = useState([]);
  const [selectedPredictionType, setSelectedPredictionType] = useState('bbbp');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);
  const [processingSpeed, setProcessingSpeed] = useState('medium');

  const predictionTypes = [
    { id: 'bbbp', name: 'Blood-Brain Barrier Permeability', endpoint: '/predict/bbbp' },
    { id: 'cyp3a4', name: 'CYP3A4 Inhibition', endpoint: '/predict/cyp3a4' },
    { id: 'toxicity', name: 'Toxicity Assessment', endpoint: '/predict/toxicity' },
    { id: 'binding-score', name: 'Binding Score', endpoint: '/predict/binding-score', requiresTarget: true },
    { id: 'half-life', name: 'Half-Life Prediction', endpoint: '/predict/half-life' },
    { id: 'cox2', name: 'COX-2 Selectivity', endpoint: '/predict/cox2' },
    { id: 'hepg2', name: 'HepG2 Toxicity', endpoint: '/predict/hepg2' },
    { id: 'ace2', name: 'ACE2 Binding', endpoint: '/predict/ace2' }
  ];

  const speedOptions = [
    { id: 'slow', name: 'Slow (2s delay)', delay: 2000 },
    { id: 'medium', name: 'Medium (1s delay)', delay: 1000 },
    { id: 'fast', name: 'Fast (0.5s delay)', delay: 500 },
    { id: 'turbo', name: 'Turbo (No delay)', delay: 0 }
  ];

  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    const smilesIndex = headers.findIndex(h => 
      h.toLowerCase().includes('smiles') || h.toLowerCase().includes('molecule')
    );
    const nameIndex = headers.findIndex(h => 
      h.toLowerCase().includes('name') || h.toLowerCase().includes('id')
    );
    const targetIndex = headers.findIndex(h => 
      h.toLowerCase().includes('target') || h.toLowerCase().includes('protein')
    );

    if (smilesIndex === -1) {
      throw new Error('CSV must contain a column with "smiles" or "molecule" in the header');
    }

    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      if (values[smilesIndex]) {
        const item = {
          id: i,
          smiles: values[smilesIndex],
          name: nameIndex !== -1 ? values[nameIndex] : `Compound ${i}`,
          target: targetIndex !== -1 ? values[targetIndex] : ''
        };
        
        // Validate SMILES
        const validation = validateSmiles(item.smiles);
        item.isValid = validation.valid;
        item.validationError = validation.error;
        
        data.push(item);
      }
    }

    return data;
  };

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = parseCSV(e.target.result);
        setBatchData(data);
        setResults([]);
        setErrors([]);
        setProgress({ current: 0, total: 0 });
      } catch (error) {
        setErrors([{ message: error.message, type: 'file-parse' }]);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleManualInput = () => {
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter SMILES strings, one per line:\nCC(=O)OC1=CC=CC=C1C(=O)O\nCN1C=NC2=C1C(=O)N(C(=O)N2C)C\n...';
    textarea.className = `w-full h-32 p-3 border rounded-md ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white' 
        : 'bg-white border-gray-300 text-gray-900'
    }`;

    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`;
    modal.innerHTML = `
      <div class="${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}">
          Enter SMILES Manually
        </h3>
        <div class="mb-4"></div>
        <div class="flex space-x-2">
          <button id="confirm-btn" class="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Add SMILES
          </button>
          <button id="cancel-btn" class="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </div>
    `;

    modal.querySelector('.mb-4').appendChild(textarea);
    document.body.appendChild(modal);

    modal.querySelector('#confirm-btn').onclick = () => {
      const lines = textarea.value.split('\n').filter(line => line.trim());
      const data = lines.map((smiles, index) => {
        const validation = validateSmiles(smiles.trim());
        return {
          id: index + 1,
          smiles: smiles.trim(),
          name: `Compound ${index + 1}`,
          target: '',
          isValid: validation.valid,
          validationError: validation.error
        };
      });
      
      setBatchData(data);
      setResults([]);
      setErrors([]);
      setProgress({ current: 0, total: 0 });
      document.body.removeChild(modal);
    };

    modal.querySelector('#cancel-btn').onclick = () => {
      document.body.removeChild(modal);
    };

    modal.onclick = (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    };

    textarea.focus();
  };

  const processBatch = async () => {
    if (batchData.length === 0) return;

    const validData = batchData.filter(item => item.isValid);
    if (validData.length === 0) {
      setErrors([{ message: 'No valid SMILES found in the batch', type: 'validation' }]);
      return;
    }

    setIsProcessing(true);
    setIsPaused(false);
    setProgress({ current: 0, total: validData.length });
    setResults([]);
    setErrors([]);

    const predictionType = predictionTypes.find(p => p.id === selectedPredictionType);
    const delay = speedOptions.find(s => s.id === processingSpeed).delay;
    const batchResults = [];
    const batchErrors = [];

    for (let i = 0; i < validData.length; i++) {
      if (isPaused) {
        // Wait for resume
        while (isPaused && isProcessing) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      if (!isProcessing) break; // Stopped

      const item = validData[i];
      try {
        const requestData = { smiles: item.smiles };
        if (predictionType.requiresTarget && item.target) {
          requestData.target = item.target;
        }

        const response = await fetch(`http://localhost:5001${predictionType.endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const result = {
          ...item,
          prediction: data,
          timestamp: new Date().toISOString(),
          success: true
        };

        batchResults.push(result);
        setResults(prev => [...prev, result]);
      } catch (error) {
        const errorResult = {
          ...item,
          error: error.message,
          timestamp: new Date().toISOString(),
          success: false
        };

        batchErrors.push(errorResult);
        setErrors(prev => [...prev, errorResult]);
      }

      setProgress({ current: i + 1, total: validData.length });

      // Add delay if specified
      if (delay > 0 && i < validData.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    setIsProcessing(false);
    setIsPaused(false);
  };

  const exportResults = () => {
    const allResults = [...results, ...errors];
    const csv = [
      'Name,SMILES,Success,Prediction,Error,Timestamp',
      ...allResults.map(r => [
        r.name,
        r.smiles,
        r.success,
        r.success ? JSON.stringify(r.prediction).replace(/"/g, '""') : '',
        r.error || '',
        r.timestamp
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `batch_predictions_${selectedPredictionType}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearBatch = () => {
    setBatchData([]);
    setResults([]);
    setErrors([]);
    setProgress({ current: 0, total: 0 });
    setIsProcessing(false);
    setIsPaused(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadTemplate = () => {
    const requiresTarget = predictionTypes.find(p => p.id === selectedPredictionType)?.requiresTarget;
    const headers = requiresTarget 
      ? 'name,smiles,target'
      : 'name,smiles';
    const examples = requiresTarget
      ? 'Aspirin,CC(=O)OC1=CC=CC=C1C(=O)O,COX2\nCaffeine,CN1C=NC2=C1C(=O)N(C(=O)N2C)C,EGFR'
      : 'Aspirin,CC(=O)OC1=CC=CC=C1C(=O)O\nCaffeine,CN1C=NC2=C1C(=O)N(C(=O)N2C)C';
    
    const csv = `${headers}\n${examples}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `batch_template_${selectedPredictionType}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen p-6 ${getBackgroundClasses(isDarkMode)}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
            Batch Prediction Processing
          </h1>
          <p className={`text-lg ${getTextClasses(isDarkMode, 'secondary')}`}>
            Process multiple compounds simultaneously with real-time progress tracking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className={`lg:col-span-1 p-6 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
              Configuration
            </h2>

            {/* Prediction Type */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                Prediction Type
              </label>
              <select
                value={selectedPredictionType}
                onChange={(e) => setSelectedPredictionType(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                disabled={isProcessing}
              >
                {predictionTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Processing Speed */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                Processing Speed
              </label>
              <select
                value={processingSpeed}
                onChange={(e) => setProcessingSpeed(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                disabled={isProcessing}
              >
                {speedOptions.map(speed => (
                  <option key={speed.id} value={speed.id}>
                    {speed.name}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                Data Input
              </label>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isProcessing}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full flex items-center justify-center p-2 border-2 border-dashed rounded-md transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 hover:border-gray-500 text-gray-300' 
                      : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
                  disabled={isProcessing}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload CSV File
                </button>
                <button
                  onClick={handleManualInput}
                  className={`w-full flex items-center justify-center p-2 border rounded-md transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                  disabled={isProcessing}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Enter Manually
                </button>
                <button
                  onClick={downloadTemplate}
                  className={`w-full flex items-center justify-center p-2 border rounded-md transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </button>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="space-y-2">
              {!isProcessing ? (
                <button
                  onClick={processBatch}
                  disabled={batchData.length === 0}
                  className={`w-full flex items-center justify-center py-2 px-4 rounded-md font-semibold transition-colors ${
                    batchData.length === 0
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Processing
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className={`w-full flex items-center justify-center py-2 px-4 rounded-md font-semibold transition-colors ${
                      isPaused ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white`}
                  >
                    {isPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={() => {
                      setIsProcessing(false);
                      setIsPaused(false);
                    }}
                    className="w-full flex items-center justify-center py-2 px-4 rounded-md font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    Stop Processing
                  </button>
                </div>
              )}
              
              <button
                onClick={clearBatch}
                disabled={isProcessing}
                className={`w-full flex items-center justify-center py-2 px-4 rounded-md font-semibold transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : isDarkMode 
                      ? 'bg-gray-600 text-white hover:bg-gray-700' 
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            {isProcessing && (
              <div className={`p-4 rounded-lg border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                    Processing Progress
                  </span>
                  <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                    {progress.current} / {progress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  ></div>
                </div>
                {isPaused && (
                  <p className="text-sm text-yellow-500">Processing paused...</p>
                )}
              </div>
            )}

            {/* Data Preview */}
            {batchData.length > 0 && (
              <div className={`p-4 rounded-lg border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
                    Batch Data ({batchData.length} compounds)
                  </h3>
                  {(results.length > 0 || errors.length > 0) && (
                    <button
                      onClick={exportResults}
                      className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export Results
                    </button>
                  )}
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {batchData.map((item) => {
                      const result = results.find(r => r.id === item.id);
                      const error = errors.find(e => e.id === item.id);
                      const processing = isProcessing && progress.current >= item.id && !result && !error;

                      return (
                        <div
                          key={item.id}
                          className={`p-3 rounded-md border ${
                            result ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                            error ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                            processing ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                            !item.isValid ? 'border-red-300 bg-red-50 dark:bg-red-900/10' :
                            isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center">
                                {result && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
                                {error && <AlertCircle className="h-4 w-4 text-red-500 mr-2" />}
                                {processing && <LoadingSpinner size="small" />}
                                <span className={`font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                                  {item.name}
                                </span>
                              </div>
                              <p className={`text-sm mt-1 ${getTextClasses(isDarkMode, 'secondary')}`}>
                                {item.smiles}
                              </p>
                              {!item.isValid && (
                                <p className="text-sm text-red-500 mt-1">
                                  Invalid SMILES: {item.validationError}
                                </p>
                              )}
                              {error && (
                                <p className="text-sm text-red-500 mt-1">
                                  Error: {error.error}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {batchData.length === 0 && (
              <div className={`p-8 text-center rounded-lg border-2 border-dashed ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              }`}>
                <Upload className={`h-12 w-12 mx-auto mb-4 ${getTextClasses(isDarkMode, 'muted')}`} />
                <h3 className={`text-lg font-semibold mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                  No Data Loaded
                </h3>
                <p className={`mb-4 ${getTextClasses(isDarkMode, 'secondary')}`}>
                  Upload a CSV file or enter SMILES manually to get started
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Upload CSV File
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchPrediction;

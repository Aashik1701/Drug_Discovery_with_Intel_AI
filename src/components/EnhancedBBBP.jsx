import React, { useState } from "react";
import { useDrugForge } from '../context/DrugForgeContext';
import { validateSmiles } from "../utils/chemUtils";
import useEnhancedPrediction from "../hooks/useEnhancedPrediction";
import PredictionLayout from "./shared/PredictionLayout";
import EnhancedFormInput from "./shared/EnhancedFormInput";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorDisplay from "./shared/ErrorDisplay";
import EnhancedResultDisplay from "./shared/EnhancedResultDisplay";
import AnalyticsDashboard from "./shared/AnalyticsDashboard";

const EnhancedBBBP = () => {
  const { isDarkMode } = useDrugForge();
  const [formData, setFormData] = useState({ smiles: "" });
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Validation function
  const validateInput = (data) => {
    if (!data.smiles) {
      return "SMILES string is required";
    }
    const smilesValidation = validateSmiles(data.smiles);
    return smilesValidation.valid ? null : smilesValidation.error;
  };
  
  // Result formatting function
  const formatResult = (data) => ({
    predictedClass: data.predictedClass || data.prediction,
    predictedProbability: data.predictedProbability || data.probability,
    confidence: data.confidence,
    interpretation: data.predictedClass === 1 || data.prediction === 1
      ? "This compound is predicted to cross the blood-brain barrier. It may have good CNS bioavailability."
      : "This compound is predicted NOT to cross the blood-brain barrier. It may have limited CNS penetration.",
    additionalInfo: "Blood-Brain Barrier Permeability (BBBP) prediction helps assess whether a compound can effectively reach the central nervous system."
  });
  
  // Enhanced prediction hook with analytics
  const {
    isLoading,
    result,
    error,
    showResult,
    predict,
    history,
    analytics,
    retryCount,
    clearHistory,
    exportHistory,
    recentSuccessRate
  } = useEnhancedPrediction(
    "http://localhost:5001/predict/bbbp",
    validateInput,
    formatResult,
    {
      enableHistory: true,
      enableRetry: true,
      maxRetries: 3,
      maxHistorySize: 20
    }
  );

  // Common SMILES examples for suggestions
  const commonSmilesExamples = [
    "CC(=O)OC1=CC=CC=C1C(=O)O", // Aspirin
    "CC1=CC=C(C=C1)C(C)C(=O)O", // Ibuprofen
    "CN1C=NC2=C1C(=O)N(C(=O)N2C)C", // Caffeine
    "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O", // Ibuprofen alternative
    "C1=CC=C(C=C1)C(=O)O" // Benzoic acid
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await predict(formData);
  };

  const handleExportResult = (result) => {
    const exportData = {
      ...result,
      smiles: formData.smiles,
      timestamp: new Date().toISOString(),
      predictionType: 'BBBP'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'bbbp_prediction.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const description = `Blood-Brain Barrier Permeability (BBBP) prediction determines whether a compound can cross the blood-brain barrier, which is crucial for developing drugs that target the central nervous system. This enhanced version includes real-time validation, prediction analytics, and exportable results.`;

  return (
    <div className="space-y-6">
      <PredictionLayout 
        title="Enhanced BBBP Prediction" 
        description={description}
        isDarkMode={isDarkMode}
      >
        {/* Analytics Toggle */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {analytics.totalPredictions > 0 && (
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Success Rate: {recentSuccessRate}% | Total: {analytics.totalPredictions}
              </div>
            )}
            {retryCount > 0 && (
              <div className="text-sm text-yellow-500">
                Retrying... ({retryCount}/3)
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <EnhancedFormInput
            label="Enter SMILES String"
            type="text"
            id="smiles"
            name="smiles"
            value={formData.smiles}
            onChange={handleChange}
            placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
            required
            isDarkMode={isDarkMode}
            validationType="smiles"
            realTimeValidation={true}
            suggestions={commonSmilesExamples}
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white font-semibold rounded-md transition-colors ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Predicting..." : "Predict BBBP"}
          </button>
        </form>

        {isLoading && <LoadingSpinner isDarkMode={isDarkMode} message="Analyzing blood-brain barrier permeability..." />}
        
        {error && <ErrorDisplay error={error} isDarkMode={isDarkMode} />}
        
        {showResult && result && (
          <EnhancedResultDisplay 
            result={result} 
            isDarkMode={isDarkMode}
            showAnalytics={true}
            onExport={handleExportResult}
          />
        )}
      </PredictionLayout>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <AnalyticsDashboard
          analytics={analytics}
          history={history}
          isDarkMode={isDarkMode}
          onClearHistory={clearHistory}
          onExportHistory={exportHistory}
        />
      )}
    </div>
  );
};

export default EnhancedBBBP;

import React, { useState } from "react";
import { useDrugForge } from '../context/DrugForgeContext';
import { validateSmiles } from "../utils/chemUtils";
import usePrediction from "../hooks/usePrediction";
import PredictionLayout from "./shared/PredictionLayout";
import FormInput from "./shared/FormInput";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorDisplay from "./shared/ErrorDisplay";
import ResultDisplay from "./shared/ResultDisplay";

const COX2 = () => {
  const { isDarkMode } = useDrugForge();
  const [formData, setFormData] = useState({ smiles: "" });
  
  // SMILES validation function
  const validateInput = (data) => {
    const validation = validateSmiles(data.smiles);
    return validation.valid ? null : validation.error;
  };
  
  // Result formatting function
  const formatResult = (data) => ({
    predictedClass: data["Predicted Class"] || data.prediction,
    predictedProbability: data["Predicted Probability"] || data.confidence,
    interpretation: data.prediction === 1 || data["Predicted Class"] === 1
      ? "This compound shows selectivity for COX-2 enzyme, which may indicate potential as an anti-inflammatory drug with reduced gastrointestinal side effects."
      : "This compound shows low selectivity for COX-2 enzyme."
  });
  
  const { isLoading, result, error, showResult, predict } = usePrediction(
    "http://localhost:5001/predict/cox2",
    validateInput,
    formatResult
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await predict(formData);
  };

  const description = "COX-2 (Cyclooxygenase-2) selectivity is important for developing anti-inflammatory drugs with reduced side effects. This tool predicts whether a compound will selectively inhibit COX-2 over COX-1, which is crucial for minimizing gastrointestinal toxicity while maintaining anti-inflammatory activity.";

  return (
    <PredictionLayout 
      title="COX-2 Selectivity Prediction" 
      description={description}
      isDarkMode={isDarkMode}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Enter SMILES String"
          type="text"
          id="smiles"
          name="smiles"
          value={formData.smiles}
          onChange={handleChange}
          placeholder="e.g., CC(C)CC1=CC=C(C=C1)C(C)C(=O)O"
          required
          isDarkMode={isDarkMode}
        />
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 text-white font-semibold rounded-md transition-colors ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Predicting..." : "Predict COX-2 Selectivity"}
        </button>
      </form>

      {isLoading && <LoadingSpinner isDarkMode={isDarkMode} message="Analyzing COX-2 selectivity..." />}
      
      {error && <ErrorDisplay error={error} isDarkMode={isDarkMode} />}
      
      {showResult && result && <ResultDisplay result={result} isDarkMode={isDarkMode} />}
    </PredictionLayout>
  );
};

export default COX2;

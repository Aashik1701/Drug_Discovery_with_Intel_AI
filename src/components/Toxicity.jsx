import React, { useState } from "react";
import { useDrugForge } from '../context/DrugForgeContext';
import { validateSmiles } from "../utils/chemUtils";
import usePrediction from "../hooks/usePrediction";
import PredictionLayout from "./shared/PredictionLayout";
import FormInput from "./shared/FormInput";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorDisplay from "./shared/ErrorDisplay";
import ResultDisplay from "./shared/ResultDisplay";

const Toxicity = () => {
  const { isDarkMode } = useDrugForge();
  const [formData, setFormData] = useState({ smiles: "" });
  
  // SMILES validation function
  const validateInput = (data) => {
    const validation = validateSmiles(data.smiles);
    return validation.valid ? null : validation.error;
  };
  
  // Result formatting function
  const formatResult = (data) => ({
    toxicity: data.toxicity || data.prediction,
    confidenceScore: data.confidenceScore || data.confidence,
    toxicityEndpoints: data.toxicityEndpoints || data.endpoints,
    interpretation: data.prediction === 1 || data.toxicity === 1
      ? "This compound shows potential toxicity concerns. Further safety evaluation is recommended before proceeding with development."
      : "This compound shows low toxicity risk based on current models. However, comprehensive safety testing is still recommended."
  });
  
  const { isLoading, result, error, showResult, predict } = usePrediction(
    "http://localhost:5001/predict/toxicity",
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

  const description = "General toxicity prediction provides a comprehensive safety assessment of chemical compounds across multiple toxicity endpoints. This tool helps identify potential safety concerns early in drug development, covering various aspects of toxicity including acute toxicity, organ toxicity, and other safety parameters.";

  return (
    <PredictionLayout 
      title="General Toxicity Prediction" 
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
          placeholder="e.g., CCO"
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
          {isLoading ? "Predicting..." : "Predict Toxicity"}
        </button>
      </form>

      {isLoading && <LoadingSpinner isDarkMode={isDarkMode} message="Analyzing toxicity profile..." />}
      
      {error && <ErrorDisplay error={error} isDarkMode={isDarkMode} />}
      
      {showResult && result && <ResultDisplay result={result} isDarkMode={isDarkMode} />}
    </PredictionLayout>
  );
};

export default Toxicity;

import React, { useState } from "react";
import { useDrugForge } from '../context/DrugForgeContext';
import { validateSmiles } from "../utils/chemUtils";
import usePrediction from "../hooks/usePrediction";
import PredictionLayout from "./shared/PredictionLayout";
import FormInput from "./shared/FormInput";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorDisplay from "./shared/ErrorDisplay";
import ResultDisplay from "./shared/ResultDisplay";

const HEPG2 = () => {
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
      ? "This compound may be toxic to liver cells (HepG2). Consider hepatotoxicity assessment and potential liver safety concerns."
      : "This compound shows low toxicity to liver cells (HepG2), suggesting better hepatic safety profile."
  });
  
  const { isLoading, result, error, showResult, predict } = usePrediction(
    "http://localhost:5001/predict/hepg2",
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

  const description = "HepG2 cytotoxicity prediction assesses the potential liver toxicity of compounds using the HepG2 human hepatoma cell line. This is a crucial safety screening tool for drug development, helping identify compounds that may cause hepatotoxicity before advancing to clinical trials.";

  return (
    <PredictionLayout 
      title="HepG2 Cytotoxicity Prediction" 
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
          {isLoading ? "Predicting..." : "Predict HepG2 Toxicity"}
        </button>
      </form>

      {isLoading && <LoadingSpinner isDarkMode={isDarkMode} message="Analyzing liver toxicity..." />}
      
      {error && <ErrorDisplay error={error} isDarkMode={isDarkMode} />}
      
      {showResult && result && <ResultDisplay result={result} isDarkMode={isDarkMode} />}
    </PredictionLayout>
  );
};

export default HEPG2;

import React, { useState } from "react";
import { useDrugForge } from '../context/DrugForgeContext';
import { validateSmiles } from "../utils/chemUtils";
import usePrediction from "../hooks/usePrediction";
import PredictionLayout from "./shared/PredictionLayout";
import FormInput from "./shared/FormInput";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorDisplay from "./shared/ErrorDisplay";
import ResultDisplay from "./shared/ResultDisplay";

const CYP3A4 = () => {
  const { isDarkMode } = useDrugForge();
  const [formData, setFormData] = useState({ smiles: "" });
  
  // SMILES validation function
  const validateInput = (data) => {
    const validation = validateSmiles(data.smiles);
    return validation.valid ? null : validation.error;
  };
  
  // Result formatting function
  const formatResult = (data) => ({
    predictedClass: data["Predicted Class"],
    predictedProbability: data["Predicted Probability for Class 1"],
    interpretation: data["Predicted Class"] === 1
      ? "This compound is likely to interact with CYP3A4, which may cause drug-drug interactions."
      : "This compound is unlikely to interact with CYP3A4, suggesting lower risk of drug-drug interactions."
  });
  
  const { isLoading, result, error, showResult, predict } = usePrediction(
    "http://localhost:5001/predict/cyp3a4",
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

  const description = "CYP3A4 is an important enzyme responsible for metabolizing many medications in the body. This tool predicts whether a compound will interact with CYP3A4, which is crucial for identifying potential drug-drug interactions and optimizing drug metabolism profiles.";

  return (
    <PredictionLayout 
      title="CYP3A4 Interaction Prediction" 
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
          placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
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
          {isLoading ? "Predicting..." : "Predict CYP3A4 Interaction"}
        </button>
      </form>

      {isLoading && <LoadingSpinner isDarkMode={isDarkMode} message="Analyzing CYP3A4 interaction..." />}
      
      {error && <ErrorDisplay error={error} isDarkMode={isDarkMode} />}
      
      {showResult && result && <ResultDisplay result={result} isDarkMode={isDarkMode} />}
    </PredictionLayout>
  );
};

export default CYP3A4;

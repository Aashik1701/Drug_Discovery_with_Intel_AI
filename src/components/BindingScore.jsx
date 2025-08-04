import React, { useState } from "react";
import { useDrugForge } from '../context/DrugForgeContext';
import { validateSmiles } from "../utils/chemUtils";
import usePrediction from "../hooks/usePrediction";
import PredictionLayout from "./shared/PredictionLayout";
import FormInput from "./shared/FormInput";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorDisplay from "./shared/ErrorDisplay";
import ResultDisplay from "./shared/ResultDisplay";

const BindingScore = () => {
  const { isDarkMode } = useDrugForge();
  const [formData, setFormData] = useState({ smiles: "", target: "" });
  
  // Validation function for drug-target binding
  const validateInput = (data) => {
    if (!data.smiles || !data.target) {
      return "Both SMILES and target protein are required";
    }
    const smilesValidation = validateSmiles(data.smiles);
    return smilesValidation.valid ? null : smilesValidation.error;
  };
  
  // Result formatting function
  const formatResult = (data) => ({
    bindingScore: data.bindingScore || data.prediction || data.score,
    affinity: data.affinity,
    confidence: data.confidence,
    interpretation: data.bindingScore > 7 || data.prediction > 7 || data.score > 7
      ? "Strong binding affinity predicted. This compound shows high potential for interacting with the target protein."
      : data.bindingScore > 5 || data.prediction > 5 || data.score > 5
      ? "Moderate binding affinity predicted. Further optimization may improve binding."
      : "Weak binding affinity predicted. Consider structural modifications to improve binding."
  });
  
  const { isLoading, result, error, showResult, predict } = usePrediction(
    "http://localhost:5001/predict/binding-score",
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

  const description = "Protein-ligand binding score prediction estimates the binding affinity between a small molecule compound and a target protein. This is crucial for drug discovery as it helps identify compounds with strong binding potential, which often correlates with biological activity.";

  return (
    <PredictionLayout 
      title="Binding Score Prediction" 
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
        
        <FormInput
          label="Target Protein"
          type="text"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="e.g., EGFR, p53, ACE2"
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
          {isLoading ? "Calculating..." : "Calculate Binding Score"}
        </button>
      </form>

      {isLoading && <LoadingSpinner isDarkMode={isDarkMode} message="Calculating binding affinity..." />}
      
      {error && <ErrorDisplay error={error} isDarkMode={isDarkMode} />}
      
      {showResult && result && <ResultDisplay result={result} isDarkMode={isDarkMode} />}
    </PredictionLayout>
  );
};

export default BindingScore;

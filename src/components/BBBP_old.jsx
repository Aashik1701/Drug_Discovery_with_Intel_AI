import React, { useState } from "react";
import { useDrugForge } from "../context/DrugForgeContext";
import { validateSmiles } from "../utils/chemUtils";
import usePrediction from "../hooks/usePrediction";
import PredictionLayout from "./shared/PredictionLayout";
import FormInput from "./shared/FormInput";
import LoadingSpinner from "./shared/LoadingSpinner";
import ErrorDisplay from "./shared/ErrorDisplay";
import ResultDisplay from "./shared/ResultDisplay";

const BBBP = () => {
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
      ? "This compound is likely to penetrate the Blood-Brain Barrier."
      : "This compound is unlikely to penetrate the Blood-Brain Barrier."
  });
  
  const { isLoading, result, error, showResult, predict } = usePrediction(
    "http://localhost:5001/predict",
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

  const description = "The Blood-Brain Barrier (BBB) is a highly selective membrane that separates the circulating blood from the brain and extracellular fluid. This tool predicts whether a compound can penetrate this barrier, which is crucial for developing drugs that target the central nervous system.";

  return (
    <PredictionLayout 
      title="Blood-Brain Barrier Penetration" 
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
          {isLoading ? "Predicting..." : "Predict BBB Penetration"}
        </button>
      </form>

      {isLoading && <LoadingSpinner isDarkMode={isDarkMode} message="Analyzing compound..." />}
      
      {error && <ErrorDisplay error={error} isDarkMode={isDarkMode} />}
      
      {showResult && result && <ResultDisplay result={result} isDarkMode={isDarkMode} />}
    </PredictionLayout>
  );
};
        </div>
        
        <form onSubmit={handlePredictClick} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200" htmlFor="smiles">
              Enter SMILES String:
            </label>
            <input
              type="text"
              id="smiles"
              name="smiles"
              value={formData.smiles}
              onChange={handleChange}
              placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
              className="w-full px-4 py-2 text-gray-700 dark:text-gray-200 transition border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white font-semibold rounded-md transition-colors ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Predicting..." : "Predict BBB Penetration"}
          </button>
        </form>

        {error && (
          <div className="flex items-start p-4 mt-6 bg-orange-100 dark:bg-orange-900/30 border border-orange-400 dark:border-orange-700 rounded-md">
            <XCircle className="h-5 w-5 text-orange-500 dark:text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-500 dark:text-orange-400">Error</h3>
              <p className="text-orange-700 dark:text-orange-300">{error}</p>
            </div>
          </div>
        )}
        
        {showResult && (
          <div className="p-4 mt-6 border border-gray-200 rounded-md bg-gray-50">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">Prediction Result:</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Predicted Class:</span>{" "}
                {prediction.predictedClass}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Probability:</span>{" "}
                {prediction.predictedProbability !== null
                  ? prediction.predictedProbability.toFixed(4)
                  : "N/A"}
              </p>
              <p className={`mt-2 p-2 ${prediction.predictedClass === 1 ? "bg-green-50 border-l-4 border-green-500" : "bg-red-50 border-l-4 border-red-500"} rounded`}>
                {prediction.predictedClass === 1
                  ? "This compound is likely to penetrate the Blood-Brain Barrier."
                  : "This compound is unlikely to penetrate the Blood-Brain Barrier."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BBBP;
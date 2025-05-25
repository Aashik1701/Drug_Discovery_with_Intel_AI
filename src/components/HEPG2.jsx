import React, { useState } from "react";
import { XCircle } from "lucide-react";
import { useDrugForge } from "../context/DrugForgeContext";

const HEPG2 = () => {
  const { isDarkMode } = useDrugForge();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ smiles: "" });
  const [prediction, setPrediction] = useState({
    predictedClass: null,
    predictedProbability: null,
  });
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePredictClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setShowResult(false);

    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction({
        predictedClass: data["Predicted Class"],
        predictedProbability: data["Predicted Probability for Class 1"],
      });
      setShowResult(true);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen p-5 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-blue-200 to-blue-500"
    }`}>
      <div className={`w-full max-w-md p-6 rounded-lg shadow-lg ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}>
        <h1 className={`mb-4 text-2xl font-bold text-center ${
          isDarkMode ? "text-blue-400" : "text-blue-500"
        }`}>HEPG2 Toxicity Prediction</h1>
        <h2 className={`mb-2 text-lg font-semibold text-center ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}>Human Hepatocellular Carcinoma</h2>
        
        <div className={`p-4 mb-6 border rounded-md ${
          isDarkMode 
            ? "border-gray-600 bg-gray-700" 
            : "border-blue-100 bg-blue-50"
        }`}>
          <p className={`mb-2 text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            HEPG2 cells are a human liver cancer cell line used to test compounds for hepatotoxicity (liver toxicity). This is a critical safety assessment in drug development.
          </p>
          <p className={`text-sm ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            This tool predicts whether a compound will exhibit toxicity to HEPG2 cells, helping to identify potential liver-toxic compounds early in drug discovery.
          </p>
        </div>
        
        <form onSubmit={handlePredictClick} className="flex flex-col gap-5">
          <div>
            <label className={`block mb-2 font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`} htmlFor="smiles">
              Enter SMILES String:
            </label>
            <input
              type="text"
              id="smiles"
              name="smiles"
              value={formData.smiles}
              onChange={handleChange}
              placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
              className={`w-full px-4 py-2 transition border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" 
                  : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
              }`}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 font-semibold rounded-md transition-colors ${
              isLoading 
                ? "bg-gray-400 cursor-not-allowed text-gray-200" 
                : isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Predicting..." : "Predict HEPG2 Toxicity"}
          </button>
        </form>

        {error && (
          <div className={`flex items-start p-4 mt-6 border rounded-md ${
            isDarkMode 
              ? "bg-red-900/50 border-red-700" 
              : "bg-orange-100 border-orange-400"
          }`}>
            <XCircle className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
              isDarkMode ? "text-red-400" : "text-orange-500"
            }`} />
            <div>
              <h3 className={`font-semibold ${
                isDarkMode ? "text-red-400" : "text-orange-500"
              }`}>Error</h3>
              <p className={isDarkMode ? "text-red-300" : "text-orange-700"}>{error}</p>
            </div>
          </div>
        )}
        
        {showResult && (
          <div className={`p-4 mt-6 border rounded-md ${
            isDarkMode 
              ? "border-gray-600 bg-gray-700" 
              : "border-gray-200 bg-gray-50"
          }`}>
            <h2 className={`mb-2 text-lg font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}>Prediction Result:</h2>
            <div className="space-y-2">
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                <span className="font-semibold">Predicted Class:</span>{" "}
                {prediction.predictedClass}
              </p>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                <span className="font-semibold">Probability:</span>{" "}
                {prediction.predictedProbability !== null
                  ? prediction.predictedProbability.toFixed(4)
                  : "N/A"}
              </p>
              <p className={`mt-2 p-2 rounded ${
                prediction.predictedClass === 1 
                  ? isDarkMode
                    ? "bg-red-900/50 border-l-4 border-red-500 text-red-300"
                    : "bg-red-50 border-l-4 border-red-500 text-red-800"
                  : isDarkMode
                    ? "bg-green-900/50 border-l-4 border-green-500 text-green-300"
                    : "bg-green-50 border-l-4 border-green-500 text-green-800"
              }`}>
                {prediction.predictedClass === 1
                  ? "This compound is predicted to be toxic to HEPG2 cells, suggesting potential liver toxicity concerns."
                  : "This compound is predicted to be non-toxic to HEPG2 cells, suggesting a favorable liver safety profile."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HEPG2;

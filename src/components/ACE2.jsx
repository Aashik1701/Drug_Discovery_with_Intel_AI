import React, { useState } from "react";
import { XCircle } from "lucide-react";
import { useDrugForge } from '../context/DrugForgeContext';

const ACE2 = () => {
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
      setError(" An error occurred while fetching the prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center p-5 transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-200 to-blue-500'
    }`}>
      <div className={`rounded-lg shadow-lg p-6 max-w-md w-full transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border border-gray-600' 
          : 'bg-white'
      }`}>
        <h1 className={`text-2xl font-bold mb-4 text-center transition-colors duration-200 ${
          isDarkMode ? 'text-blue-400' : 'text-blue-500'
        }`}>ACE2 Binding Prediction</h1>
        <h2 className={`text-lg font-semibold mb-2 text-center transition-colors duration-200 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>Angiotensin-Converting Enzyme 2 (ACE2)</h2>
        
        <p className={`mb-4 text-center transition-colors duration-200 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          ACE2 is a protein that plays a crucial role in the regulation of blood pressure and electrolyte balance. It is also the primary receptor for the SARS-CoV-2 virus, which causes COVID-19.
        </p>
        <p className={`mb-6 text-center transition-colors duration-200 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          The prediction model uses machine learning algorithms to predict the likelihood of a compound binding to ACE2, which is important for drug discovery related to COVID-19 treatments.
        </p>
        
        <form onSubmit={handlePredictClick} className="flex flex-col gap-5">
          <div>
            <label className={`block font-semibold mb-2 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
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
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-700'
              }`}
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
            {isLoading ? "Predicting..." : "Predict ACE2 Binding"}
          </button>
        </form>

        {error && (
          <div className={`mt-6 p-4 border rounded-md flex items-start transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-red-900/20 border-red-600' 
              : 'bg-orange-100 border-orange-400'
          }`}>
            <XCircle className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
              isDarkMode ? 'text-red-400' : 'text-orange-500'
            }`} />
            <div>
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-red-400' : 'text-orange-500'
              }`}>Error</h3>
              <p className={isDarkMode ? 'text-red-300' : 'text-orange-700'}>{error}</p>
            </div>
          </div>
        )}
        
        {showResult && (
          <div className={`mt-6 p-4 border rounded-md transition-colors duration-200 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <h2 className={`text-lg font-semibold mb-2 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>Prediction Result:</h2>
            <div className="space-y-2">
              <p className={`transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="font-semibold">Predicted Class:</span>{" "}
                {prediction.predictedClass}
              </p>
              <p className={`transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="font-semibold">Probability:</span>{" "}
                {prediction.predictedProbability !== null
                  ? prediction.predictedProbability.toFixed(4)
                  : "N/A"}
              </p>
              <p className={`mt-2 p-2 border-l-4 border-blue-500 rounded transition-colors duration-200 ${
                isDarkMode ? 'bg-blue-900/20 text-gray-300' : 'bg-blue-50 text-gray-700'
              }`}>
                {prediction.predictedClass === 1
                  ? "This compound is likely to bind to ACE2."
                  : "This compound is unlikely to bind to ACE2."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ACE2;
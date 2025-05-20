import React, { useState } from "react";
import { XCircle, AlertTriangle, Check, AlertCircle, Activity } from "lucide-react";

const Toxicity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ smiles: "" });
  const [prediction, setPrediction] = useState({
    toxicity: null,
    confidenceScore: null,
    toxicityEndpoints: null
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
      // In a real app, this would call your API
      const response = await fetch("http://localhost:5001/predict/toxicity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      // Mock response for demonstration
      // In a real app, you would use response.json()
      setTimeout(() => {
        const mockData = {
          toxicity: Math.random() > 0.5,
          confidenceScore: Math.random().toFixed(2),
          toxicityEndpoints: {
            hepatotoxicity: Math.random() > 0.6,
            cardiotoxicity: Math.random() > 0.7,
            nephrotoxicity: Math.random() > 0.8,
            neurotoxicity: Math.random() > 0.5
          }
        };
        
        setPrediction(mockData);
        setShowResult(true);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the prediction. Please try again.");
      setIsLoading(false);
    }
  };

  const renderToxicityEndpoint = (name, value) => {
    return (
      <div className={`flex items-center justify-between p-2 rounded-md ${
        value 
          ? "bg-red-50 dark:bg-red-900/20" 
          : "bg-green-50 dark:bg-green-900/20"
      }`}>
        <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{name}:</span>
        <div className="flex items-center">
          {value ? (
            <><AlertCircle className="w-4 h-4 mr-1 text-red-500 dark:text-red-400" /> <span className="text-red-600 dark:text-red-400">Potential risk</span></>
          ) : (
            <><Check className="w-4 h-4 mr-1 text-green-500 dark:text-green-400" /> <span className="text-green-600 dark:text-green-400">Low risk</span></>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-br from-blue-200 to-blue-500 dark:from-blue-900 dark:to-blue-950">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-500 dark:text-blue-400">Toxicity Prediction</h1>
        
        <div className="p-4 mb-6 border border-blue-100 dark:border-blue-900 rounded-md bg-blue-50 dark:bg-blue-900/30">
          <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
            Toxicity prediction is crucial in drug discovery to identify potentially harmful compounds early in the development process.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This tool evaluates a compound's potential toxicity across multiple endpoints, helping to prioritize safer drug candidates.
          </p>
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
            {isLoading ? "Predicting..." : "Predict Toxicity"}
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
          <div className="p-4 mt-6 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Toxicity Assessment:</h2>
              <div className={`px-3 py-1 rounded-full flex items-center ${
                prediction.toxicity 
                  ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400" 
                  : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              }`}>
                {prediction.toxicity ? (
                  <><AlertTriangle className="w-4 h-4 mr-1" /> Toxic</>
                ) : (
                  <><Check className="w-4 h-4 mr-1" /> Non-toxic</>
                )}
              </div>
            </div>
            
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Confidence Score:</span>{" "}
              {prediction.confidenceScore * 100}%
            </p>
            
            <div className="mt-4">
              <h3 className="flex items-center mb-2 font-semibold text-gray-800 dark:text-gray-200">
                <Activity className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" /> Toxicity Endpoints
              </h3>
              <div className="p-3 space-y-2 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700/50">
                {prediction.toxicityEndpoints && Object.entries(prediction.toxicityEndpoints).map(([key, value]) => (
                  renderToxicityEndpoint(key, value)
                ))}
              </div>
            </div>
            
            <div className="p-3 mt-4 text-sm text-gray-700 dark:text-gray-300 border border-yellow-100 dark:border-yellow-900/50 rounded-md bg-yellow-50 dark:bg-yellow-900/20">
              <p className="mb-1 font-semibold text-yellow-700 dark:text-yellow-500">Note:</p>
              <p>These predictions are based on computational models and should be validated with experimental testing. Always consult with toxicology experts for comprehensive safety assessments.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toxicity;

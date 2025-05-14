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
      <div className={`flex items-center justify-between p-2 rounded-md ${value ? "bg-red-50" : "bg-green-50"}`}>
        <span className="font-medium text-gray-700 capitalize">{name}:</span>
        <div className="flex items-center">
          {value ? (
            <><AlertCircle className="w-4 h-4 mr-1 text-red-500" /> <span className="text-red-600">Potential risk</span></>
          ) : (
            <><Check className="w-4 h-4 mr-1 text-green-500" /> <span className="text-green-600">Low risk</span></>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-br from-blue-200 to-blue-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-500">Toxicity Prediction</h1>
        
        <div className="p-4 mb-6 border border-blue-100 rounded-md bg-blue-50">
          <p className="mb-2 text-sm text-gray-700">
            Toxicity prediction is crucial in drug discovery to identify potentially harmful compounds early in the development process.
          </p>
          <p className="text-sm text-gray-700">
            This tool evaluates a compound's potential toxicity across multiple endpoints, helping to prioritize safer drug candidates.
          </p>
        </div>
        
        <form onSubmit={handlePredictClick} className="flex flex-col gap-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-800" htmlFor="smiles">
              Enter SMILES String:
            </label>
            <input
              type="text"
              id="smiles"
              name="smiles"
              value={formData.smiles}
              onChange={handleChange}
              placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
              className="w-full px-4 py-2 text-gray-700 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="flex items-start p-4 mt-6 bg-orange-100 border border-orange-400 rounded-md">
            <XCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-500">Error</h3>
              <p className="text-orange-700">{error}</p>
            </div>
          </div>
        )}
        
        {showResult && (
          <div className="p-4 mt-6 border border-gray-200 rounded-md bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Toxicity Assessment:</h2>
              <div className={`px-3 py-1 rounded-full flex items-center ${prediction.toxicity ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {prediction.toxicity ? (
                  <><AlertTriangle className="w-4 h-4 mr-1" /> Toxic</>
                ) : (
                  <><Check className="w-4 h-4 mr-1" /> Non-toxic</>
                )}
              </div>
            </div>
            
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Confidence Score:</span>{" "}
              {prediction.confidenceScore * 100}%
            </p>
            
            <div className="mt-4">
              <h3 className="flex items-center mb-2 font-semibold text-gray-800">
                <Activity className="w-4 h-4 mr-2 text-blue-500" /> Toxicity Endpoints
              </h3>
              <div className="p-3 space-y-2 border border-gray-200 rounded-md bg-gray-50">
                {prediction.toxicityEndpoints && Object.entries(prediction.toxicityEndpoints).map(([key, value]) => (
                  renderToxicityEndpoint(key, value)
                ))}
              </div>
            </div>
            
            <div className="p-3 mt-4 text-sm text-gray-700 border border-yellow-100 rounded-md bg-yellow-50">
              <p className="mb-1 font-semibold text-yellow-700">Note:</p>
              <p>These predictions are based on computational models and should be validated with experimental testing. Always consult with toxicology experts for comprehensive safety assessments.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toxicity;

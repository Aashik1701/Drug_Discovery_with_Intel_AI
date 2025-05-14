import React, { useState } from "react";
import { XCircle } from "lucide-react";

const HalfLife = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ smiles: "" });
  const [prediction, setPrediction] = useState({
    halfLife: null,
    confidence: null,
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
      const response = await fetch("http://localhost:5001/predict/half-life", {
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
        halfLife: data.halfLife,
        confidence: data.confidence,
      });
      setShowResult(true);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while fetching the prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to categorize half-life
  const categorizeHalfLife = (hours) => {
    if (hours < 1) return { category: "Very Short", color: "text-red-600" };
    if (hours < 4) return { category: "Short", color: "text-orange-500" };
    if (hours < 12) return { category: "Medium", color: "text-yellow-600" };
    if (hours < 24) return { category: "Long", color: "text-green-600" };
    return { category: "Very Long", color: "text-blue-600" };
  };

  const halfLifeCategory = prediction.halfLife ? categorizeHalfLife(prediction.halfLife) : null;

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-br from-blue-200 to-blue-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-500">Drug Half-Life Prediction</h1>
        
        <div className="p-4 mb-6 border border-blue-100 rounded-md bg-blue-50">
          <p className="mb-2 text-sm text-gray-700">
            Half-life is the time required for the concentration of a drug to reduce to half of its starting value in the body. It's a critical pharmacokinetic parameter in drug development.
          </p>
          <p className="text-sm text-gray-700">
            This tool predicts the half-life of a compound based on its molecular structure, helping researchers understand how long a drug might remain active in the body.
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
            {isLoading ? "Predicting..." : "Predict Half-Life"}
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
            <h2 className="mb-2 text-lg font-semibold text-gray-800">Prediction Result:</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Predicted Half-Life:</span>{" "}
                {prediction.halfLife !== null
                  ? `${prediction.halfLife.toFixed(2)} hours`
                  : "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Confidence:</span>{" "}
                {prediction.confidence !== null
                  ? `${(prediction.confidence * 100).toFixed(1)}%`
                  : "N/A"}
              </p>
              
              {halfLifeCategory && (
                <div className="p-3 mt-4 bg-gray-100 rounded-md">
                  <p className="font-medium">Half-life category: <span className={`${halfLifeCategory.color} font-bold`}>{halfLifeCategory.category}</span></p>
                  <div className="h-2 mt-2 overflow-hidden bg-gray-300 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
                      style={{ width: `${Math.min(100, (prediction.halfLife / 24) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs">
                    <span>0h</span>
                    <span>6h</span>
                    <span>12h</span>
                    <span>18h</span>
                    <span>24h+</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HalfLife;

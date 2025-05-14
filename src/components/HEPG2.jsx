import React, { useState } from "react";
import { XCircle } from "lucide-react";

const HEPG2 = () => {
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
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-br from-blue-200 to-blue-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-500">HEPG2 Toxicity Prediction</h1>
        <h2 className="mb-2 text-lg font-semibold text-center text-gray-800">Human Hepatocellular Carcinoma</h2>
        
        <div className="p-4 mb-6 border border-blue-100 rounded-md bg-blue-50">
          <p className="mb-2 text-sm text-gray-700">
            HEPG2 cells are a human liver cancer cell line used to test compounds for hepatotoxicity (liver toxicity). This is a critical safety assessment in drug development.
          </p>
          <p className="text-sm text-gray-700">
            This tool predicts whether a compound will exhibit toxicity to HEPG2 cells, helping to identify potential liver-toxic compounds early in drug discovery.
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
            {isLoading ? "Predicting..." : "Predict HEPG2 Toxicity"}
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
                <span className="font-semibold">Predicted Class:</span>{" "}
                {prediction.predictedClass}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Probability:</span>{" "}
                {prediction.predictedProbability !== null
                  ? prediction.predictedProbability.toFixed(4)
                  : "N/A"}
              </p>
              <p className={`mt-2 p-2 ${prediction.predictedClass === 1 ? "bg-red-50 border-l-4 border-red-500" : "bg-green-50 border-l-4 border-green-500"} rounded`}>
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

import React, { useState } from "react";

const SMILESPredictor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ smiles: "" });
  const [result, setResult] = useState("");
  const [showSpan, setShowSpan] = useState(false);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handlePredictClick = (e) => {
    e.preventDefault();
    if (!formData.smiles.trim()) {
      setError("Please enter a valid SMILES string");
      return;
    }
    setError("");
    setIsLoading(true);
    const url = "http://localhost:5000/predict";
    const jsonData = JSON.stringify(formData);

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: jsonData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Response from backend:", response);
        setResult(response.Prediction);
        setIsLoading(false);
        setShowSpan(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching the prediction.");
        setIsLoading(false);
        setShowSpan(true);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center p-5">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Solubility Prediction</h1>
        
        <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
          <p className="text-gray-700 text-sm">
            Predict the solubility of chemical compounds using SMILES notation.
            Enter a valid SMILES string below to get a prediction.
          </p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Enter SMILES String:
              <div className="relative inline-block ml-1">
                <span className="cursor-pointer text-blue-500 hover:text-blue-700" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  ℹ️
                </span>
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                    SMILES (Simplified Molecular Input Line Entry System) is a specification for describing the structure of chemical molecules using short ASCII strings.
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                )}
              </div>
            </label>
            <input
              type="text"
              id="smiles"
              name="smiles"
              value={formData.smiles}
              onChange={handleChange}
              placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex justify-center pt-2">
            <button
              disabled={isLoading}
              onClick={!isLoading ? handlePredictClick : null}
              className={`px-6 py-3 font-medium rounded-md transition-colors ${
                isLoading 
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? "Predicting..." : "Predict Solubility"}
            </button>
          </div>
        </form>
        
        {isLoading && (
          <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        <div className={`mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md transition-opacity duration-300 ${showSpan ? 'opacity-100' : 'opacity-0'}`}>
        {result ? (
          <>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Prediction Result:</h4>
            <p className="text-gray-700">The Predicted Solubility Value is <span className="font-bold text-blue-600">{result}</span></p>
          </>
        ) : (
          <p className="text-gray-600">Please enter a valid SMILES string and click "Predict Solubility"</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default SMILESPredictor;
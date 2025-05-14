import React, { useState, useCallback } from "react";
import { useApi, useMolecule } from "../hooks";
import { useDrugForge } from "../context/DrugForgeContext";
import ErrorBoundary from "./ErrorBoundary";
import { AlertCircle, CheckCircle, Loader2, Info } from "lucide-react";

const SolubilityChecker = () => {
  const { smiles, setSmiles, isValidSmiles } = useMolecule();
  const { post, loading } = useApi();
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [infoHovered, setInfoHovered] = useState(false);
  const [tooltipHovered, setTooltipHovered] = useState(false);
  
  const { addNotification } = useDrugForge();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!smiles.trim()) {
      setError("Please enter a valid SMILES string");
      return;
    }
    
    setError("");
    setResult(null);
    
    try {
      // Use the environment variable for the API URL
      const apiUrl = import.meta.env.VITE_FLASK_API_URL || "http://localhost:5000";
      const response = await post("/predict", { smiles }, {
        useGlobalLoading: false,
        showNotification: false
      });
      
      setResult(response);
      
      // Show notification for successful prediction
      if (response.prediction) {
        addNotification({
          type: 'success',
          title: 'Prediction Complete',
          message: `Solubility prediction completed successfully.`
        });
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setError(
        err.response?.data?.error || 
        "An error occurred during prediction. Please check your SMILES string and try again."
      );
    }
  }, [smiles, post, addNotification]);

  // Helper function to interpret the solubility result
  const getSolubilityInterpretation = (value) => {
    if (!value) return { text: "Unknown", color: "gray" };
    
    const solValue = parseFloat(value);
    
    if (solValue >= 0) {
      return { 
        text: "Highly Soluble", 
        color: "text-green-600",
        bgColor: "bg-green-50",
        border: "border-green-200" 
      };
    } else if (solValue > -2) {
      return { 
        text: "Moderately Soluble", 
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        border: "border-blue-200"
      };
    } else if (solValue > -4) {
      return { 
        text: "Slightly Soluble", 
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        border: "border-yellow-200"
      };
    } else {
      return { 
        text: "Poorly Soluble", 
        color: "text-red-600",
        bgColor: "bg-red-50",
        border: "border-red-200"
      };
    }
  };

  const interpretation = result?.prediction ? 
    getSolubilityInterpretation(result.prediction) : 
    { text: "", color: "", bgColor: "", border: "" };

  return (
    <ErrorBoundary>
      <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="w-full max-w-2xl p-8 bg-white border border-gray-100 shadow-lg rounded-xl">
          <h1 className="mb-4 text-3xl font-bold text-blue-600">
            Solubility Prediction Tool
          </h1>
          
          <div className="flex items-start mb-6">
            <div className="flex-1">
              <p className="mb-2 text-gray-600">
                Predict the solubility of compounds using SMILES notation. Solubility is a critical property for drug development that affects absorption and bioavailability.
              </p>
              <p className="text-sm text-gray-600">
                Results are displayed as LogS values, the logarithm of solubility in mol/L.
              </p>
            </div>
            
            <div className="relative ml-2" onMouseEnter={() => setInfoHovered(true)} onMouseLeave={() => setInfoHovered(false)}>
              <div className="p-1 bg-blue-100 rounded-full cursor-pointer">
                <Info className="w-5 h-5 text-blue-500" />
              </div>
              
              {infoHovered && (
                <div className="absolute right-0 z-10 w-64 p-3 text-sm bg-white border border-gray-200 rounded-md shadow-lg">
                  <p className="mb-1 font-medium text-gray-800">Solubility Scale (LogS):</p>
                  <ul className="space-y-1">
                    <li className="text-green-600">≥ 0: Highly soluble</li>
                    <li className="text-blue-600">0 to -2: Moderately soluble</li>
                    <li className="text-yellow-600">-2 to -4: Slightly soluble</li>
                    <li className="text-red-600">{"< -4"}: Poorly soluble</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <label htmlFor="smiles" className="block text-sm font-medium text-gray-700">
                  SMILES String
                </label>
                <div 
                  className="relative ml-2 text-gray-500 cursor-help"
                  onMouseEnter={() => setTooltipHovered(true)}
                  onMouseLeave={() => setTooltipHovered(false)}
                >
                  <Info size={16} />
                  {tooltipHovered && (
                    <div className="absolute z-10 w-64 p-2 mb-2 text-xs text-white transform -translate-x-1/2 bg-gray-800 rounded shadow-lg bottom-full left-1/2">
                      SMILES (Simplified Molecular Input Line Entry System) represents molecular structures as strings.
                      <div className="absolute w-2 h-2 transform rotate-45 -translate-x-1/2 bg-gray-800 left-1/2 top-full"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <input
                  id="smiles"
                  type="text"
                  value={smiles}
                  onChange={(e) => setSmiles(e.target.value)}
                  className={`w-full px-4 py-2 border ${
                    smiles && !isValidSmiles 
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2`}
                  placeholder="Enter SMILES notation (e.g., CC(=O)OC1=CC=CC=C1C(=O)O)"
                />
                {smiles && !isValidSmiles && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
              {smiles && !isValidSmiles && (
                <p className="mt-1 text-sm text-red-600">
                  Invalid SMILES string. Please check your input.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || (smiles && !isValidSmiles)}
              className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading || (smiles && !isValidSmiles)
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              } transition-colors`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Predicting...
                </>
              ) : (
                "Predict Solubility"
              )}
            </button>
          </form>

          {error && (
            <div className="flex p-4 mt-6 border border-red-200 rounded-md bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {result && result.prediction && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                <h2 className="text-lg font-semibold text-gray-800">Prediction Result</h2>
              </div>
              
              <div className={`p-4 border rounded-md ${interpretation.bgColor} ${interpretation.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium text-gray-700">LogS Value:</p>
                  <p className={`font-bold ${interpretation.color}`}>
                    {parseFloat(result.prediction).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-700">Interpretation:</p>
                  <p className={`font-semibold ${interpretation.color}`}>
                    {interpretation.text}
                  </p>
                </div>
              </div>
              
              <div className="p-4 text-sm border border-blue-100 rounded-md bg-blue-50">
                <p className="text-gray-700">
                  <span className="font-semibold">What this means: </span>
                  {parseFloat(result.prediction) >= -1 ? (
                    "This compound has good water solubility, which is favorable for oral bioavailability."
                  ) : parseFloat(result.prediction) >= -4 ? (
                    "This compound has moderate to low water solubility, which may require formulation strategies to improve dissolution."
                  ) : (
                    "This compound has very poor water solubility, which could significantly limit its bioavailability without specialized formulation techniques."
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SolubilityChecker;

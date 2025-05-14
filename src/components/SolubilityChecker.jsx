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
        color: "text-green-600" 
      };
    } else if (solValue > -2) {
      return { 
        text: "Moderately Soluble", 
        color: "text-blue-600" 
      };
    } else if (solValue > -4) {
      return { 
        text: "Slightly Soluble", 
        color: "text-yellow-600" 
      };
    } else {
      return { 
        text: "Poorly Soluble", 
        color: "text-red-600" 
      };
    }
  };

  const interpretation = result?.prediction ? 
    getSolubilityInterpretation(result.prediction) : 
    { text: "", color: "" };

  return (
    <ErrorBoundary>
      <div className="max-w-2xl mx-auto mt-20 mb-20 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Solubility Prediction Tool
        </h1>
        
        <div className="mb-6">
          <p className="text-gray-600">
            Predict the solubility of compounds using SMILES notation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <label htmlFor="smiles" className="block text-sm font-medium text-gray-700">
                SMILES String
              </label>
              <div 
                className="ml-2 text-gray-500 cursor-help relative"
                onMouseEnter={() => setInfoHovered(true)}
                onMouseLeave={() => setInfoHovered(false)}
              >
                <Info size={16} />
                {infoHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 w-64 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                    SMILES (Simplified Molecular Input Line Entry System) represents molecular structures as strings.
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-1 relative">
              <input
                id="smiles"
                type="text"
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Example: CC(=O)OC1=CC=CC=C1C(=O)O (Aspirin)"
              />
            </div>
            
            {error && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle size={16} className="mr-1" />
                <span>{error}</span>
              </div>
            )}
            
            {!isValidSmiles && smiles && !error && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertCircle size={16} className="mr-1" />
                <span>Invalid SMILES format</span>
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500">
              Enter the SMILES representation of the molecule you want to analyze
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || !isValidSmiles}
              className={`w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading || !isValidSmiles 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Predict Solubility</>
              )}
            </button>
          </div>
        </form>

        {/* Results Section */}
        {result && !error && (
          <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-start">
              <CheckCircle size={24} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Prediction Results</h3>
                
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="text-gray-500">Predicted LogS Value:</div>
                  <div className="font-medium text-gray-900">
                    {result.prediction ? result.prediction.toFixed(2) : "N/A"}
                  </div>
                  
                  <div className="text-gray-500">Solubility Category:</div>
                  <div className={`font-medium ${interpretation.color}`}>
                    {interpretation.text}
                  </div>
                  
                  <div className="text-gray-500">SMILES Input:</div>
                  <div className="font-mono text-xs bg-gray-100 p-1 rounded">
                    {result.smiles || smiles}
                  </div>
                  
                  {result.processing_time_ms && (
                    <>
                      <div className="text-gray-500">Processing Time:</div>
                      <div className="text-gray-900">
                        {(result.processing_time_ms / 1000).toFixed(2)}s
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Note: LogS values represent water solubility, with higher values indicating better solubility.
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Examples Section */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Example SMILES:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Aspirin", smiles: "CC(=O)OC1=CC=CC=C1C(=O)O" },
              { name: "Caffeine", smiles: "CN1C=NC2=C1C(=O)N(C)C(=O)N2C" },
              { name: "Paracetamol", smiles: "CC(=O)NC1=CC=C(O)C=C1" }
            ].map((example, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSmiles(example.smiles)}
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SolubilityChecker;
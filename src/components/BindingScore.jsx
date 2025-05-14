import React, { useState } from 'react';
import { AlertCircle } from "lucide-react";

const BindingScore = () => {
  const [drug, setDrug] = useState('');
  const [target, setTarget] = useState('');
  const [predictedScore, setPredictedScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5002/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drug, target }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPredictedScore(data.predicted_score);
      }
    } catch (error) {
      setError('Failed to connect to prediction service. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to interpret binding score
  const interpretScore = (score) => {
    if (score <= -10) return { text: "Very strong binding", color: "text-green-700", bg: "bg-green-100" };
    if (score <= -8) return { text: "Strong binding", color: "text-green-600", bg: "bg-green-50" };
    if (score <= -6.5) return { text: "Good binding", color: "text-blue-600", bg: "bg-blue-50" };
    if (score <= -4) return { text: "Moderate binding", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { text: "Weak binding", color: "text-red-600", bg: "bg-red-50" };
  };

  const scoreInterpretation = predictedScore !== null ? interpretScore(predictedScore) : null;

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gradient-to-br from-blue-200 to-blue-500">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-600">Drug-Target Binding Prediction</h1>
        
        <div className="p-4 mb-6 border border-blue-100 rounded-md bg-blue-50">
          <p className="mb-3 text-sm text-gray-700">
            The prediction of drug-target interactions is a crucial step in the drug discovery process. It helps to identify potential binding sites and predict the affinity of a drug to its target protein.
          </p>
          <p className="mb-3 text-sm text-gray-700">
            SMILES (Simplified Molecular Input Line Entry System) notation represents the structure of a molecule using a short string, widely used in cheminformatics and drug discovery.
          </p>
          <p className="text-sm text-gray-700">
            The target sequence refers to the amino acid sequence of the protein that the drug is intended to bind to. This sequence is used to predict the binding affinity.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-800" htmlFor="drug">
              Drug SMILES:
            </label>
            <input 
              id="drug"
              type="text" 
              value={drug} 
              onChange={(e) => setDrug(e.target.value)} 
              placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
              className="w-full px-4 py-2 text-gray-700 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Enter the SMILES string for your drug candidate</p>
          </div>
          
          <div>
            <label className="block mb-2 font-semibold text-gray-800" htmlFor="target">
              Target Protein Sequence:
            </label>
            <textarea 
              id="target"
              value={target} 
              onChange={(e) => setTarget(e.target.value)} 
              placeholder="Enter protein sequence (e.g., MTMDKSELVQKAKLAEQAERYDDMAAAMKAVTEQG...)"
              className="w-full h-32 px-4 py-2 text-gray-700 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Enter the amino acid sequence of your target protein</p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white font-semibold rounded-md transition-colors ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Predicting..." : "Predict Binding Score"}
          </button>
        </form>

        {error && (
          <div className="flex items-start p-4 mt-6 bg-red-100 border border-red-300 rounded-md">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-500">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {predictedScore !== null && (
          <div className="p-4 mt-6 border border-gray-200 rounded-md bg-gray-50">
            <h2 className="mb-3 text-lg font-semibold text-gray-800">Prediction Result:</h2>
            
            <div className="flex flex-col space-y-4">
              <div className={`p-3 rounded-md ${scoreInterpretation.bg}`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Binding Score (kcal/mol):</span>
                  <span className={`font-bold ${scoreInterpretation.color}`}>{predictedScore.toFixed(2)}</span>
                </div>
                <p className={`mt-2 ${scoreInterpretation.color}`}>Interpretation: {scoreInterpretation.text}</p>
              </div>
              
              <div className="p-4 rounded-md bg-blue-50">
                <h3 className="mb-2 font-semibold text-blue-800">Score Interpretation Guide:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><span className="font-medium text-green-700">Less than -10 kcal/mol:</span> Very strong binding</li>
                  <li><span className="font-medium text-green-600">-8 to -10 kcal/mol:</span> Strong binding</li>
                  <li><span className="font-medium text-blue-600">-6.5 to -8 kcal/mol:</span> Good binding</li>
                  <li><span className="font-medium text-yellow-600">-4 to -6.5 kcal/mol:</span> Moderate binding</li>
                  <li><span className="font-medium text-red-600">Greater than -4 kcal/mol:</span> Weak binding</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BindingScore;

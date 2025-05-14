import React, { useState } from 'react';
import './BindingScore.css';
function BindingScore() {
  const [drug, setDrug] = useState('');
  const [target, setTarget] = useState('');
  const [predictedScore, setPredictedScore] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:5002/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ drug, target }),
    });

    const data = await response.json();
    if (data.error) {
      alert(`Error: ${data.error}`);
    } else {
      setPredictedScore(data.predicted_score);
    }
  };

  return (
    <div className="App">
      <h1>Drug-Target Interaction Prediction</h1>
      <p>
        The prediction of drug-target interactions is a crucial step in the drug discovery process. It helps to identify potential binding sites and predict the affinity of a drug to its target protein.
      </p>
      <p>
        The SMILES (Simplified Molecular Input Line Entry System) notation is a way to represent the structure of a molecule using a short string. It is widely used in cheminformatics and drug discovery.
      </p>
      <p>
        The target sequence refers to the amino acid sequence of the protein that the drug is intended to bind to. This sequence is used to predict the binding affinity of the drug to the protein.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Drug SMILES:</label>
          <input 
            type="text" 
            value={drug} 
            onChange={(e) => setDrug(e.target.value)} 
            placeholder="Enter Drug SMILES (e.g., CC(=O)OC1=CC=CC=C1C(=O)O)"
            required
          />
        </div>
        <div>
          <label>Target Sequence:</label>
          <input 
            type="text" 
            value={target} 
            onChange={(e) => setTarget(e.target.value)} 
            placeholder="Enter Target Sequence (e.g., MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHYDDMPNALSALSDLHAHKLVDPVNFKLLSHSLLVTLAHLPAEFTPAVHASLDKFLASVSTVLTSKYR"
            required
            />
        </div>
        <button type="submit">Predict</button>
      </form>
      {predictedScore !== null && (
        <div>
          <h2>Predicted Score: {predictedScore}</h2>
          <p>
            The predicted score represents the binding affinity of the drug to the target protein. A higher score indicates a stronger binding affinity.
          </p>
        </div>
      )}
    </div>
  );
}

export default BindingScore;
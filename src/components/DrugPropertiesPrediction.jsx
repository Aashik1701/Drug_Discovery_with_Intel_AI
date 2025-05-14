import React, { useState } from 'react';

function DrugPropertiesPrediction() {
  const [compoundName, setCompoundName] = useState('');
  const [predictedProperties, setPredictedProperties] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate a prediction API call
    const properties = {
      bioavailability: Math.random() * 100,
      toxicity: Math.random() > 0.5 ? 'Low' : 'High',
      metabolism: 'Liver',
    };
    
    setPredictedProperties(properties);
  };

  return (
    <div>
      <h1>Drug Properties Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Compound Name:
          <input
            type="text"
            value={compoundName}
            onChange={(e) => setCompoundName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Predict Properties</button>
      </form>

      {predictedProperties && (
        <div>
          <h2>Predicted Properties for {compoundName}</h2>
          <p>Bioavailability: {predictedProperties.bioavailability.toFixed(2)}%</p>
          <p>Toxicity: {predictedProperties.toxicity}</p>
          <p>Metabolism: {predictedProperties.metabolism}</p>
        </div>
      )}
    </div>
  );
}

export default DrugPropertiesPrediction;
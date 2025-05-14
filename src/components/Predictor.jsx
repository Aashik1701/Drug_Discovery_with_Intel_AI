import React, { useState } from 'react';
import axios from 'axios';

const Predictor = () => {
    const [smiles, setSmiles] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                smiles: smiles
            });

            setPrediction(response.data.prediction);
        } catch (err) {
            if (err.response && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Error making prediction');
            }
        }
    };

    return (
        <div>
            <h1>SMILES Predictor</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={smiles}
                    onChange={(e) => setSmiles(e.target.value)}
                    placeholder="Enter SMILES string"
                />
                <button type="submit">Predict</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {prediction && <p>Prediction: {prediction}</p>}
        </div>
    );
};

export default Predictor;

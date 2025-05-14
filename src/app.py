import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from rdkit import Chem
from rdkit.Chem import AllChem
import logging
from pathlib import Path
import time

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Environment configuration
DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() in ['true', '1']
PORT = int(os.environ.get('FLASK_PORT', 5000))

# Path to models directory - use absolute path with proper error handling
try:
    # Use the absolute path or relative to the current script
    model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'solubility_model.pkl')
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    logging.info(f"Model loaded successfully from {model_path}")
except Exception as e:
    logging.error(f"Failed to load model: {str(e)}")
    model = None

# Function to featurize SMILES string with better error handling
def featurize_smiles(smiles, radius=2, length=1024):
    try:
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            logging.warning(f"Invalid SMILES string: {smiles}")
            return None
        fingerprint = AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits=length)
        return np.array(fingerprint).reshape(1, -1)
    except Exception as e:
        logging.error(f"Error processing SMILES: {str(e)}")
        return None

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Welcome to the Drug Discovery API!',
        'status': 'active',
        'version': '1.0.0',
        'endpoints': {
            'predict': '/predict (POST)',
            'health': '/health (GET)'
        }
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'uptime': time.time(),
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    start_time = time.time()
    
    # Check if model is loaded
    if model is None:
        return jsonify({'error': 'Model not loaded. Check server logs.'}), 500
        
    try:
        # Get data from request
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        smiles = data.get('smiles')
        if not smiles:
            return jsonify({'error': 'No SMILES string provided'}), 400

        # Featurize and predict
        features = featurize_smiles(smiles)
        if features is None:
            return jsonify({'error': 'Invalid or unsupported SMILES string'}), 400

        # Make prediction
        prediction = model.predict(features)
        
        # Log processing time
        process_time = time.time() - start_time
        logging.info(f"Prediction for SMILES completed in {process_time:.3f}s")
        
        return jsonify({
            'prediction': prediction.tolist(),
            'smiles': smiles,
            'processing_time_ms': int(process_time * 1000)
        })
        
    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': 'Internal server error during prediction'}), 500

if __name__ == '__main__':
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)

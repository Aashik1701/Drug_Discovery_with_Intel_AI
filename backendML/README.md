# Drug Discovery ML Backend

This directory contains the machine learning models and API endpoints for drug discovery predictions.

## Models Available

- **ADMET Properties**: Absorption, Distribution, Metabolism, Excretion, and Toxicity prediction models
- **Drug-Target Binding**: Binding affinity prediction models
- **Molecular Docking**: Protein-ligand docking simulations
- **Target Identification**: Protein target prediction models

## API Endpoints

### Prediction Endpoints
- `/predict/bbbp` - Blood-Brain Barrier Penetration
- `/predict/cyp3a4` - CYP3A4 Interaction
- `/predict/half-life` - Half-Life Prediction
- `/predict/cox2` - COX2 Inhibition
- `/predict/hepg2` - HEPG2 Toxicity
- `/predict/solubility` - Solubility Prediction
- `/predict/toxicity` - General Toxicity Prediction
- `/predict/ace2` - ACE2 Binding Prediction

### Molecular Docking
- `/docking/run` - Run molecular docking simulation
- `/docking/status/:jobId` - Check docking job status
- `/docking/results/:jobId` - Get docking results

### Target Identification
- `/target/identify` - Identify potential protein targets
- `/target/list` - List available targets
- `/target/:id` - Get target details

## Setup Instructions

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the Flask API server:
```bash
python app.py
```

3. The API will be available at `http://localhost:5001`

## Model Files

Place trained model files (.pkl, .h5, .joblib) in their respective directories:
- `ADMET Properties/models/`
- `Drug Target Binding Score/models/`
- `Molecular Docking/models/`
- `Target Identification/models/`

## Environment Variables

Create a `.env` file with:
```
FLASK_ENV=development
MODEL_PATH=/path/to/models
RDKIT_PATH=/path/to/rdkit
```

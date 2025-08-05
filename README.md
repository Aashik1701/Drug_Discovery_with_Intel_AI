# 🧬 DrugForge: AI-Powered Drug Discovery Platform

> **A comprehensive platform for drug discovery powered by machine learning and molecular modeling**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-Latest-green.svg)](https://flask.palletsprojects.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [💻 Development](#-development)
- [🧪 Testing](#-testing)
- [🐳 Docker Deployment](#-docker-deployment)
- [📚 API Documentation](#-api-documentation)
- [🔬 Prediction Tools](#-prediction-tools)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Overview

DrugForge is an advanced AI-driven platform designed to revolutionize drug discovery by leveraging machine learning models and computational simulations. The platform accelerates the identification of potential drug candidates, predicts key molecular properties, and ensures safety and efficacy through comprehensive analysis.

### What Makes DrugForge Special?

- **🎯 Real-time Predictions**: Instant molecular property predictions using state-of-the-art ML models
- **🧪 Comprehensive Analysis**: 8+ drug discovery tools covering ADMET, toxicity, and binding analysis
- **💡 User-Friendly Interface**: Modern React.js interface with dark/light theme support
- **🔬 Scientific Accuracy**: Built on validated datasets and peer-reviewed algorithms
- **🚀 Production Ready**: Docker containerization and comprehensive testing suite

## ✨ Features

### 🔬 Prediction Tools

| Tool | Description | Input | Output |
|------|-------------|-------|--------|
| **BBB Penetration** | Blood-Brain Barrier permeability prediction | SMILES | Binary classification + confidence |
| **CYP3A4 Interaction** | Cytochrome P450 enzyme interaction | SMILES | Inhibition probability |
| **Half-Life Prediction** | Drug half-life estimation | SMILES | Time in hours |
| **COX2 Selectivity** | COX-2 enzyme selectivity | SMILES | Selectivity score |
| **HEPG2 Cytotoxicity** | Liver cell toxicity assessment | SMILES | Toxicity classification |
| **ACE2 Binding** | ACE2 receptor binding affinity | SMILES | Binding prediction |
| **Solubility** | Aqueous solubility prediction | SMILES | LogS value |
| **General Toxicity** | Multi-endpoint toxicity assessment | SMILES | Safety profile |
| **Binding Score** | Protein-ligand binding affinity | SMILES | Binding score |

### 🎨 Platform Features

- **🎨 Modern Interface**: Responsive React.js application with Tailwind CSS
- **🌙 Theme Support**: Dark/light mode with consistent design system
- **⚡ Performance**: Lazy loading, code splitting, and optimized bundle size
- **🔒 Validation**: Real-time SMILES structure validation using RDKit
- **📱 Responsive**: Mobile-first design for all devices
- **🚨 Error Handling**: Comprehensive error handling and user feedback
- **📊 Rich Results**: Detailed prediction results with interpretations
- **🔍 Health Monitoring**: System status and API health checks

## 🏗️ Architecture

### 🖥️ Frontend Stack

```
React 18.3.1 Application
├── 🎨 Styling: Tailwind CSS + Custom Themes
├── 🧭 Routing: React Router v6 with lazy loading
├── 🔄 State: Custom hooks + Context API
├── 🧩 Components: Shared component library
├── 🛠️ Utils: Chemical validation & theme utilities
└── 📡 Services: Axios-based API client
```

### ⚙️ Backend Stack

```
Flask API Server
├── 🧠 ML Models: Scikit-learn, RDKit integration
├── 🔗 API: RESTful endpoints with CORS
├── 🛡️ Validation: Input sanitization & error handling
├── 📊 Health: Monitoring and status endpoints
└── 🐳 Container: Docker-ready deployment
```

### � Project Structure

```
Drug_Discovery_with_Intel_AI/
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/
│   │   ├── 📁 shared/               # Reusable UI components
│   │   │   ├── PredictionLayout.jsx # Consistent layout wrapper
│   │   │   ├── FormInput.jsx        # Validated input component
│   │   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   │   ├── ErrorDisplay.jsx     # Error messaging
│   │   │   └── ResultDisplay.jsx    # Result presentation
│   │   └── 📁 [tools]/              # Prediction tool components
│   ├── 📁 hooks/                    # Custom React hooks
│   ├── 📁 utils/                    # Helper utilities
│   ├── 📁 services/                 # API communication
│   └── 📁 context/                  # React context providers
├── 📁 backendML/                    # Backend API server
│   ├── app.py                       # Flask application
│   ├── requirements.txt             # Python dependencies
│   └── 📁 [models]/                 # ML model directories
├── 📁 public/                       # Static assets
├── 📁 build/                        # Production build
├── 🐳 Docker files                  # Container configuration
├── 🧪 test-system.sh               # Comprehensive testing
└── ⚙️ setup.sh                     # Automated setup
```

## � Quick Start

### 🎯 One-Command Setup (Recommended)

```bash
# Clone repository and auto-setup everything
git clone https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI.git
cd Drug_Discovery_with_Intel_AI
chmod +x setup.sh && ./setup.sh
```

The setup script will:
- ✅ Install frontend dependencies (Node.js)
- ✅ Setup Python virtual environment
- ✅ Install backend dependencies
- ✅ Start both frontend and backend servers
- ✅ Open application in browser
- ✅ Run system validation tests

### 🔧 Manual Setup

#### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.8+ and pip
- **Git** for version control

#### Step 1: Frontend Setup
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start
```

#### Step 2: Backend Setup
```bash
# Navigate to backend directory
cd backendML

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start API server (runs on http://localhost:5001)
python app.py
```

#### Step 3: Verify Installation
```bash
# Run comprehensive system tests
chmod +x test-system.sh && ./test-system.sh
```

### 🌐 Access Points

After setup, access the application at:

- **🖥️ Main Application**: [http://localhost:3000](http://localhost:3000)
- **🔧 API Server**: [http://localhost:5001](http://localhost:5001)
- **💚 Health Check**: [http://localhost:5001/health](http://localhost:5001/health)

## � Development

### 🧩 Component Development Pattern

All prediction components follow a consistent, maintainable pattern:

```jsx
import React from 'react';
import PredictionLayout from '../shared/PredictionLayout';
import FormInput from '../shared/FormInput';
import ErrorDisplay from '../shared/ErrorDisplay';
import ResultDisplay from '../shared/ResultDisplay';
import { usePrediction } from '../../hooks/usePrediction';

const YourPredictionTool = () => {
  const {
    smiles,
    setSmiles,
    result,
    isLoading,
    error,
    handleSubmit
  } = usePrediction('your-endpoint');

  return (
    <PredictionLayout
      title="Your Prediction Tool"
      description="Tool description and usage instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="SMILES Notation"
          value={smiles}
          onChange={setSmiles}
          placeholder="Enter SMILES notation (e.g., CCO)..."
          required
        />
        <ErrorDisplay error={error} />
        <ResultDisplay result={result} isLoading={isLoading} />
      </form>
    </PredictionLayout>
  );
};

export default YourPredictionTool;
```

### 🔄 Adding New Prediction Tools

1. **Create Component**: Follow the pattern above in `src/components/`
2. **Add API Endpoint**: Implement in `backendML/app.py`
3. **Update Service**: Add function in `src/services/api.js`
4. **Add Route**: Register in `src/App.jsx`
5. **Update Navigation**: Add to menu if needed

### 🎨 Shared Components

- **`PredictionLayout`**: Consistent page layout with title, description, and styling
- **`FormInput`**: Input component with built-in SMILES validation
- **`ErrorDisplay`**: Standardized error messaging with retry options
- **`ResultDisplay`**: Rich result presentation with loading states
- **`LoadingSpinner`**: Consistent loading indicators

### 🎯 Custom Hooks

- **`usePrediction`**: Handles API calls, state management, and error handling
- **Theme utilities**: Consistent styling functions across components

## 🧪 Testing

### 🔄 Automated Testing
```bash
# Run complete system test suite
./test-system.sh

# Frontend tests only
npm test

# Backend tests only
cd backendML && python -m pytest

# Coverage reports
npm run test:coverage
```

### 🔍 Manual Testing
```bash
# Test API health
curl http://localhost:5001/health

# Test prediction endpoint
curl -X POST http://localhost:5001/predict/bbbp \
  -H "Content-Type: application/json" \
  -d '{"smiles": "CCO"}'

# Test with sample molecules
curl -X POST http://localhost:5001/predict/cyp3a4 \
  -H "Content-Type: application/json" \
  -d '{"smiles": "CC(=O)OC1=CC=CC=C1C(=O)O"}'
```

### 🧪 Sample SMILES for Testing

- **Ethanol**: `CCO`
- **Caffeine**: `CN1C=NC2=C1C(=O)N(C(=O)N2C)C`
- **Ibuprofen**: `CC(C)CC1=CC=C(C=C1)C(C)C(=O)O`

## � Docker Deployment

### 🚀 Production Deployment

```bash
# Build production image
docker build -f Dockerfile.production -t drugforge:latest .

# Run production container
docker run -d -p 3000:3000 --name drugforge-prod drugforge:latest

# Check status
docker ps
docker logs drugforge-prod
```

### 🛠️ Development with Docker

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### 🌐 Environment Variables

Create `.env` file for configuration:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5001
FLASK_ENV=production
FLASK_DEBUG=False

# Optional: Database URLs, API keys, etc.
```

## 📚 API Documentation

### 🔗 Base URL
```
http://localhost:5001
```

### 🏥 Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00Z",
  "version": "1.0.0",
  "models_loaded": 9
}
```

### 🔮 Prediction Endpoints

All prediction endpoints follow the same pattern:

```http
POST /predict/{tool_name}
Content-Type: application/json

{
  "smiles": "CCO"
}
```

**Available endpoints:**
- `/predict/bbbp` - Blood-Brain Barrier Penetration
- `/predict/cyp3a4` - CYP3A4 Interaction
- `/predict/half-life` - Drug Half-Life
- `/predict/cox2` - COX2 Selectivity
- `/predict/hepg2` - HEPG2 Cytotoxicity
- `/predict/ace2` - ACE2 Binding
- `/predict/solubility` - Aqueous Solubility
- `/predict/toxicity` - General Toxicity
- `/predict/binding-score` - Binding Affinity

**Standard Response:**
```json
{
  "prediction": 0.85,
  "confidence": 0.92,
  "smiles": "CCO",
  "interpretation": "High probability of crossing BBB",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

**Error Response:**
```json
{
  "error": "Invalid SMILES string",
  "details": "Unable to parse molecular structure",
  "timestamp": "2025-01-01T00:00:00Z"
}
```

## 🔬 Prediction Tools

### 🧠 Blood-Brain Barrier Penetration (BBBP)
Predicts whether a compound can cross the blood-brain barrier, crucial for CNS drug development.

**Use Case**: Neurological drug discovery, CNS targeting  
**Model**: Random Forest classifier trained on experimental BBB data  
**Output**: Binary classification (penetrant/non-penetrant) + confidence score

### 🧬 CYP3A4 Interaction
Predicts interaction with cytochrome P450 3A4 enzyme, essential for drug metabolism studies.

**Use Case**: Drug-drug interaction prediction, metabolism assessment  
**Model**: Gradient boosting classifier  
**Output**: Interaction probability and metabolic liability assessment

### ⏱️ Half-Life Prediction
Estimates drug elimination half-life in biological systems.

**Use Case**: Dosing regimen design, pharmacokinetic optimization  
**Model**: Support Vector Regression  
**Output**: Half-life in hours with confidence intervals

### 🎯 COX2 Selectivity
Predicts selectivity for COX-2 enzyme over COX-1, important for anti-inflammatory drugs.

**Use Case**: NSAID development, side effect minimization  
**Model**: Deep neural network  
**Output**: Selectivity ratio and specificity score

### 🧪 HEPG2 Cytotoxicity
Assesses liver cell toxicity using HepG2 cell line data.

**Use Case**: Hepatotoxicity screening, safety assessment  
**Model**: Ensemble classifier  
**Output**: Toxicity classification and liver safety profile

### 🔗 ACE2 Binding
Predicts binding affinity to ACE2 receptor.

**Use Case**: Cardiovascular drug discovery, COVID-19 research  
**Model**: Molecular descriptor-based regression  
**Output**: Binding affinity and receptor interaction strength

### 💧 Solubility Prediction
Predicts aqueous solubility, critical for drug formulation.

**Use Case**: Formulation development, bioavailability optimization  
**Model**: XGBoost regressor  
**Output**: LogS value and solubility classification

### ⚠️ General Toxicity
Multi-endpoint toxicity prediction covering various safety parameters.

**Use Case**: Comprehensive safety screening, regulatory compliance  
**Model**: Multi-task neural network  
**Output**: Toxicity profile across multiple endpoints

## 🤝 Contributing

We welcome contributions from the drug discovery and AI communities!

### 🚀 How to Contribute

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **✍️ Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **📤 Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔄 Open** a Pull Request

### 🎯 Contribution Areas

- **🧠 ML Models**: Implement new prediction models
- **🎨 UI/UX**: Improve user interface and experience
- **📚 Documentation**: Enhance documentation and tutorials
- **🧪 Testing**: Add tests and improve coverage
- **🐛 Bug Fixes**: Fix issues and improve stability
- **⚡ Performance**: Optimize speed and efficiency

### 📝 Development Guidelines

- Follow the established component patterns
- Add comprehensive tests for new features
- Update documentation for API changes
- Ensure cross-browser compatibility
- Follow semantic versioning for releases

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- **RDKit** for chemical informatics capabilities
- **React** and **Flask** communities for excellent frameworks
- **Drug discovery** researchers for validation datasets
- **Open source** contributors and maintainers

---

<div align="center">

**🧬 Built with ❤️ for the drug discovery community**

[⭐ Star this project](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI) | [🐛 Report Bug](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/issues) | [💡 Request Feature](https://github.com/Aashik1701/Drug_Discovery_with_Intel_AI/issues)

</div>

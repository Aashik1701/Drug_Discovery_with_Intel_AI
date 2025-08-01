# DrugForge: AI-Driven Drug Discovery Platform

DrugForge is an advanced AI-powered platform designed to revolutionize drug discovery by leveraging machine learning models and computational simulations. The platform accelerates the identification of potential drug candidates, predicting key properties and ensuring safety, efficacy, and rapid development.

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18.3.1** with lazy loading
- **React Router v6** for navigation
- **Tailwind CSS** for styling
- **Shared Component Library** for consistency
- **Custom Hooks** for state management

### Backend Stack
- **Flask** API server
- **RDKit** for molecular processing
- **CORS** configuration
- **Comprehensive error handling**
- **9 ML prediction endpoints**

### Component Architecture
```
src/
├── components/
│   ├── shared/           # Reusable UI components
│   │   ├── PredictionLayout.jsx
│   │   ├── FormInput.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorDisplay.jsx
│   │   └── ResultDisplay.jsx
│   └── [prediction-tools]/  # Feature components
├── hooks/                # Custom React hooks
├── utils/               # Helper utilities
└── context/             # React context providers
```

### Development Infrastructure
- **Docker** containerization
- **Automated setup** scripts
- **Comprehensive testing** suite
- **Production-ready** builds
- **Health monitoring**

### ✅ Platform Features
- **Modern React.js Interface**: Responsive, dark/light theme support
- **Real-time Predictions**: Fast ML model inference via REST API
- **SMILES Validation**: Chemical structure validation and error handling
- **Interactive Results**: Detailed prediction results with interpretations
- **Optimized Performance**: Lazy loading, code splitting, and caching

## 🏗️ Architecture

### Frontend (React.js)
- **Shared Components**: Reusable UI components for consistency
- **Custom Hooks**: `usePrediction` hook for standardized API calls
- **Theme System**: Comprehensive dark/light mode with utility functions
- **Service Layer**: Centralized API communication

### Backend (Flask + ML)
- **RESTful API**: Clean endpoints for each prediction model
- **Model Management**: Automated model loading and caching
- **Error Handling**: Comprehensive validation and error responses
- **Health Monitoring**: System status and model availability checks

## 📊 Prediction Endpoints

| Tool | Endpoint | Input | Output |
|------|----------|-------|--------|
| BBB Penetration | `/predict/bbbp` | SMILES | Binary classification + probability |
| CYP3A4 | `/predict/cyp3a4` | SMILES | Interaction prediction |
| Half-Life | `/predict/half-life` | SMILES | Time in hours |
| COX2 | `/predict/cox2` | SMILES | Inhibition prediction |
| HEPG2 | `/predict/hepg2` | SMILES | Toxicity classification |
| ACE2 | `/predict/ace2` | SMILES | Binding prediction |
| Solubility | `/predict/solubility` | SMILES | LogS value |
| Toxicity | `/predict/toxicity` | SMILES | Safety assessment |

## 🛠️ Quick Start

### Automated Setup
```bash
# Clone and setup everything automatically
git clone https://github.com/your-username/DrugForge.git
cd Drug_Discovery_with_Intel_AI
./setup.sh
```

### Manual Setup

#### Prerequisites
- Node.js 16+
- Python 3.8+
- Git

#### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm start
```

#### 2. Backend Setup
```bash
# Navigate to backend
cd backendML

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start API server
python app.py
```

### 3. Verify Installation
```bash
# Run comprehensive system tests
./test-system.sh
```

### 4. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/health

## 💡 Usage

### Making Predictions
1. **Navigate** to any prediction tool (e.g., BBB Penetration)
2. **Enter** a valid SMILES string (e.g., `CC(=O)OC1=CC=CC=C1C(=O)O`)
3. **Click** Predict to get instant results
4. **View** detailed predictions with probabilities and interpretations

### Example SMILES Strings
- **Aspirin**: `CC(=O)OC1=CC=CC=C1C(=O)O`
- **Caffeine**: `CN1C=NC2=C1C(=O)N(C(=O)N2C)C`
- **Ibuprofen**: `CC(C)CC1=CC=C(C=C1)C(C)C(=O)O`

### API Usage
```javascript
// Direct API call
const response = await fetch('http://localhost:5001/predict/bbbp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O' })
});
const result = await response.json();
```

## 🧪 Development

### Recent Architecture Improvements ✨
- **Shared Component Library**: Consistent UI patterns with `PredictionLayout`, `FormInput`, `ErrorDisplay`, `ResultDisplay`, and `LoadingSpinner`
- **Enhanced Error Handling**: Comprehensive validation and user feedback system
- **SMILES Validation**: Real-time molecular structure validation using RDKit
- **Complete API Integration**: Flask backend with 9 prediction endpoints and health monitoring
- **Development Infrastructure**: Docker setup, automated testing, and deployment scripts
- **Code Cleanup**: Removed 150+ lines of dead code for better maintainability

### Component Development Pattern
All prediction components follow a consistent pattern using shared components:

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
      description="Tool description here"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="SMILES Notation"
          value={smiles}
          onChange={setSmiles}
          placeholder="Enter SMILES notation..."
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

### Code Quality Features
- **Shared Components**: Standardized UI components
- **Custom Hooks**: Reusable prediction logic
- **Theme Utilities**: Consistent styling functions
- **SMILES Validation**: Chemical structure validation
- **Error Handling**: Comprehensive error management

### Adding New Models
1. **Backend**: Add endpoint in `backendML/app.py`
2. **Service**: Add function in `src/services/api.js`
3. **Component**: Create using shared components
4. **Routing**: Add route in `src/App.jsx`

## 🚀 Deployment

### Docker Deployment (Recommended)

#### Development Environment
```bash
# Start with Docker Compose
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

#### Production Environment
```bash
# Build production image
docker build -f Dockerfile.production -t drugforge:latest .

# Run production container
docker run -d -p 3000:3000 --name drugforge-prod drugforge:latest
```

### Manual Deployment

#### Frontend (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy build folder
# Upload build/ directory to your hosting service
```

#### Backend (Heroku/DigitalOcean)
```bash
# Navigate to backend
cd backendML

# Create production requirements
pip freeze > requirements.txt

# Deploy with Gunicorn
gunicorn --bind 0.0.0.0:5001 app:app
```

### Environment Variables
Create a `.env` file with:
```env
REACT_APP_API_URL=http://localhost:5001
FLASK_ENV=production
FLASK_DEBUG=False
```

## 🧪 Testing

### Automated Testing
```bash
# Run all tests
./test-system.sh

# Frontend tests only
npm test

# Backend tests only
cd backendML && python -m pytest
```

### Manual Testing
```bash
# Test API health
curl http://localhost:5001/health

# Test prediction endpoint
curl -X POST http://localhost:5001/predict/bbbp \
  -H "Content-Type: application/json" \
  -d '{"smiles": "CCO"}'
```

## 🚀 Contributing

We welcome contributions! Please:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
- **Issues**: Report bugs or request features via GitHub Issues
- **API Docs**: Visit http://localhost:5001/health for endpoint status

---

**Built with ❤️ for the drug discovery community**

Open a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for more information.

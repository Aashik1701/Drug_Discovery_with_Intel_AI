# DrugForge AI - Complete Setup Guide

## Overview
DrugForge AI is a comprehensive drug discovery platform that combines machine learning models with an intuitive web interface for molecular property prediction, virtual screening, and drug design.

## Features Completed

### ✅ Frontend Application
- **React.js application** with modern UI/UX
- **Dark/Light theme support** with consistent theming
- **Lazy loading** for optimized performance
- **Responsive design** for all screen sizes
- **Prediction tools** for various drug properties:
  - Blood-Brain Barrier Penetration (BBBP)
  - CYP3A4 Interaction
  - Half-Life Prediction
  - COX2 Inhibition
  - HEPG2 Toxicity
  - ACE2 Binding
  - Solubility Prediction
  - General Toxicity

### ✅ Backend Architecture
- **Flask API server** for ML model serving
- **RESTful endpoints** for all predictions
- **CORS configuration** for frontend integration
- **Error handling and validation**
- **Health check endpoints**

### ✅ Shared Components Library
- **PredictionLayout**: Consistent layout for prediction pages
- **FormInput**: Standardized form inputs with validation
- **LoadingSpinner**: Reusable loading indicators
- **ErrorDisplay**: Consistent error messaging
- **ResultDisplay**: Formatted prediction results

### ✅ Utility Functions
- **Theme utilities**: Consistent styling functions
- **SMILES validation**: Chemical structure validation
- **API service**: Centralized API communication
- **Custom hooks**: Reusable prediction logic

### ✅ Code Quality Improvements
- **Removed dead code** from App.jsx
- **Eliminated duplicate CSS** classes
- **Standardized component patterns**
- **Implemented proper error handling**

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Python 3.8+
- Git

### 1. Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd Drug_Discovery_with_Intel_AI

# Install dependencies
npm install

# Start development server
npm start
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backendML

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start the API server
python app.py
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- API Health Check: http://localhost:5001/health

## Project Structure

```
Drug_Discovery_with_Intel_AI/
├── src/
│   ├── components/
│   │   ├── shared/           # Reusable components
│   │   ├── BBBP.jsx         # Blood-Brain Barrier prediction
│   │   ├── CYP3A4.jsx       # CYP3A4 interaction prediction
│   │   └── ...              # Other prediction components
│   ├── hooks/
│   │   └── usePrediction.js # Custom prediction hook
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── utils/
│   │   ├── themeUtils.js    # Theme utility functions
│   │   └── chemUtils.js     # Chemical utility functions
│   └── App.jsx              # Main application
├── backendML/
│   ├── app.py               # Flask API server
│   ├── requirements.txt     # Python dependencies
│   ├── ADMET Properties/    # ADMET prediction models
│   ├── Drug Target Binding Score/  # Binding models
│   ├── Molecular Docking/   # Docking simulations
│   └── Target Identification/      # Target prediction
└── package.json             # Node.js dependencies
```

## Available Endpoints

### Prediction APIs
| Endpoint | Method | Description |
|----------|---------|-------------|
| `/predict/bbbp` | POST | Blood-Brain Barrier Penetration |
| `/predict/cyp3a4` | POST | CYP3A4 Interaction |
| `/predict/half-life` | POST | Half-Life Prediction |
| `/predict/cox2` | POST | COX2 Inhibition |
| `/predict/hepg2` | POST | HEPG2 Toxicity |
| `/predict/ace2` | POST | ACE2 Binding |
| `/predict/solubility` | POST | Solubility Prediction |
| `/predict/toxicity` | POST | General Toxicity |
| `/predict/binding-score` | POST | Drug-Target Binding |

### System APIs
| Endpoint | Method | Description |
|----------|---------|-------------|
| `/health` | GET | API health status |
| `/status` | GET | System status |

## Usage Examples

### Making a Prediction
```javascript
// Using the prediction service
import { predictionService } from './services/api';

const predictBBBP = async (smiles) => {
  try {
    const result = await predictionService.predictBBBP(smiles);
    return result.data;
  } catch (error) {
    console.error('Prediction failed:', error);
  }
};
```

### Using Shared Components
```jsx
import PredictionLayout from './shared/PredictionLayout';
import FormInput from './shared/FormInput';
import usePrediction from '../hooks/usePrediction';

const MyPredictionComponent = () => {
  const { isLoading, result, error, predict } = usePrediction('/predict/endpoint');
  
  return (
    <PredictionLayout title="My Prediction" isDarkMode={isDarkMode}>
      <FormInput 
        label="SMILES"
        value={smiles}
        onChange={handleChange}
        isDarkMode={isDarkMode}
      />
      {/* More UI components */}
    </PredictionLayout>
  );
};
```

## Development Guidelines

### Adding New Prediction Models
1. Create the backend endpoint in `backendML/app.py`
2. Add the service function in `src/services/api.js`
3. Create a new prediction component using shared components
4. Add routing in `src/App.jsx`

### Code Style
- Use TypeScript-style JSDoc comments
- Follow React hooks patterns
- Use shared components for consistency
- Implement proper error handling
- Add loading states for all async operations

## Deployment

### Production Build
```bash
# Frontend
npm run build

# Backend
# Set environment variables
export FLASK_ENV=production
gunicorn -w 4 -b 0.0.0.0:5001 app:app
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Environment Variables
```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:5001

# Backend (.env)
FLASK_ENV=production
MODEL_PATH=/app/models
RDKIT_PATH=/usr/local/lib/python3.8/site-packages/rdkit
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding guidelines
4. Add tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed information

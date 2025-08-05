import React, { useState, useEffect, useCallback } from 'react';
import { 
  TrendingUp, Database, BarChart3, Target, Settings, 
  Download, Upload, Play, Pause, RefreshCw, AlertCircle,
  CheckCircle, Brain, Activity, Zap, FileText
} from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';
import { getTextClasses, getBackgroundClasses } from '../utils/themeUtils';

/**
 * Advanced QSAR (Quantitative Structure-Activity Relationship) Modeling Component
 * Provides comprehensive ML-based structure-activity relationship analysis
 */
const QSARModeling = () => {
  const { isDarkMode } = useDrugForge();
  
  const [modelState, setModelState] = useState({
    isTraining: false,
    trainingProgress: 0,
    currentModel: null,
    trainingData: null,
    validationResults: null
  });

  const [modelConfig, setModelConfig] = useState({
    algorithm: 'random_forest',
    crossValidation: 5,
    testSize: 0.2,
    features: ['morgan_fp', 'rdkit_descriptors'],
    targetProperty: 'activity',
    scalingMethod: 'standard'
  });

  const [predictionMode, setPredictionMode] = useState('batch');
  const [singleCompound, setSingleCompound] = useState('');
  const [batchFile, setBatchFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [modelPerformance, setModelPerformance] = useState(null);

  const algorithms = [
    { 
      value: 'random_forest', 
      name: 'Random Forest', 
      description: 'Ensemble method with good interpretability',
      pros: ['Feature importance', 'Handles non-linearity', 'Robust to outliers'],
      cons: ['Can overfit', 'Black box nature']
    },
    { 
      value: 'gradient_boosting', 
      name: 'Gradient Boosting', 
      description: 'Sequential ensemble for high accuracy',
      pros: ['High accuracy', 'Feature selection', 'Handles missing data'],
      cons: ['Prone to overfitting', 'Slower training']
    },
    { 
      value: 'svm', 
      name: 'Support Vector Machine', 
      description: 'Kernel-based classification',
      pros: ['Works with small datasets', 'Memory efficient', 'Versatile'],
      cons: ['Sensitive to scaling', 'No probability estimates']
    },
    { 
      value: 'neural_network', 
      name: 'Neural Network', 
      description: 'Deep learning approach',
      pros: ['Handles complex patterns', 'Automatic feature learning', 'Scalable'],
      cons: ['Requires large datasets', 'Black box', 'Computationally expensive']
    },
    { 
      value: 'xgboost', 
      name: 'XGBoost', 
      description: 'Optimized gradient boosting',
      pros: ['State-of-the-art performance', 'Built-in regularization', 'Feature importance'],
      cons: ['Many hyperparameters', 'Can overfit']
    }
  ];

  const featureTypes = [
    { 
      value: 'morgan_fp', 
      name: 'Morgan Fingerprints', 
      description: 'Circular fingerprints (ECFP)',
      size: 2048,
      recommended: true
    },
    { 
      value: 'rdkit_descriptors', 
      name: 'RDKit Descriptors', 
      description: '200+ molecular descriptors',
      size: 208,
      recommended: true
    },
    { 
      value: 'maccs_keys', 
      name: 'MACCS Keys', 
      description: '166 structural keys',
      size: 166,
      recommended: false
    },
    { 
      value: 'atom_pairs', 
      name: 'Atom Pairs', 
      description: 'Topological atom pairs',
      size: 2048,
      recommended: false
    },
    { 
      value: 'topological_torsions', 
      name: 'Topological Torsions', 
      description: '4-atom path fingerprints',
      size: 2048,
      recommended: false
    }
  ];

  const targetProperties = [
    { value: 'activity', name: 'Biological Activity', type: 'classification' },
    { value: 'ic50', name: 'IC50 Values', type: 'regression' },
    { value: 'binding_affinity', name: 'Binding Affinity', type: 'regression' },
    { value: 'permeability', name: 'Membrane Permeability', type: 'classification' },
    { value: 'toxicity', name: 'Toxicity', type: 'classification' },
    { value: 'solubility', name: 'Aqueous Solubility', type: 'regression' },
    { value: 'clearance', name: 'Hepatic Clearance', type: 'regression' }
  ];

  useEffect(() => {
    loadExampleData();
  }, []);

  const loadExampleData = async () => {
    // Mock loading example dataset
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const exampleData = {
      name: 'Example QSAR Dataset',
      size: 1247,
      features: 2256,
      target: 'activity',
      distribution: { active: 623, inactive: 624 },
      quality: 0.92
    };
    
    setModelState(prev => ({ ...prev, trainingData: exampleData }));
  };

  const trainModel = async () => {
    setModelState(prev => ({ ...prev, isTraining: true, trainingProgress: 0 }));
    
    try {
      // Simulate training progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setModelState(prev => ({ ...prev, trainingProgress: progress }));
      }

      // Mock trained model
      const trainedModel = {
        id: `qsar_${Date.now()}`,
        algorithm: modelConfig.algorithm,
        trainingTime: '2.3 minutes',
        parameters: {
          n_estimators: 100,
          max_depth: 10,
          min_samples_split: 2,
          random_state: 42
        },
        features: modelConfig.features,
        target: modelConfig.targetProperty,
        trainingSet: Math.floor(modelState.trainingData.size * (1 - modelConfig.testSize)),
        testSet: Math.floor(modelState.trainingData.size * modelConfig.testSize)
      };

      // Mock performance metrics
      const performance = {
        classification: {
          accuracy: 0.87,
          precision: 0.89,
          recall: 0.85,
          f1_score: 0.87,
          auc_roc: 0.93,
          confusion_matrix: [[234, 23], [34, 209]]
        },
        regression: {
          r2: 0.82,
          mae: 0.15,
          mse: 0.034,
          rmse: 0.184
        },
        cross_validation: {
          mean_cv_score: 0.84,
          std_cv_score: 0.03,
          scores: [0.87, 0.82, 0.85, 0.86, 0.81]
        },
        feature_importance: [
          { feature: 'Morgan_1024', importance: 0.23 },
          { feature: 'MolLogP', importance: 0.18 },
          { feature: 'TPSA', importance: 0.12 },
          { feature: 'NumHDonors', importance: 0.09 },
          { feature: 'NumHAcceptors', importance: 0.08 },
          { feature: 'Morgan_512', importance: 0.07 },
          { feature: 'MolWt', importance: 0.06 },
          { feature: 'NumRotatableBonds', importance: 0.05 },
          { feature: 'FractionCsp3', importance: 0.04 },
          { feature: 'NumAromaticRings', importance: 0.04 },
          { feature: 'Others', importance: 0.04 }
        ]
      };

      setModelState(prev => ({ 
        ...prev, 
        currentModel: trainedModel,
        isTraining: false,
        trainingProgress: 100
      }));
      
      setModelPerformance(performance);

    } catch (error) {
      console.error('Model training failed:', error);
      setModelState(prev => ({ ...prev, isTraining: false }));
    }
  };

  const makePredictions = async () => {
    if (!modelState.currentModel) {
      alert('Please train a model first');
      return;
    }

    try {
      let predictionsResult;

      if (predictionMode === 'single') {
        if (!singleCompound.trim()) {
          alert('Please enter a SMILES string');
          return;
        }

        predictionsResult = {
          mode: 'single',
          input: singleCompound,
          prediction: {
            value: 0.73,
            confidence: 0.89,
            class: 'Active',
            probability: { active: 0.73, inactive: 0.27 }
          },
          molecular_properties: {
            mw: 320.4,
            logp: 2.3,
            tpsa: 65.2,
            hbd: 2,
            hba: 4
          },
          feature_contributions: [
            { feature: 'Morgan fingerprint bit 1024', contribution: 0.15 },
            { feature: 'LogP', contribution: 0.12 },
            { feature: 'TPSA', contribution: -0.08 },
            { feature: 'Molecular Weight', contribution: 0.05 }
          ]
        };
      } else {
        // Batch predictions
        predictionsResult = {
          mode: 'batch',
          total: 156,
          processed: 156,
          results: [
            { smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O', prediction: 0.82, class: 'Active', confidence: 0.91 },
            { smiles: 'CC1=CC=C(C=C1)C(C)C(=O)O', prediction: 0.34, class: 'Inactive', confidence: 0.78 },
            { smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C', prediction: 0.67, class: 'Active', confidence: 0.85 },
            { smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O', prediction: 0.45, class: 'Inactive', confidence: 0.72 },
            { smiles: 'COC1=CC=C(C=C1)CC(C)NCC(O)C2=CC(O)=CC(O)=C2', prediction: 0.89, class: 'Active', confidence: 0.94 }
          ],
          summary: {
            active: 89,
            inactive: 67,
            high_confidence: 134,
            low_confidence: 22
          }
        };
      }

      setPredictions(predictionsResult);

    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  const exportModel = () => {
    if (!modelState.currentModel) {
      alert('No trained model to export');
      return;
    }

    const exportData = {
      model: modelState.currentModel,
      performance: modelPerformance,
      configuration: modelConfig,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `qsar_model_${modelState.currentModel.id}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const exportPredictions = () => {
    if (!predictions) {
      alert('No predictions to export');
      return;
    }

    let csvContent = 'SMILES,Prediction,Class,Confidence\n';
    
    if (predictions.mode === 'single') {
      csvContent += `${predictions.input},${predictions.prediction.value},${predictions.prediction.class},${predictions.prediction.confidence}\n`;
    } else {
      predictions.results.forEach(result => {
        csvContent += `${result.smiles},${result.prediction},${result.class},${result.confidence}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `qsar_predictions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className={`min-h-screen p-6 ${getBackgroundClasses(isDarkMode)}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 flex items-center ${getTextClasses(isDarkMode, 'primary')}`}>
            <TrendingUp className="h-8 w-8 mr-3 text-blue-500" />
            QSAR Modeling Suite
          </h1>
          <p className={`text-lg ${getTextClasses(isDarkMode, 'secondary')}`}>
            Build and deploy quantitative structure-activity relationship models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
                Model Configuration
              </h2>

              {/* Algorithm Selection */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Algorithm
                </label>
                <select
                  value={modelConfig.algorithm}
                  onChange={(e) => setModelConfig(prev => ({ ...prev, algorithm: e.target.value }))}
                  className={`w-full p-3 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {algorithms.map(algo => (
                    <option key={algo.value} value={algo.value}>
                      {algo.name}
                    </option>
                  ))}
                </select>
                
                {/* Algorithm Details */}
                {algorithms.find(a => a.value === modelConfig.algorithm) && (
                  <div className={`mt-2 p-3 rounded border ${
                    isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <p className={`text-sm mb-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                      {algorithms.find(a => a.value === modelConfig.algorithm).description}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <span className={`text-xs font-medium ${getTextClasses(isDarkMode, 'primary')}`}>Pros:</span>
                        <ul className={`text-xs ${getTextClasses(isDarkMode, 'secondary')}`}>
                          {algorithms.find(a => a.value === modelConfig.algorithm).pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className={`text-xs font-medium ${getTextClasses(isDarkMode, 'primary')}`}>Cons:</span>
                        <ul className={`text-xs ${getTextClasses(isDarkMode, 'secondary')}`}>
                          {algorithms.find(a => a.value === modelConfig.algorithm).cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Target Property */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Target Property
                </label>
                <select
                  value={modelConfig.targetProperty}
                  onChange={(e) => setModelConfig(prev => ({ ...prev, targetProperty: e.target.value }))}
                  className={`w-full p-3 border rounded-lg ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {targetProperties.map(prop => (
                    <option key={prop.value} value={prop.value}>
                      {prop.name} ({prop.type})
                    </option>
                  ))}
                </select>
              </div>

              {/* Feature Selection */}
              <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Features
                </label>
                <div className="space-y-2">
                  {featureTypes.map(feature => (
                    <label key={feature.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={modelConfig.features.includes(feature.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setModelConfig(prev => ({
                              ...prev,
                              features: [...prev.features, feature.value]
                            }));
                          } else {
                            setModelConfig(prev => ({
                              ...prev,
                              features: prev.features.filter(f => f !== feature.value)
                            }));
                          }
                        }}
                        className="mr-2"
                      />
                      <div>
                        <span className={`text-sm ${getTextClasses(isDarkMode, 'primary')}`}>
                          {feature.name}
                          {feature.recommended && (
                            <span className="ml-1 px-1 text-xs bg-green-100 text-green-800 rounded dark:bg-green-900/20 dark:text-green-400">
                              recommended
                            </span>
                          )}
                        </span>
                        <p className={`text-xs ${getTextClasses(isDarkMode, 'secondary')}`}>
                          {feature.description} (Size: {feature.size})
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Training Parameters */}
              <div className="space-y-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClasses(isDarkMode, 'primary')}`}>
                    Cross Validation Folds: {modelConfig.crossValidation}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={modelConfig.crossValidation}
                    onChange={(e) => setModelConfig(prev => ({ ...prev, crossValidation: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${getTextClasses(isDarkMode, 'primary')}`}>
                    Test Size: {(modelConfig.testSize * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.4"
                    step="0.05"
                    value={modelConfig.testSize}
                    onChange={(e) => setModelConfig(prev => ({ ...prev, testSize: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Training Button */}
              <button
                onClick={trainModel}
                disabled={modelState.isTraining || modelConfig.features.length === 0}
                className={`w-full mt-6 flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                  modelState.isTraining || modelConfig.features.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {modelState.isTraining ? (
                  <Activity className="h-4 w-4 mr-2 animate-pulse" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {modelState.isTraining ? 'Training...' : 'Train Model'}
              </button>

              {/* Training Progress */}
              {modelState.isTraining && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={getTextClasses(isDarkMode, 'secondary')}>Progress</span>
                    <span className={getTextClasses(isDarkMode, 'secondary')}>{modelState.trainingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${modelState.trainingProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Dataset Info */}
            {modelState.trainingData && (
              <div className={`mt-6 p-4 rounded-lg border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <h3 className={`font-semibold mb-2 flex items-center ${getTextClasses(isDarkMode, 'primary')}`}>
                  <Database className="h-4 w-4 mr-2" />
                  Training Dataset
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className={getTextClasses(isDarkMode, 'secondary')}>Compounds:</span>
                    <span className={getTextClasses(isDarkMode, 'primary')}>{modelState.trainingData.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={getTextClasses(isDarkMode, 'secondary')}>Features:</span>
                    <span className={getTextClasses(isDarkMode, 'primary')}>{modelState.trainingData.features}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={getTextClasses(isDarkMode, 'secondary')}>Active:</span>
                    <span className={getTextClasses(isDarkMode, 'primary')}>{modelState.trainingData.distribution.active}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={getTextClasses(isDarkMode, 'secondary')}>Inactive:</span>
                    <span className={getTextClasses(isDarkMode, 'primary')}>{modelState.trainingData.distribution.inactive}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {/* Model Performance */}
            {modelPerformance && (
              <div className={`mb-6 p-6 rounded-lg border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-xl font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
                    Model Performance
                  </h2>
                  <button
                    onClick={exportModel}
                    className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Model
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl font-bold text-blue-500">{(modelPerformance.classification.accuracy * 100).toFixed(1)}%</div>
                    <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Accuracy</div>
                  </div>
                  <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl font-bold text-green-500">{modelPerformance.classification.auc_roc.toFixed(2)}</div>
                    <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>AUC-ROC</div>
                  </div>
                  <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl font-bold text-purple-500">{modelPerformance.classification.f1_score.toFixed(2)}</div>
                    <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>F1-Score</div>
                  </div>
                  <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="text-2xl font-bold text-orange-500">{(modelPerformance.cross_validation.mean_cv_score * 100).toFixed(1)}%</div>
                    <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>CV Score</div>
                  </div>
                </div>

                {/* Feature Importance */}
                <div className={`p-4 rounded border ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <h3 className={`font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                    Feature Importance
                  </h3>
                  <div className="space-y-2">
                    {modelPerformance.feature_importance.slice(0, 8).map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-20 text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                          {feature.feature}
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${feature.importance * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                          {(feature.importance * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Prediction Interface */}
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
                Make Predictions
              </h2>

              {/* Prediction Mode */}
              <div className="mb-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPredictionMode('single')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      predictionMode === 'single'
                        ? 'bg-blue-500 text-white'
                        : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Single Compound
                  </button>
                  <button
                    onClick={() => setPredictionMode('batch')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      predictionMode === 'batch'
                        ? 'bg-blue-500 text-white'
                        : isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Batch Processing
                  </button>
                </div>
              </div>

              {/* Input Interface */}
              {predictionMode === 'single' ? (
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                    SMILES String
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={singleCompound}
                      onChange={(e) => setSingleCompound(e.target.value)}
                      placeholder="Enter SMILES string (e.g., CC(=O)OC1=CC=CC=C1C(=O)O)"
                      className={`flex-1 p-3 border rounded-lg ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                    <button
                      onClick={makePredictions}
                      disabled={!modelState.currentModel}
                      className={`px-6 py-3 rounded-lg transition-colors ${
                        !modelState.currentModel
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600'
                      } text-white`}
                    >
                      Predict
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                    Upload CSV File
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => setBatchFile(e.target.files[0])}
                      className={`flex-1 p-3 border rounded-lg ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                    <button
                      onClick={makePredictions}
                      disabled={!modelState.currentModel}
                      className={`px-6 py-3 rounded-lg transition-colors ${
                        !modelState.currentModel
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600'
                      } text-white`}
                    >
                      Process
                    </button>
                  </div>
                  <p className={`text-sm mt-1 ${getTextClasses(isDarkMode, 'secondary')}`}>
                    CSV should contain a 'smiles' column with SMILES strings
                  </p>
                </div>
              )}

              {/* Prediction Results */}
              {predictions && (
                <div className={`mt-6 p-4 rounded border ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
                      Prediction Results
                    </h3>
                    <button
                      onClick={exportPredictions}
                      className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </button>
                  </div>

                  {predictions.mode === 'single' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Prediction:</span>
                          <div className="text-2xl font-bold text-blue-500">{predictions.prediction.value.toFixed(3)}</div>
                        </div>
                        <div>
                          <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Class:</span>
                          <div className={`text-lg font-semibold ${
                            predictions.prediction.class === 'Active' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {predictions.prediction.class}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Confidence:</span>
                        <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${predictions.prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm ${getTextClasses(isDarkMode, 'primary')}`}>
                          {(predictions.prediction.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-500">{predictions.total}</div>
                          <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Total</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-500">{predictions.summary.active}</div>
                          <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-500">{predictions.summary.inactive}</div>
                          <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Inactive</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-500">{predictions.summary.high_confidence}</div>
                          <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>High Conf.</div>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className={isDarkMode ? 'border-gray-600' : 'border-gray-200'}>
                              <th className={`text-left py-2 ${getTextClasses(isDarkMode, 'primary')}`}>SMILES</th>
                              <th className={`text-left py-2 ${getTextClasses(isDarkMode, 'primary')}`}>Prediction</th>
                              <th className={`text-left py-2 ${getTextClasses(isDarkMode, 'primary')}`}>Class</th>
                              <th className={`text-left py-2 ${getTextClasses(isDarkMode, 'primary')}`}>Confidence</th>
                            </tr>
                          </thead>
                          <tbody>
                            {predictions.results.slice(0, 10).map((result, index) => (
                              <tr key={index} className={`border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                                <td className={`py-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                                  {result.smiles.length > 30 ? `${result.smiles.substring(0, 30)}...` : result.smiles}
                                </td>
                                <td className={`py-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                                  {result.prediction.toFixed(3)}
                                </td>
                                <td className={`py-2 ${result.class === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                  {result.class}
                                </td>
                                <td className={`py-2 ${getTextClasses(isDarkMode, 'primary')}`}>
                                  {(result.confidence * 100).toFixed(1)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {predictions.results.length > 10 && (
                          <p className={`text-sm text-center mt-2 ${getTextClasses(isDarkMode, 'secondary')}`}>
                            Showing first 10 results. Export for complete data.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!modelState.currentModel && (
                <div className={`p-4 rounded border ${isDarkMode ? 'border-yellow-600 bg-yellow-900/20' : 'border-yellow-300 bg-yellow-50'}`}>
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                    <p className="text-yellow-600 dark:text-yellow-400">
                      Please train a model first before making predictions
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QSARModeling;

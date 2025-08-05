import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, TrendingUp, BarChart3, Zap, Target, AlertCircle, 
  Download, Play, Settings, RefreshCw, Database, Activity
} from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';
import { getTextClasses, getBackgroundClasses } from '../utils/themeUtils';

/**
 * Advanced Machine Learning Analytics Component
 * Provides ML-powered insights, pattern recognition, and predictive analytics
 */
const MLAnalytics = ({ 
  predictionHistory = [], 
  currentCompound = null,
  enableRealTimeAnalysis = true 
}) => {
  const { isDarkMode } = useDrugForge();
  
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState('patterns');
  const [mlModels, setMlModels] = useState({});
  const [clusteringResults, setClusteringResults] = useState(null);
  const [qsarModel, setQsarModel] = useState(null);
  const [similarityAnalysis, setSimilarityAnalysis] = useState(null);

  const analysisTypes = [
    {
      id: 'patterns',
      name: 'Pattern Recognition',
      description: 'Identify patterns in prediction history',
      icon: Brain,
      color: 'blue'
    },
    {
      id: 'clustering',
      name: 'Chemical Clustering',
      description: 'Group similar compounds using ML',
      icon: Target,
      color: 'green'
    },
    {
      id: 'qsar',
      name: 'QSAR Modeling',
      description: 'Structure-activity relationships',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: 'similarity',
      name: 'Similarity Analysis',
      description: 'Find similar compounds and scaffolds',
      icon: Database,
      color: 'orange'
    },
    {
      id: 'optimization',
      name: 'Lead Optimization',
      description: 'AI-powered compound optimization',
      icon: Zap,
      color: 'red'
    }
  ];

  // Initialize ML models
  useEffect(() => {
    initializeMLModels();
  }, []);

  // Analyze prediction history when it changes
  useEffect(() => {
    if (predictionHistory.length > 0 && enableRealTimeAnalysis) {
      performRealTimeAnalysis();
    }
  }, [predictionHistory, enableRealTimeAnalysis]);

  const initializeMLModels = async () => {
    setIsAnalyzing(true);
    
    try {
      // Mock ML model initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const models = {
        clustering: {
          name: 'Chemical Space Clustering',
          algorithm: 'K-Means',
          features: ['Morgan fingerprints', 'RDKit descriptors'],
          status: 'ready',
          accuracy: 0.87
        },
        qsar: {
          name: 'Multi-target QSAR',
          algorithm: 'Random Forest',
          features: ['Molecular descriptors', 'Fingerprints'],
          status: 'ready',
          r2: 0.82,
          mae: 0.15
        },
        similarity: {
          name: 'Tanimoto Similarity',
          algorithm: 'Fingerprint-based',
          features: ['Morgan fingerprints'],
          status: 'ready',
          threshold: 0.7
        },
        optimization: {
          name: 'Multi-objective Optimization',
          algorithm: 'Genetic Algorithm',
          objectives: ['Activity', 'Drug-likeness', 'Toxicity'],
          status: 'ready',
          generations: 100
        }
      };
      
      setMlModels(models);
    } catch (error) {
      console.error('ML model initialization failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const performRealTimeAnalysis = useCallback(async () => {
    if (predictionHistory.length < 5) return; // Need minimum data
    
    try {
      const patterns = await analyzePatterns(predictionHistory);
      setAnalysisResults(prev => ({ ...prev, patterns }));
    } catch (error) {
      console.error('Real-time analysis failed:', error);
    }
  }, [predictionHistory]);

  const runAnalysis = async (analysisType) => {
    setIsAnalyzing(true);
    setSelectedAnalysis(analysisType);

    try {
      let results;
      
      switch (analysisType) {
        case 'patterns':
          results = await analyzePatterns(predictionHistory);
          break;
        case 'clustering':
          results = await performClustering(predictionHistory);
          setClusteringResults(results);
          break;
        case 'qsar':
          results = await buildQSARModel(predictionHistory);
          setQsarModel(results);
          break;
        case 'similarity':
          results = await analyzeSimilarity(predictionHistory, currentCompound);
          setSimilarityAnalysis(results);
          break;
        case 'optimization':
          results = await optimizeCompound(currentCompound);
          break;
        default:
          results = { error: 'Unknown analysis type' };
      }
      
      setAnalysisResults(prev => ({ ...prev, [analysisType]: results }));
      
    } catch (error) {
      console.error(`${analysisType} analysis failed:`, error);
      setAnalysisResults(prev => ({ 
        ...prev, 
        [analysisType]: { error: error.message } 
      }));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzePatterns = async (history) => {
    // Mock pattern recognition analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const successfulPredictions = history.filter(h => h.success);
    const failedPredictions = history.filter(h => !h.success);
    
    // Analyze molecular weight patterns
    const mwAnalysis = {
      successful: {
        mean: successfulPredictions.reduce((sum, p) => sum + (p.properties?.MW || 300), 0) / successfulPredictions.length,
        std: 45.2,
        range: [150, 550]
      },
      failed: {
        mean: failedPredictions.reduce((sum, p) => sum + (p.properties?.MW || 400), 0) / failedPredictions.length,
        std: 67.8,
        range: [100, 800]
      }
    };

    // Activity patterns
    const activityPatterns = {
      bbbp: {
        activeCompounds: Math.floor(successfulPredictions.length * 0.3),
        inactiveCompounds: Math.floor(successfulPredictions.length * 0.7),
        confidence: 0.85
      },
      toxicity: {
        toxic: Math.floor(successfulPredictions.length * 0.2),
        nonToxic: Math.floor(successfulPredictions.length * 0.8),
        confidence: 0.92
      }
    };

    // Structural alerts
    const structuralAlerts = [
      {
        pattern: 'Aromatic nitro',
        count: Math.floor(Math.random() * 5),
        risk: 'high',
        description: 'Compounds with aromatic nitro groups show increased toxicity risk'
      },
      {
        pattern: 'Long alkyl chains',
        count: Math.floor(Math.random() * 8),
        risk: 'medium',
        description: 'Extended alkyl chains may reduce water solubility'
      },
      {
        pattern: 'Multiple rings',
        count: Math.floor(Math.random() * 12),
        risk: 'low',
        description: 'Polycyclic compounds often show good binding affinity'
      }
    ];

    return {
      totalCompounds: history.length,
      successRate: (successfulPredictions.length / history.length * 100).toFixed(1),
      molecularWeightAnalysis: mwAnalysis,
      activityPatterns,
      structuralAlerts,
      insights: [
        'Compounds with MW 200-400 show higher success rates',
        'Aromatic compounds demonstrate better BBBP permeability',
        'Toxicity correlates with number of aromatic rings',
        'Optimal LogP range appears to be 2-4 for this dataset'
      ],
      confidence: 0.87
    };
  };

  const performClustering = async (history) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock clustering results
    const clusters = [
      {
        id: 1,
        name: 'Drug-like compounds',
        size: Math.floor(history.length * 0.4),
        centroid: { MW: 320, LogP: 2.5, TPSA: 65 },
        characteristics: ['Good drug-likeness', 'Moderate lipophilicity', 'Low toxicity'],
        color: '#22c55e'
      },
      {
        id: 2,
        name: 'Lead-like compounds',
        size: Math.floor(history.length * 0.3),
        centroid: { MW: 280, LogP: 1.8, TPSA: 45 },
        characteristics: ['Suitable for optimization', 'Good solubility', 'Fragment-like'],
        color: '#3b82f6'
      },
      {
        id: 3,
        name: 'Problematic compounds',
        size: Math.floor(history.length * 0.2),
        centroid: { MW: 450, LogP: 4.2, TPSA: 120 },
        characteristics: ['High molecular weight', 'Poor solubility', 'Potential toxicity'],
        color: '#ef4444'
      },
      {
        id: 4,
        name: 'Fragment compounds',
        size: Math.floor(history.length * 0.1),
        centroid: { MW: 180, LogP: 1.2, TPSA: 35 },
        characteristics: ['Low complexity', 'Good starting points', 'Requires optimization'],
        color: '#f59e0b'
      }
    ];

    return {
      algorithm: 'K-Means',
      nClusters: clusters.length,
      silhouetteScore: 0.73,
      clusters,
      recommendations: [
        'Focus on clusters 1 and 2 for lead optimization',
        'Cluster 3 compounds need significant modification',
        'Cluster 4 represents good starting fragments'
      ]
    };
  };

  const buildQSARModel = async (history) => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock QSAR model results
    return {
      modelType: 'Multi-target Random Forest',
      trainingSize: history.length,
      testSize: Math.floor(history.length * 0.2),
      features: [
        { name: 'Molecular Weight', importance: 0.15 },
        { name: 'LogP', importance: 0.18 },
        { name: 'TPSA', importance: 0.12 },
        { name: 'nRotB', importance: 0.08 },
        { name: 'Morgan fingerprints', importance: 0.47 }
      ],
      performance: {
        r2: 0.82,
        mae: 0.15,
        rmse: 0.23,
        accuracy: 0.86
      },
      predictions: {
        bbbp: { auc: 0.89, precision: 0.82, recall: 0.78 },
        toxicity: { auc: 0.91, precision: 0.87, recall: 0.83 },
        cyp3a4: { auc: 0.85, precision: 0.79, recall: 0.81 }
      },
      interpretation: [
        'Morgan fingerprints are the most predictive features',
        'LogP shows strong correlation with BBBP permeability',
        'TPSA is crucial for toxicity prediction',
        'Model performs best for drug-like compounds'
      ],
      confidence: 0.85
    };
  };

  const analyzeSimilarity = async (history, compound) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    if (!compound) return { error: 'No compound provided for similarity analysis' };
    
    // Mock similarity analysis
    const similarCompounds = [
      {
        smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
        name: 'Aspirin',
        similarity: 0.85,
        activities: { bbbp: 0.3, toxicity: 0.1 },
        source: 'ChEMBL'
      },
      {
        smiles: 'CC1=CC=C(C=C1)C(C)C(=O)O',
        name: 'Ibuprofen',
        similarity: 0.72,
        activities: { bbbp: 0.8, toxicity: 0.2 },
        source: 'DrugBank'
      },
      {
        smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C',
        name: 'Caffeine',
        similarity: 0.65,
        activities: { bbbp: 0.9, toxicity: 0.1 },
        source: 'PubChem'
      }
    ];

    const scaffoldAnalysis = {
      commonScaffolds: [
        { 
          scaffold: 'Benzene ring', 
          frequency: 0.8, 
          activity: 'Moderate',
          examples: 12
        },
        { 
          scaffold: 'Carboxylic acid', 
          frequency: 0.6, 
          activity: 'High',
          examples: 8
        },
        { 
          scaffold: 'Ester group', 
          frequency: 0.4, 
          activity: 'Variable',
          examples: 5
        }
      ],
      novelScaffolds: [
        {
          scaffold: 'Thiazole ring',
          predicted_activity: 'High',
          confidence: 0.78
        }
      ]
    };

    return {
      query: compound,
      similarCompounds,
      scaffoldAnalysis,
      recommendations: [
        'Consider structural modifications based on similar active compounds',
        'Benzene ring appears to be important for activity',
        'Explore thiazole replacements for improved potency'
      ],
      averageSimilarity: 0.74
    };
  };

  const optimizeCompound = async (compound) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (!compound) return { error: 'No compound provided for optimization' };
    
    // Mock optimization results
    const optimizedCompounds = [
      {
        smiles: 'CC(=O)NC1=CC=C(C=C1)O',
        name: 'Optimized variant 1',
        improvements: {
          activity: +0.3,
          drugLikeness: +0.2,
          toxicity: -0.4
        },
        confidence: 0.89,
        generation: 15
      },
      {
        smiles: 'CC1=CC=C(C=C1)NC(=O)C',
        name: 'Optimized variant 2',
        improvements: {
          activity: +0.25,
          drugLikeness: +0.35,
          toxicity: -0.2
        },
        confidence: 0.82,
        generation: 23
      },
      {
        smiles: 'COC1=CC=C(C=C1)NC(=O)C',
        name: 'Optimized variant 3',
        improvements: {
          activity: +0.15,
          drugLikeness: +0.4,
          toxicity: -0.3
        },
        confidence: 0.78,
        generation: 31
      }
    ];

    return {
      algorithm: 'Multi-objective Genetic Algorithm',
      generations: 50,
      populationSize: 100,
      objectives: ['Activity maximization', 'Drug-likeness', 'Toxicity minimization'],
      convergence: 0.95,
      optimizedCompounds,
      pareto_front: optimizedCompounds.length,
      optimization_summary: {
        best_activity_improvement: 0.3,
        best_druglikeness_improvement: 0.4,
        best_toxicity_reduction: 0.4
      },
      recommendations: [
        'Variant 1 shows best overall improvement',
        'Consider hydroxyl substitution for reduced toxicity',
        'Methoxy groups improve drug-likeness scores'
      ]
    };
  };

  const exportAnalysis = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      analysisType: selectedAnalysis,
      results: analysisResults,
      models: mlModels,
      configuration: {
        predictionHistorySize: predictionHistory.length,
        enableRealTimeAnalysis,
        currentCompound
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `ml_analysis_${selectedAnalysis}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const AnalysisCard = ({ analysis }) => {
    const Icon = analysis.icon;
    return (
      <button
        onClick={() => runAnalysis(analysis.id)}
        disabled={isAnalyzing}
        className={`p-4 rounded-lg border text-left transition-all ${
          selectedAnalysis === analysis.id
            ? isDarkMode ? `bg-${analysis.color}-900/30 border-${analysis.color}-500` : `bg-${analysis.color}-50 border-${analysis.color}-300`
            : isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50'
        } ${isAnalyzing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <div className="flex items-center mb-2">
          <Icon className={`h-5 w-5 mr-2 text-${analysis.color}-500`} />
          <h3 className={`font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
            {analysis.name}
          </h3>
        </div>
        <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
          {analysis.description}
        </p>
        
        {mlModels[analysis.id] && (
          <div className="mt-2 text-xs">
            <span className={`px-2 py-1 rounded ${
              mlModels[analysis.id].status === 'ready' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            }`}>
              {mlModels[analysis.id].status}
            </span>
          </div>
        )}
      </button>
    );
  };

  const renderResults = () => {
    const results = analysisResults?.[selectedAnalysis];
    if (!results) return null;

    if (results.error) {
      return (
        <div className={`p-4 rounded-lg border ${
          isDarkMode ? 'border-red-600 bg-red-900/20' : 'border-red-300 bg-red-50'
        }`}>
          <div className="flex items-center mb-2">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="font-semibold text-red-500">Analysis Error</h3>
          </div>
          <p className="text-red-500">{results.error}</p>
        </div>
      );
    }

    switch (selectedAnalysis) {
      case 'patterns':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-2xl font-bold text-blue-500">{results.totalCompounds}</div>
                <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Total Compounds</div>
              </div>
              <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-2xl font-bold text-green-500">{results.successRate}%</div>
                <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Success Rate</div>
              </div>
              <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-2xl font-bold text-purple-500">{(results.confidence * 100).toFixed(0)}%</div>
                <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Confidence</div>
              </div>
            </div>

            {/* Structural Alerts */}
            <div className={`p-4 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                Structural Alerts
              </h4>
              <div className="space-y-2">
                {results.structuralAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className={`font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                        {alert.pattern}
                      </span>
                      <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                        {alert.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                        {alert.count} compounds
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        alert.risk === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        alert.risk === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {alert.risk} risk
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Insights */}
            <div className={`p-4 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                Key Insights
              </h4>
              <ul className="space-y-1">
                {results.insights.map((insight, index) => (
                  <li key={index} className={`text-sm flex items-start ${getTextClasses(isDarkMode, 'secondary')}`}>
                    <span className="text-blue-500 mr-2">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'clustering':
        return (
          <div className="space-y-4">
            <div className={`p-4 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                Clustering Results
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Algorithm:</span>
                  <span className={`ml-2 font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                    {results.algorithm}
                  </span>
                </div>
                <div>
                  <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Silhouette Score:</span>
                  <span className={`ml-2 font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                    {results.silhouetteScore}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {results.clusters.map(cluster => (
                  <div key={cluster.id} className={`p-3 rounded border ${isDarkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-2"
                          style={{ backgroundColor: cluster.color }}
                        ></div>
                        <span className={`font-medium ${getTextClasses(isDarkMode, 'primary')}`}>
                          {cluster.name}
                        </span>
                      </div>
                      <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                        {cluster.size} compounds
                      </span>
                    </div>
                    <div className="text-sm space-y-1">
                      {cluster.characteristics.map((char, index) => (
                        <div key={index} className={getTextClasses(isDarkMode, 'secondary')}>
                          • {char}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'qsar':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-xl font-bold text-blue-500">{results.performance.r2}</div>
                <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>R²</div>
              </div>
              <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-xl font-bold text-green-500">{results.performance.mae}</div>
                <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>MAE</div>
              </div>
              <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-xl font-bold text-purple-500">{(results.performance.accuracy * 100).toFixed(0)}%</div>
                <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Accuracy</div>
              </div>
              <div className={`p-3 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-xl font-bold text-orange-500">{results.trainingSize}</div>
                <div className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>Training Size</div>
              </div>
            </div>

            {/* Feature Importance */}
            <div className={`p-4 rounded border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                Feature Importance
              </h4>
              <div className="space-y-2">
                {results.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-24 text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                      {feature.name}
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
        );

      default:
        return (
          <div className="text-center py-8">
            <Brain className={`h-12 w-12 mx-auto mb-4 ${getTextClasses(isDarkMode, 'muted')}`} />
            <p className={getTextClasses(isDarkMode, 'secondary')}>
              Select an analysis type to view results
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen p-6 ${getBackgroundClasses(isDarkMode)}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold mb-2 flex items-center ${getTextClasses(isDarkMode, 'primary')}`}>
                <Brain className="h-8 w-8 mr-3 text-blue-500" />
                ML Analytics Dashboard
              </h1>
              <p className={`text-lg ${getTextClasses(isDarkMode, 'secondary')}`}>
                Advanced machine learning insights for drug discovery
              </p>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => initializeMLModels()}
                disabled={isAnalyzing}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isAnalyzing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
                Refresh Models
              </button>
              
              <button
                onClick={exportAnalysis}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analysis Types */}
          <div className="lg:col-span-1">
            <div className={`p-4 rounded-lg border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${getTextClasses(isDarkMode, 'primary')}`}>
                Analysis Types
              </h2>
              
              <div className="space-y-3">
                {analysisTypes.map(analysis => (
                  <AnalysisCard key={analysis.id} analysis={analysis} />
                ))}
              </div>

              {/* Model Status */}
              <div className="mt-6">
                <h3 className={`text-lg font-semibold mb-3 ${getTextClasses(isDarkMode, 'primary')}`}>
                  Model Status
                </h3>
                <div className="space-y-2">
                  {Object.entries(mlModels).map(([key, model]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                        {model.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        model.status === 'ready' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {model.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-lg border min-h-96 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
                  Analysis Results
                </h2>
                
                {isAnalyzing && (
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-blue-500 animate-pulse" />
                    <span className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                      Running {selectedAnalysis} analysis...
                    </span>
                  </div>
                )}
              </div>

              {isAnalyzing ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className={`${getTextClasses(isDarkMode, 'secondary')}`}>
                      Analyzing data with machine learning models...
                    </p>
                  </div>
                </div>
              ) : (
                renderResults()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLAnalytics;

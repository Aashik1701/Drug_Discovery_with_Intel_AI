import React from 'react';
import { CheckCircle, XCircle, Info, TrendingUp, TrendingDown, Activity, Download, Copy } from 'lucide-react';
import { getTextClasses } from '../../utils/themeUtils';

/**
 * Enhanced reusable result display component for predictions
 * @param {Object} props - Component props
 * @param {Object} props.result - Prediction result object
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.formatResult - Custom result formatter function
 * @param {boolean} props.showAnalytics - Show analytics visualization
 * @param {Function} props.onExport - Export callback function
 * @returns {JSX.Element} Enhanced result display component
 */
const EnhancedResultDisplay = ({ 
  result, 
  isDarkMode, 
  className = "",
  formatResult,
  showAnalytics = true,
  onExport
}) => {
  if (!result) return null;

  const {
    predictedClass,
    predictedProbability,
    confidence,
    interpretation,
    additionalInfo,
    bindingScore,
    halfLife,
    toxicityScore,
    affinity
  } = result;

  // Enhanced result formatter with visual indicators
  const defaultFormatter = (result) => {
    const items = [];
    
    if (result.predictedClass !== undefined && result.predictedClass !== null) {
      items.push({
        label: 'Predicted Class',
        value: result.predictedClass,
        type: 'class',
        icon: result.predictedClass === 1 || result.predictedClass === 'Active' ? TrendingUp : TrendingDown
      });
    }
    
    if (result.predictedProbability !== undefined && result.predictedProbability !== null) {
      const prob = typeof result.predictedProbability === 'number' 
        ? result.predictedProbability 
        : parseFloat(result.predictedProbability);
      items.push({
        label: 'Probability',
        value: prob.toFixed(4),
        type: 'probability',
        icon: Activity,
        progress: prob * 100
      });
    }
    
    if (result.confidence !== undefined && result.confidence !== null) {
      const conf = typeof result.confidence === 'number' 
        ? result.confidence 
        : parseFloat(result.confidence);
      items.push({
        label: 'Confidence',
        value: `${(conf * 100).toFixed(1)}%`,
        type: 'confidence',
        icon: Activity,
        progress: conf * 100
      });
    }

    // Handle binding score
    if (result.bindingScore !== undefined && result.bindingScore !== null) {
      const score = typeof result.bindingScore === 'number' 
        ? result.bindingScore 
        : parseFloat(result.bindingScore);
      items.push({
        label: 'Binding Score',
        value: score.toFixed(2),
        type: 'binding',
        icon: Activity,
        progress: Math.min(score * 10, 100) // Scale to 0-100 for visualization
      });
    }

    // Handle half life
    if (result.halfLife !== undefined && result.halfLife !== null) {
      items.push({
        label: 'Half Life',
        value: `${result.halfLife} hours`,
        type: 'halflife',
        icon: Activity
      });
    }

    // Handle toxicity score
    if (result.toxicityScore !== undefined && result.toxicityScore !== null) {
      const score = typeof result.toxicityScore === 'number' 
        ? result.toxicityScore 
        : parseFloat(result.toxicityScore);
      items.push({
        label: 'Toxicity Score',
        value: score.toFixed(3),
        type: 'toxicity',
        icon: score > 0.5 ? TrendingUp : TrendingDown,
        progress: score * 100
      });
    }
    
    return items;
  };

  const formatter = formatResult || defaultFormatter;
  const formattedItems = formatter(result);

  const getResultIcon = (predicted) => {
    if (predicted === 1 || predicted === true || predicted === 'Active' || predicted === 'Positive') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (predicted === 0 || predicted === false || predicted === 'Inactive' || predicted === 'Negative') {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
    return <Info className="h-5 w-5 text-blue-500" />;
  };

  const getResultColor = (predicted) => {
    if (predicted === 1 || predicted === true || predicted === 'Active' || predicted === 'Positive') {
      return isDarkMode ? 'bg-green-900/20 border-green-600' : 'bg-green-50 border-green-200';
    } else if (predicted === 0 || predicted === false || predicted === 'Inactive' || predicted === 'Negative') {
      return isDarkMode ? 'bg-red-900/20 border-red-600' : 'bg-red-50 border-red-200';
    }
    return isDarkMode ? 'bg-blue-900/20 border-blue-600' : 'bg-blue-50 border-blue-200';
  };

  const getProgressColor = (type, value) => {
    switch (type) {
      case 'probability':
      case 'confidence':
        return value > 80 ? 'bg-green-500' : value > 60 ? 'bg-yellow-500' : 'bg-red-500';
      case 'binding':
        return value > 70 ? 'bg-green-500' : value > 50 ? 'bg-yellow-500' : 'bg-red-500';
      case 'toxicity':
        return value > 50 ? 'bg-red-500' : value > 30 ? 'bg-yellow-500' : 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const handleCopyResult = () => {
    const resultText = formattedItems.map(item => `${item.label}: ${item.value}`).join('\n');
    navigator.clipboard.writeText(resultText);
  };

  const handleExport = () => {
    if (onExport) {
      onExport(result);
    } else {
      // Default CSV export
      const csv = formattedItems.map(item => `${item.label},${item.value}`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'prediction_result.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={`p-4 border rounded-md transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600' 
        : 'bg-gray-50 border-gray-200'
    } ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {getResultIcon(predictedClass)}
          <h2 className={`ml-2 text-lg font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
            Prediction Result
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCopyResult}
            className={`p-1 rounded transition-colors ${
              isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
            }`}
            title="Copy results"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={handleExport}
            className={`p-1 rounded transition-colors ${
              isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
            }`}
            title="Export results"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {formattedItems.map((item, index) => {
          const Icon = item.icon || Info;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Icon className="h-4 w-4 mr-2 text-blue-500" />
                  <span className={`font-medium ${getTextClasses(isDarkMode, 'secondary')}`}>
                    {item.label}:
                  </span>
                </div>
                <span className={`font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
                  {item.value}
                </span>
              </div>
              
              {showAnalytics && item.progress !== undefined && (
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(item.type, item.progress)}`}
                    style={{ width: `${Math.min(Math.max(item.progress, 0), 100)}%` }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
        
        {interpretation && (
          <div className={`mt-4 p-3 border rounded-md ${getResultColor(predictedClass)}`}>
            <div className="flex items-start">
              <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                {interpretation}
              </p>
            </div>
          </div>
        )}
        
        {additionalInfo && (
          <div className={`mt-3 p-3 border rounded-md ${
            isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
          }`}>
            <p className={`text-xs ${getTextClasses(isDarkMode, 'muted')}`}>
              {additionalInfo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedResultDisplay;

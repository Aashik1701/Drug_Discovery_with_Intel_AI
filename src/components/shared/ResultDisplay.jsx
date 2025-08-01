import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { getTextClasses } from '../../utils/themeUtils';

/**
 * Reusable result display component for predictions
 * @param {Object} props - Component props
 * @param {Object} props.result - Prediction result object
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.formatResult - Custom result formatter function
 * @returns {JSX.Element} Result display component
 */
const ResultDisplay = ({ 
  result, 
  isDarkMode, 
  className = "",
  formatResult
}) => {
  if (!result) return null;

  const {
    predictedClass,
    predictedProbability,
    confidence,
    interpretation,
    additionalInfo
  } = result;

  // Default result formatter
  const defaultFormatter = (result) => {
    const items = [];
    
    if (result.predictedClass !== undefined && result.predictedClass !== null) {
      items.push({
        label: 'Predicted Class',
        value: result.predictedClass,
        type: 'class'
      });
    }
    
    if (result.predictedProbability !== undefined && result.predictedProbability !== null) {
      items.push({
        label: 'Probability',
        value: typeof result.predictedProbability === 'number' 
          ? result.predictedProbability.toFixed(4) 
          : result.predictedProbability,
        type: 'probability'
      });
    }
    
    if (result.confidence !== undefined && result.confidence !== null) {
      items.push({
        label: 'Confidence',
        value: typeof result.confidence === 'number' 
          ? `${(result.confidence * 100).toFixed(1)}%` 
          : result.confidence,
        type: 'confidence'
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

  return (
    <div className={`p-4 border rounded-md transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-700 border-gray-600' 
        : 'bg-gray-50 border-gray-200'
    } ${className}`}>
      <div className="flex items-center mb-3">
        {getResultIcon(predictedClass)}
        <h2 className={`ml-2 text-lg font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
          Prediction Result
        </h2>
      </div>
      
      <div className="space-y-3">
        {formattedItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className={`font-medium ${getTextClasses(isDarkMode, 'secondary')}`}>
              {item.label}:
            </span>
            <span className={`font-semibold ${getTextClasses(isDarkMode, 'primary')}`}>
              {item.value}
            </span>
          </div>
        ))}
        
        {interpretation && (
          <div className={`mt-4 p-3 border rounded-md ${getResultColor(predictedClass)}`}>
            <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
              {interpretation}
            </p>
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

export default ResultDisplay;

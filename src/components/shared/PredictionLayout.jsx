import React from 'react';
import { getCardClasses, getTextClasses, getBackgroundClasses } from '../../utils/themeUtils';

/**
 * Reusable layout component for prediction pages
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {React.ReactNode} props.children - Child components
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Prediction layout component
 */
const PredictionLayout = ({ 
  title, 
  description,
  children, 
  isDarkMode,
  className = "" 
}) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${getBackgroundClasses(isDarkMode, 'secondary')} ${className}`}>
      <div className="flex items-center justify-center p-4">
        <div className={`w-full max-w-2xl ${getCardClasses(isDarkMode)}`}>
          {/* Header Section */}
          <div className="mb-6">
            <h1 className={`text-2xl font-bold text-center mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {title}
            </h1>
            
            {description && (
              <div className={`p-4 border rounded-md transition-colors duration-200 ${
                isDarkMode 
                  ? 'bg-blue-900/20 border-blue-700' 
                  : 'bg-blue-50 border-blue-100'
              }`}>
                <p className={`text-sm ${getTextClasses(isDarkMode, 'secondary')}`}>
                  {description}
                </p>
              </div>
            )}
          </div>
          
          {/* Content Section */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionLayout;

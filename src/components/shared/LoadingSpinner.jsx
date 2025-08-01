import React from 'react';

/**
 * Reusable loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.size - Spinner size ('sm', 'md', 'lg', 'xl')
 * @param {string} props.message - Loading message to display
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ 
  size = "md", 
  message = "Loading...", 
  isDarkMode = false,
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const spinnerColor = isDarkMode ? "border-blue-400" : "border-blue-500";
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div 
        className={`animate-spin rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-4 ${spinnerColor} ${sizeClasses[size]}`}
      ></div>
      {message && (
        <p className={`mt-3 text-sm font-medium ${textColor}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

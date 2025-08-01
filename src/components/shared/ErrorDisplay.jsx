import React from 'react';
import { XCircle, AlertTriangle } from 'lucide-react';
import { getErrorClasses, getTextClasses } from '../../utils/themeUtils';

/**
 * Reusable error display component with consistent theming
 * @param {Object} props - Component props
 * @param {string} props.error - Error message to display
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Error variant ('error' or 'warning')
 * @returns {JSX.Element} Error display component
 */
const ErrorDisplay = ({ 
  error, 
  isDarkMode, 
  className = "", 
  variant = "error" 
}) => {
  if (!error) return null;

  const Icon = variant === 'warning' ? AlertTriangle : XCircle;
  const iconColor = isDarkMode 
    ? (variant === 'warning' ? 'text-yellow-400' : 'text-red-400')
    : (variant === 'warning' ? 'text-yellow-500' : 'text-orange-500');
  
  const titleColor = isDarkMode 
    ? (variant === 'warning' ? 'text-yellow-400' : 'text-red-400')
    : (variant === 'warning' ? 'text-yellow-500' : 'text-orange-500');
    
  const messageColor = isDarkMode 
    ? (variant === 'warning' ? 'text-yellow-300' : 'text-red-300')
    : (variant === 'warning' ? 'text-yellow-700' : 'text-orange-700');

  return (
    <div className={`${getErrorClasses(isDarkMode)} ${className}`}>
      <Icon className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${iconColor}`} />
      <div>
        <h3 className={`font-semibold ${titleColor}`}>
          {variant === 'warning' ? 'Warning' : 'Error'}
        </h3>
        <p className={messageColor}>{error}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;

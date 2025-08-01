import React from 'react';
import { getInputClasses, getTextClasses } from '../../utils/themeUtils';

/**
 * Reusable form input component with consistent theming
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {string} props.type - Input type (default: 'text')
 * @param {boolean} props.required - Whether input is required
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onChange - Change handler
 * @param {*} props.value - Input value
 * @param {string} props.id - Input ID
 * @param {string} props.name - Input name
 * @returns {JSX.Element} Form input component
 */
const FormInput = ({ 
  label,
  error,
  isDarkMode,
  type = 'text',
  required = false,
  placeholder = '',
  className = '',
  onChange,
  value,
  id,
  name,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className={`block text-sm font-medium ${getTextClasses(isDarkMode, 'primary')}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={getInputClasses(isDarkMode, !!error)}
        {...props}
      />
      {error && (
        <p className={`text-sm ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;

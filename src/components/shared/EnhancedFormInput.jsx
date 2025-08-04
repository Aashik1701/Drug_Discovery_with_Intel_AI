import React, { useState, useCallback, useEffect } from 'react';
import { CheckCircle, AlertCircle, Loader, Info } from 'lucide-react';
import { getTextClasses } from '../../utils/themeUtils';
import { validateSmiles } from '../../utils/chemUtils';

/**
 * Enhanced form input component with real-time validation
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type
 * @param {string} props.id - Input ID
 * @param {string} props.name - Input name
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.placeholder - Input placeholder
 * @param {boolean} props.required - Required field
 * @param {boolean} props.isDarkMode - Dark mode state
 * @param {string} props.validationType - Type of validation ('smiles', 'text', 'number')
 * @param {Function} props.customValidator - Custom validation function
 * @param {boolean} props.realTimeValidation - Enable real-time validation
 * @param {Array} props.suggestions - Auto-completion suggestions
 * @returns {JSX.Element} Enhanced form input component
 */
const EnhancedFormInput = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  isDarkMode,
  validationType = 'text',
  customValidator,
  realTimeValidation = true,
  suggestions = []
}) => {
  const [validationState, setValidationState] = useState({
    isValid: null,
    message: '',
    isValidating: false
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Debounced validation
  const validateInput = useCallback(async (inputValue) => {
    if (!realTimeValidation || !inputValue.trim()) {
      setValidationState({ isValid: null, message: '', isValidating: false });
      return;
    }

    setValidationState(prev => ({ ...prev, isValidating: true }));

    // Simulate async validation delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let result = { valid: true, error: null };

    // Apply built-in validation based on type
    switch (validationType) {
      case 'smiles':
        result = validateSmiles(inputValue);
        break;
      case 'number':
        const num = parseFloat(inputValue);
        if (isNaN(num)) {
          result = { valid: false, error: 'Please enter a valid number' };
        }
        break;
      case 'text':
        if (inputValue.length < 2) {
          result = { valid: false, error: 'Please enter at least 2 characters' };
        }
        break;
      default:
        break;
    }

    // Apply custom validation if provided
    if (result.valid && customValidator) {
      const customResult = customValidator(inputValue);
      if (typeof customResult === 'string') {
        result = { valid: false, error: customResult };
      } else if (typeof customResult === 'object' && !customResult.valid) {
        result = customResult;
      }
    }

    setValidationState({
      isValid: result.valid,
      message: result.error || (result.valid ? 'Valid input' : ''),
      isValidating: false
    });
  }, [realTimeValidation, validationType, customValidator]);

  // Debounce validation
  useEffect(() => {
    const timer = setTimeout(() => {
      validateInput(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, validateInput]);

  // Handle suggestions
  useEffect(() => {
    if (value && suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [value, suggestions]);

  const handleFocus = () => {
    setIsFocused(true);
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSuggestionClick = (suggestion) => {
    const event = {
      target: {
        name,
        value: suggestion
      }
    };
    onChange(event);
    setShowSuggestions(false);
  };

  const getInputClasses = () => {
    let baseClasses = `w-full px-3 py-2 rounded-md border transition-colors duration-200 ${
      isDarkMode
        ? 'bg-gray-700 text-white placeholder-gray-400'
        : 'bg-white text-gray-900 placeholder-gray-500'
    }`;

    if (validationState.isValidating) {
      baseClasses += ` ${isDarkMode ? 'border-yellow-500' : 'border-yellow-400'}`;
    } else if (validationState.isValid === true) {
      baseClasses += ` ${isDarkMode ? 'border-green-500' : 'border-green-400'}`;
    } else if (validationState.isValid === false) {
      baseClasses += ` ${isDarkMode ? 'border-red-500' : 'border-red-400'}`;
    } else {
      baseClasses += ` ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`;
    }

    if (isFocused) {
      baseClasses += ' ring-2 ring-opacity-50';
      if (validationState.isValid === true) {
        baseClasses += ` ${isDarkMode ? 'ring-green-500' : 'ring-green-400'}`;
      } else if (validationState.isValid === false) {
        baseClasses += ` ${isDarkMode ? 'ring-red-500' : 'ring-red-400'}`;
      } else {
        baseClasses += ` ${isDarkMode ? 'ring-blue-500' : 'ring-blue-400'}`;
      }
    }

    return baseClasses;
  };

  const getValidationIcon = () => {
    if (validationState.isValidating) {
      return <Loader className="h-4 w-4 text-yellow-500 animate-spin" />;
    } else if (validationState.isValid === true) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (validationState.isValid === false) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getValidationMessage = () => {
    if (!validationState.message) return null;

    const messageClasses = `text-sm mt-1 ${
      validationState.isValid === true ? 'text-green-500' : 'text-red-500'
    }`;

    return (
      <p className={messageClasses}>
        {validationState.message}
      </p>
    );
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-2 ${getTextClasses(isDarkMode, 'primary')}`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={getInputClasses()}
        />
        
        {/* Validation Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {getValidationIcon()}
        </div>
      </div>

      {/* Validation Message */}
      {getValidationMessage()}

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-white border-gray-200'
        }`}>
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                isDarkMode 
                  ? 'hover:bg-gray-600 text-white' 
                  : 'hover:bg-gray-100 text-gray-900'
              } ${index === 0 ? 'rounded-t-md' : ''} ${
                index === filteredSuggestions.length - 1 ? 'rounded-b-md' : ''
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Help Text for SMILES validation */}
      {validationType === 'smiles' && (
        <div className={`flex items-center mt-1 text-xs ${getTextClasses(isDarkMode, 'muted')}`}>
          <Info className="h-3 w-3 mr-1" />
          <span>
            Enter a valid SMILES string (e.g., CC(=O)OC1=CC=CC=C1C(=O)O for aspirin)
          </span>
        </div>
      )}
    </div>
  );
};

export default EnhancedFormInput;

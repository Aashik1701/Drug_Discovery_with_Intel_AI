import { useState, useCallback } from 'react';

/**
 * Custom hook for handling prediction API calls
 * Consolidates common prediction logic across components
 * @param {string} apiEndpoint - The API endpoint for predictions
 * @param {Function} validateInput - Optional input validation function
 * @param {Function} formatResult - Optional result formatting function
 * @returns {Object} Hook state and functions
 */
const usePrediction = (apiEndpoint, validateInput = null, formatResult = null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const predict = useCallback(async (inputData) => {
    // Validate input if validator provided
    if (validateInput) {
      const validationError = validateInput(inputData);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setIsLoading(true);
    setError(null);
    setShowResult(false);
    setResult(null);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Format result if formatter provided
      const formattedResult = formatResult ? formatResult(data) : data;
      
      setResult(formattedResult);
      setShowResult(true);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'An error occurred during prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [apiEndpoint, validateInput, formatResult]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setResult(null);
    setError(null);
    setShowResult(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    result,
    error,
    showResult,
    predict,
    reset,
    clearError
  };
};

export default usePrediction;

import { useState, useCallback, useEffect } from 'react';

/**
 * Enhanced custom hook for handling prediction API calls with analytics
 * Consolidates common prediction logic across components with history tracking
 * @param {string} apiEndpoint - The API endpoint for predictions
 * @param {Function} validateInput - Optional input validation function
 * @param {Function} formatResult - Optional result formatting function
 * @param {Object} options - Additional options
 * @returns {Object} Enhanced hook state and functions
 */
const useEnhancedPrediction = (
  apiEndpoint, 
  validateInput = null, 
  formatResult = null,
  options = {}
) => {
  const {
    enableHistory = true,
    maxHistorySize = 10,
    enableRetry = true,
    maxRetries = 3,
    retryDelay = 1000
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [history, setHistory] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalPredictions: 0,
    successfulPredictions: 0,
    failedPredictions: 0,
    averageResponseTime: 0,
    lastPredictionTime: null
  });
  const [retryCount, setRetryCount] = useState(0);

  // Load history from localStorage on component mount
  useEffect(() => {
    if (enableHistory) {
      const storageKey = `prediction_history_${apiEndpoint.split('/').pop()}`;
      const savedHistory = localStorage.getItem(storageKey);
      const savedAnalytics = localStorage.getItem(`${storageKey}_analytics`);
      
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.warn('Failed to load prediction history:', e);
        }
      }
      
      if (savedAnalytics) {
        try {
          setAnalytics(JSON.parse(savedAnalytics));
        } catch (e) {
          console.warn('Failed to load prediction analytics:', e);
        }
      }
    }
  }, [apiEndpoint, enableHistory]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (enableHistory && history.length > 0) {
      const storageKey = `prediction_history_${apiEndpoint.split('/').pop()}`;
      localStorage.setItem(storageKey, JSON.stringify(history));
      localStorage.setItem(`${storageKey}_analytics`, JSON.stringify(analytics));
    }
  }, [history, analytics, apiEndpoint, enableHistory]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const updateAnalytics = useCallback((success, responseTime) => {
    setAnalytics(prev => ({
      totalPredictions: prev.totalPredictions + 1,
      successfulPredictions: success ? prev.successfulPredictions + 1 : prev.successfulPredictions,
      failedPredictions: success ? prev.failedPredictions : prev.failedPredictions + 1,
      averageResponseTime: prev.totalPredictions === 0 
        ? responseTime 
        : (prev.averageResponseTime * prev.totalPredictions + responseTime) / (prev.totalPredictions + 1),
      lastPredictionTime: new Date().toISOString()
    }));
  }, []);

  const addToHistory = useCallback((inputData, result, error = null) => {
    if (!enableHistory) return;

    const historyItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      input: inputData,
      result: result,
      error: error,
      success: !error
    };

    setHistory(prev => {
      const newHistory = [historyItem, ...prev];
      return newHistory.slice(0, maxHistorySize);
    });
  }, [enableHistory, maxHistorySize]);

  const attemptPrediction = useCallback(async (inputData, attempt = 1) => {
    const startTime = Date.now();
    
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
      const responseTime = Date.now() - startTime;
      
      // Format result if formatter provided
      const formattedResult = formatResult ? formatResult(data) : data;
      
      setResult(formattedResult);
      setShowResult(true);
      setRetryCount(0);
      
      // Update analytics and history
      updateAnalytics(true, responseTime);
      addToHistory(inputData, formattedResult);

      return formattedResult;
    } catch (err) {
      const responseTime = Date.now() - startTime;
      
      if (enableRetry && attempt < maxRetries) {
        console.warn(`Prediction attempt ${attempt} failed, retrying...`, err.message);
        setRetryCount(attempt);
        await sleep(retryDelay * attempt); // Exponential backoff
        return attemptPrediction(inputData, attempt + 1);
      }

      // Final failure
      const errorMessage = err.message || 'An error occurred during prediction. Please try again.';
      setError(errorMessage);
      setRetryCount(0);
      
      updateAnalytics(false, responseTime);
      addToHistory(inputData, null, errorMessage);
      
      throw err;
    }
  }, [apiEndpoint, formatResult, enableRetry, maxRetries, retryDelay, updateAnalytics, addToHistory]);

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
    setRetryCount(0);

    try {
      await attemptPrediction(inputData);
    } catch (err) {
      console.error('Prediction error:', err);
      // Error is already set in attemptPrediction
    } finally {
      setIsLoading(false);
    }
  }, [validateInput, attemptPrediction]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setResult(null);
    setError(null);
    setShowResult(false);
    setRetryCount(0);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    const storageKey = `prediction_history_${apiEndpoint.split('/').pop()}`;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${storageKey}_analytics`);
  }, [apiEndpoint]);

  const getHistoryBySuccess = useCallback((successful = true) => {
    return history.filter(item => item.success === successful);
  }, [history]);

  const exportHistory = useCallback((format = 'json') => {
    const data = {
      history,
      analytics,
      exportDate: new Date().toISOString(),
      endpoint: apiEndpoint
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `prediction_history_${apiEndpoint.split('/').pop()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const csvRows = [
        'Timestamp,Input,Result,Success,Error',
        ...history.map(item => [
          item.timestamp,
          JSON.stringify(item.input).replace(/"/g, '""'),
          item.result ? JSON.stringify(item.result).replace(/"/g, '""') : '',
          item.success,
          item.error ? item.error.replace(/"/g, '""') : ''
        ].map(field => `"${field}"`).join(','))
      ];
      
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `prediction_history_${apiEndpoint.split('/').pop()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [history, analytics, apiEndpoint]);

  return {
    // Original API
    isLoading,
    result,
    error,
    showResult,
    predict,
    reset,
    clearError,
    
    // Enhanced features
    history,
    analytics,
    retryCount,
    clearHistory,
    getHistoryBySuccess,
    exportHistory,
    
    // Utility functions
    recentSuccessRate: analytics.totalPredictions > 0 
      ? (analytics.successfulPredictions / analytics.totalPredictions * 100).toFixed(1)
      : 0
  };
};

export default useEnhancedPrediction;

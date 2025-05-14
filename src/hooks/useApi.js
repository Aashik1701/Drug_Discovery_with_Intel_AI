// Custom hook for API calls that provides a standardized way to call endpoints
import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDrugForge } from '../context/DrugForgeContext';

/**
 * Custom hook for making API calls with automatic loading state, error handling,
 * and integration with the global Drug Forge context
 */
export const useApi = () => {
  const { setLoading, setError, addNotification } = useDrugForge();
  const [data, setData] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Get the API base URL from environment variables
  const apiBaseUrl = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000';

  /**
   * Make a POST request to the API
   * @param {string} endpoint - The API endpoint to call
   * @param {Object} payload - The data to send
   * @param {boolean} useGlobalLoading - Whether to use global loading state
   * @param {boolean} showNotification - Whether to show a notification on success
   * @param {boolean} showError - Whether to show an error notification on failure
   */
  const post = useCallback(async (
    endpoint, 
    payload, 
    { 
      useGlobalLoading = false, 
      showNotification = false,
      showError = true
    } = {}
  ) => {
    try {
      // Set loading state
      if (useGlobalLoading) {
        setLoading(true);
      }
      setLocalLoading(true);
      setLocalError(null);
      
      // Make the API call
      const response = await axios.post(`${apiBaseUrl}${endpoint}`, payload);
      
      // Handle successful response
      setData(response.data);
      
      // Show success notification if requested
      if (showNotification) {
        addNotification({
          type: 'success',
          title: 'Success',
          message: 'Operation completed successfully'
        });
      }
      
      return response.data;
    } catch (err) {
      // Handle error
      const errorMessage = err.response?.data?.error || 
        'An error occurred. Please try again later.';
      
      setLocalError(errorMessage);
      
      // Show error notification if requested
      if (showError) {
        if (useGlobalLoading) {
          setError(errorMessage);
        } else {
          addNotification({
            type: 'error',
            title: 'Error',
            message: errorMessage
          });
        }
      }
      
      throw err;
    } finally {
      // Reset loading state
      if (useGlobalLoading) {
        setLoading(false);
      }
      setLocalLoading(false);
    }
  }, [apiBaseUrl, setLoading, setError, addNotification]);

  /**
   * Make a GET request to the API
   * @param {string} endpoint - The API endpoint to call
   * @param {Object} params - URL parameters
   * @param {boolean} useGlobalLoading - Whether to use global loading state
   * @param {boolean} showError - Whether to show an error notification on failure
   */
  const get = useCallback(async (
    endpoint, 
    params = {}, 
    { 
      useGlobalLoading = false, 
      showError = true
    } = {}
  ) => {
    try {
      // Set loading state
      if (useGlobalLoading) {
        setLoading(true);
      }
      setLocalLoading(true);
      setLocalError(null);
      
      // Make the API call
      const response = await axios.get(`${apiBaseUrl}${endpoint}`, { params });
      
      // Handle successful response
      setData(response.data);
      return response.data;
    } catch (err) {
      // Handle error
      const errorMessage = err.response?.data?.error || 
        'An error occurred. Please try again later.';
      
      setLocalError(errorMessage);
      
      // Show error notification if requested
      if (showError) {
        if (useGlobalLoading) {
          setError(errorMessage);
        } else {
          addNotification({
            type: 'error',
            title: 'Error',
            message: errorMessage
          });
        }
      }
      
      throw err;
    } finally {
      // Reset loading state
      if (useGlobalLoading) {
        setLoading(false);
      }
      setLocalLoading(false);
    }
  }, [apiBaseUrl, setLoading, setError, addNotification]);

  return {
    post,
    get,
    data,
    loading: localLoading,
    error: localError,
    resetData: () => setData(null),
    resetError: () => setLocalError(null)
  };
};

import { useState, useEffect, useCallback } from 'react';
import { useDrugForge } from '../context/DrugForgeContext.jsx';

/**
 * Custom hook for user authentication functionality
 */
export const useAuth = () => {
  const { state, setUser } = useDrugForge();
  const { user } = state;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Check if user is logged in
  const isLoggedIn = !!user;
  
  // Check for stored auth on initial load
  useEffect(() => {
    const checkStoredAuth = async () => {
      setIsLoading(true);
      try {
        // Check local storage for auth token
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          // Validate token with server (in a real app)
          // For now, just restore the user data
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        // Clear potentially corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkStoredAuth();
  }, [setUser]);
  
  /**
   * Login function
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call
      // For now, we'll simulate a successful login
      
      // Simple validation
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create mock user object
      const userData = {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0], // Use part of email as name for demo
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      // Store in local storage
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update global state
      setUser(userData);
      
      return userData;
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);
  
  /**
   * Register function
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} name - User's name
   */
  const register = useCallback(async (email, password, name) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make an API call
      // For now, we'll simulate a successful registration
      
      // Simple validation
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      if (!name || name.trim().length < 2) {
        throw new Error('Please enter your name');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user object
      const userData = {
        id: 'user-' + Date.now(),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      // Store in local storage
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update global state
      setUser(userData);
      
      return userData;
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);
  
  /**
   * Logout function
   */
  const logout = useCallback(() => {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Update global state
    setUser(null);
  }, [setUser]);
  
  return {
    user,
    isLoggedIn,
    isLoading,
    error,
    login,
    register,
    logout,
  };
};

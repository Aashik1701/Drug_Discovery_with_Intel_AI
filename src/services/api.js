/**
 * API service for DrugForge AI
 * Handles communication with backend ML models and services
 */

import axios from 'axios';

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle specific error codes
    if (response && response.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authService = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
  getProfile: () => apiClient.get('/auth/profile'),
};

// Drug prediction endpoints
export const predictionService = {
  // Solubility prediction
  predictSolubility: (smiles) => apiClient.post('/predict/solubility', { smiles }),
  
  // BBBP prediction
  predictBBBP: (smiles) => apiClient.post('/predict/bbbp', { smiles }),
  
  // CYP3A4 prediction
  predictCYP3A4: (smiles) => apiClient.post('/predict/cyp3a4', { smiles }),
  
  // Half-life prediction
  predictHalfLife: (smiles) => apiClient.post('/predict/half-life', { smiles }),
  
  // COX2 prediction
  predictCOX2: (smiles) => apiClient.post('/predict/cox2', { smiles }),
  
  // HEPG2 prediction
  predictHEPG2: (smiles) => apiClient.post('/predict/hepg2', { smiles }),
  
  // Binding Score prediction
  predictBindingScore: (smiles, targetId) => apiClient.post('/predict/binding-score', { smiles, targetId }),
  
  // ACE2 prediction
  predictACE2: (smiles) => apiClient.post('/predict/ace2', { smiles }),
  
  // Toxicity prediction
  predictToxicity: (smiles) => apiClient.post('/predict/toxicity', { smiles }),
};

// Molecular docking endpoints
export const dockingService = {
  performDocking: (smiles, proteinId) => apiClient.post('/docking/run', { smiles, proteinId }),
  getDockingStatus: (jobId) => apiClient.get(`/docking/status/${jobId}`),
  getDockingResults: (jobId) => apiClient.get(`/docking/results/${jobId}`),
};

// Target identification endpoints
export const targetService = {
  identifyTargets: (smiles) => apiClient.post('/target/identify', { smiles }),
  getTargetDetails: (targetId) => apiClient.get(`/target/${targetId}`),
  listTargets: () => apiClient.get('/target/list'),
};

// User data endpoints
export const userService = {
  saveMolecule: (data) => apiClient.post('/user/molecules', data),
  getMolecules: () => apiClient.get('/user/molecules'),
  deleteMolecule: (id) => apiClient.delete(`/user/molecules/${id}`),
  saveResult: (data) => apiClient.post('/user/results', data),
  getResults: () => apiClient.get('/user/results'),
};

export default {
  authService,
  predictionService,
  dockingService,
  targetService,
  userService,
};

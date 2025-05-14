import React from 'react';
import ReactDOM from 'react-dom/client'; // Use this import for React 18+
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Render the app
root.render(
  <React.StrictMode>
    <BrowserRouter future={{
      v7_relativeSplatPath: true,
      }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

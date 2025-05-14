import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Import the fixed app component
import App from './FixedApp.jsx';

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Render the app with proper routing
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

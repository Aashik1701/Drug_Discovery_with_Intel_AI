import React from 'react';
import ReactDOM from 'react-dom/client'; // Use this import for React 18+
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// Suppress unhandled promise rejections from browser extensions
// (e.g., {name: 'n', httpError: false, httpStatus: 200, code: 403})
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason;
  if (reason && typeof reason === 'object' && 'httpError' in reason && 'httpStatus' in reason) {
    // This is a browser extension error, not from our app
    event.preventDefault();
  }
});

// Create a root for rendering
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Render the app
root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

import React, { useState } from 'react';
import './index.css';
import TestComponent from './TestComponent.jsx';
import DebugComponent from './DebugComponent.jsx';
import { DrugForgeProvider } from './context/DrugForgeContext.jsx';
import { ThemeProvider } from './components/ThemeProvider.jsx';

// Import components - we'll lazy load them later
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const ProgressiveDebugApp = () => {
  const [debugLevel, setDebugLevel] = useState(0);
  const [errorState, setErrorState] = useState(null);

  const increaseLevel = () => {
    setDebugLevel(prev => prev + 1);
  };

  const decreaseLevel = () => {
    setDebugLevel(prev => Math.max(0, prev - 1));
  };

  const renderDebugLevel = () => {
    try {
      switch (debugLevel) {
        case 0:
          return <TestComponent />;

        case 1:
          return (
            <>
              <TestComponent />
              <div className="p-4 mt-4 text-center bg-blue-100 rounded">
                <p>Level 1: Basic structure loaded successfully!</p>
              </div>
            </>
          );

        case 2:
          return (
            <>
              <TestComponent />
              <Header />
              <div className="p-4 mt-4 text-center bg-blue-100 rounded">
                <p>Level 2: Header component loaded successfully!</p>
              </div>
            </>
          );

        case 3:
          return (
            <ThemeProvider>
              <TestComponent />
              <Header />
              <div className="p-4 mt-4 text-center bg-blue-100 rounded">
                <p>Level 3: ThemeProvider added successfully!</p>
              </div>
            </ThemeProvider>
          );

        case 4:
          return (
            <DrugForgeProvider>
              <ThemeProvider>
                <TestComponent />
                <Header />
                <div className="p-4 mt-4 text-center bg-blue-100 rounded">
                  <p>Level 4: DrugForgeProvider added successfully!</p>
                </div>
              </ThemeProvider>
            </DrugForgeProvider>
          );

        case 5:
          return (
            <DrugForgeProvider>
              <ThemeProvider>
                <Header />
                <TestComponent />
                <Footer />
                <div className="p-4 mt-4 text-center bg-blue-100 rounded">
                  <p>Level 5: Footer component added successfully!</p>
                </div>
              </ThemeProvider>
            </DrugForgeProvider>
          );

        default:
          return <TestComponent />;
      }
    } catch (error) {
      setErrorState(`Error at debug level ${debugLevel}: ${error.message}`);
      return <div className="p-4 text-white bg-red-600 rounded">Error occurred! See debug info below.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-4 text-center text-white bg-blue-600">
        <h1 className="text-3xl font-bold">DrugForge AI - Progressive Debug Mode</h1>
        <div className="mt-2">
          <button 
            onClick={decreaseLevel}
            className="px-4 py-2 mr-2 bg-blue-700 rounded hover:bg-blue-800"
            disabled={debugLevel === 0}
          >
            Previous Level
          </button>
          <span className="px-4 py-2 font-bold bg-blue-800 rounded">Level {debugLevel}</span>
          <button 
            onClick={increaseLevel}
            className="px-4 py-2 ml-2 bg-blue-700 rounded hover:bg-blue-800"
          >
            Next Level
          </button>
        </div>
      </div>

      <main className="container p-4 mx-auto">
        {renderDebugLevel()}
        
        <div className="p-4 mt-8 bg-gray-100 rounded">
          <h2 className="text-xl font-bold">Debug Information</h2>
          {errorState && (
            <div className="p-2 mt-2 text-red-600 bg-red-100 border border-red-200 rounded">
              {errorState}
            </div>
          )}
          <DebugComponent />
        </div>
      </main>
    </div>
  );
};

export default ProgressiveDebugApp;

import React from 'react';
import './index.css';
import TestComponent from './TestComponent.jsx';
import DebugComponent from './DebugComponent.jsx';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="p-4 text-center text-white bg-blue-600">
        <h1 className="text-3xl font-bold">DrugForge AI</h1>
      </header>
      <main className="container p-4 mx-auto">
        <TestComponent />
        <DebugComponent />
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Simplified App Structure</h2>
          <p className="mt-2 text-gray-600">All complex components temporarily disabled for debugging</p>
        </div>
      </main>
    </div>
  );
};

export default App;

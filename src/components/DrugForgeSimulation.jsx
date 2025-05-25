import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useDrugForge } from '../context/DrugForgeContext';

export const Button1 = ({ children, type = 'button1', isDarkMode, ...props }) => (
  <button1
    type={type}
    className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
      isDarkMode 
        ? "text-white bg-blue-600 hover:bg-blue-700" 
        : "text-white bg-blue-500 hover:bg-blue-600"
    }`}
    {...props}
  >
    {children}
  </button1>
);

export const Input = React.forwardRef(({ isDarkMode, ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      isDarkMode 
        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400" 
        : "bg-white border-gray-300 text-gray-700 placeholder-gray-500"
    }`}
    {...props}
  />
));

Input.displayName = 'Input';

export const Label = ({ children, htmlFor, isDarkMode, ...props }) => (
  <label
    htmlFor={htmlFor}
    className={`block mb-1 text-sm font-medium ${
      isDarkMode ? "text-gray-200" : "text-gray-700"
    }`}
    {...props}
  >
    {children}
  </label>
);

const DrugForgeSimulation = () => {
  const { isDarkMode } = useDrugForge();
  const [targetSequence, setTargetSequence] = useState('');
  const [inputSequence, setInputSequence] = useState('');
  const [outputValue, setOutputValue] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOutputValue(null);

    if (!targetSequence || !inputSequence) {
      setError('Please fill in both sequence fields.');
      return;
    }

    try {
      // Simulating API call to Python model
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetSequence, inputSequence }),
      });

      if (!response.ok) throw new Error('Simulation failed');

      const data = await response.json();
      setOutputValue(data.simulatedValue);
    } catch (err) {
      setError('An error occurred during simulation. Please try again.');
    }
  };

  return (
    <div className={`max-w-xl p-6 mx-auto rounded-lg shadow-md ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      <h1 className={`mb-6 text-2xl font-bold text-center ${
        isDarkMode ? "text-gray-100" : "text-gray-800"
      }`}>DrugForge Simulation</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="targetSequence" isDarkMode={isDarkMode}>Target Sequence:</Label>
          <Input
            id="targetSequence"
            value={targetSequence}
            onChange={(e) => setTargetSequence(e.target.value)}
            placeholder="Enter target sequence"
            isDarkMode={isDarkMode}
          />
        </div>
        
        <div>
          <Label htmlFor="inputSequence" isDarkMode={isDarkMode}>Input Sequence:</Label>
          <Input
            id="inputSequence"
            value={inputSequence}
            onChange={(e) => setInputSequence(e.target.value)}
            placeholder="Enter input sequence"
            isDarkMode={isDarkMode}
          />
        </div>
        
        <button
          type="submit"
          className={`w-full px-4 py-2 text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${
            isDarkMode 
              ? "text-white bg-blue-600 hover:bg-blue-700" 
              : "text-white bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Run Simulation
        </button>
      </form>
      
      {error && (
        <div className={`flex items-center p-3 mt-4 border rounded-md ${
          isDarkMode 
            ? "bg-red-900/50 border-red-700 text-red-300" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <AlertCircle className={`w-5 h-5 mr-2 ${
            isDarkMode ? "text-red-400" : "text-red-500"
          }`} />
          <span>{error}</span>
        </div>
      )}
      
      {outputValue !== null && (
        <div className={`p-4 mt-6 border rounded-md ${
          isDarkMode 
            ? "border-gray-600 bg-gray-700" 
            : "border-gray-200 bg-gray-50"
        }`}>
          <h2 className={`mb-2 text-lg font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}>Simulation Result:</h2>
          <p className={`text-2xl font-bold ${
            isDarkMode ? "text-green-400" : "text-green-600"
          }`}>{outputValue.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default DrugForgeSimulation;

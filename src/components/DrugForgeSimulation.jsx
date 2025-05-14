import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

export const Button1 = ({ children, type = 'button1', ...props }) => (
  <button1
    type={type}
    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    {...props}
  >
    {children}
  </button1>
);

export const Input = React.forwardRef(({ ...props }, ref) => (
  <input
    ref={ref}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    {...props}
  />
));

Input.displayName = 'Input';

export const Label = ({ children, htmlFor, ...props }) => (
  <label
    htmlFor={htmlFor}
    className="block mb-1 text-sm font-medium text-gray-700"
    {...props}
  >
    {children}
  </label>
);

const DrugForgeSimulation = () => {
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
    <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">DrugForge Simulation</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="targetSequence">Target Sequence:</Label>
          <Input
            id="targetSequence"
            value={targetSequence}
            onChange={(e) => setTargetSequence(e.target.value)}
            placeholder="Enter target sequence"
          />
        </div>
        
        <div>
          <Label htmlFor="inputSequence">Input Sequence:</Label>
          <Input
            id="inputSequence"
            value={inputSequence}
            onChange={(e) => setInputSequence(e.target.value)}
            placeholder="Enter input sequence"
          />
        </div>
        
        <button
          type="submit"
          className="w-full px-4 py-2 text-base font-medium text-white transition-colors bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Run Simulation
        </button>
      </form>
      
      {error && (
        <div className="flex items-center p-3 mt-4 text-red-800 border border-red-200 rounded-md bg-red-50">
          <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
          <span>{error}</span>
        </div>
      )}
      
      {outputValue !== null && (
        <div className="p-4 mt-6 border border-gray-200 rounded-md bg-gray-50">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Simulation Result:</h2>
          <p className="text-2xl font-bold text-green-600">{outputValue.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default DrugForgeSimulation;

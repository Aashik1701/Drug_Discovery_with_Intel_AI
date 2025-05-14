import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import './DrugForgeSimulation.css';

export const Button1 = ({ children, type = 'button1', ...props }) => (
  <button1
    type={type}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
    className="block text-sm font-medium text-gray-700 mb-1"
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
    <div className="drugforge-simulation">
      <h1>DrugForge Simulation</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <Label htmlFor="targetSequence">Target Sequence:</Label>
          <Input
            id="targetSequence"
            value={targetSequence}
            onChange={(e) => setTargetSequence(e.target.value)}
            placeholder="Enter target sequence"
          />
        </div>
        <div className="input-group">
          <Label htmlFor="inputSequence">Input Sequence:</Label>
          <Input
            id="inputSequence"
            value={inputSequence}
            onChange={(e) => setInputSequence(e.target.value)}
            placeholder="Enter input sequence"
          />
        </div>
        <Button1 type="submit">Run Simulation</Button1>
      </form>
      {error && (
        <div className="error-message">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
      {outputValue !== null && (
        <div className="output-value">
          <h2>Simulation Result:</h2>
          <p>{outputValue.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
};

export default DrugForgeSimulation;
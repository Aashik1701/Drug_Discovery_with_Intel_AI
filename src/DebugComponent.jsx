import React, { useState, useEffect } from 'react';

const DebugComponent = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Capture errors that might be happening in the app
    const originalConsoleError = console.error;
    console.error = (...args) => {
      setError(prev => [...(prev || []), args.join(' ')]);
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <div className="p-4 m-4 text-left bg-red-100 rounded" style={{ maxHeight: '300px', overflow: 'auto' }}>
      <h2 className="text-xl font-bold text-red-600">Debug Information</h2>
      <p className="mb-2">If there are errors, they will appear below:</p>
      {error ? (
        <pre className="p-2 overflow-x-auto bg-gray-100 border rounded">
          {error.map((err, i) => (
            <div key={i} className="mb-2">
              {err}
            </div>
          ))}
        </pre>
      ) : (
        <p className="text-green-600">No errors captured yet</p>
      )}
    </div>
  );
};

export default DebugComponent;

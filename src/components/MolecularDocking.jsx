import React, { useState } from 'react';

function MolecularDocking() {
  const [protein, setProtein] = useState('');
  const [ligand, setLigand] = useState('');
  const [dockingResult, setDockingResult] = useState(null);

  const handleDocking = (e) => {
    e.preventDefault();
    
    // Simulate docking result
    const result = {
      bindingAffinity: (Math.random() * -10).toFixed(2), // Negative values indicate stronger binding
      interactionType: Math.random() > 0.5 ? 'Hydrogen Bond' : 'Hydrophobic',
    };
    
    setDockingResult(result);
  };

  return (
    <div>
      <h1>Molecular Docking</h1>
      <form onSubmit={handleDocking}>
        <label>
          Protein Name:
          <input
            type="text"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Ligand Name:
          <input
            type="text"
            value={ligand}
            onChange={(e) => setLigand(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Perform Docking</button>
      </form>

      {dockingResult && (
        <div>
          <h2>Docking Result</h2>
          <p>Binding Affinity: {dockingResult.bindingAffinity} kcal/mol</p>
          <p>Interaction Type: {dockingResult.interactionType}</p>
        </div>
      )}
    </div>
  );
}

export default MolecularDocking;
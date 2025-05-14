import React from 'react';
import { Link } from 'react-router-dom';
import './Features.css'; // Import the corresponding CSS file

const features = [
  {
    title: 'Solubility Prediction',
    description: 'Predict the solubility of chemical compounds.',
    imageUrl: '/Images/features/solubility-prediction.jpg',
    route: '/predictor',
  },
  {
    title: 'Blood-Brain Barrier Permeability',
    description: 'Evaluate the permeability of compounds across the blood-brain barrier.',
    imageUrl: '/Images/features/bbb-permeability.jpg',
    route: '/bbb-permeability', // Change this route as needed
  },
  {
    title: 'Target Identification and Activity Prediction',
    description: 'Identify potential drug targets and predict their activity.',
    imageUrl: '/Images/features/target-identification.jpg',
    route: '/target-identification', // Change this route as needed
  },
  {
    title: 'Molecular Docking',
    description: 'Analyze the interaction between molecules and targets.',
    imageUrl: '/Images/features/molecular-docking.jpg',
    route: '/molecular-docking', // Change this route as needed
  },
];

const Features = () => {
  return (
    <div className="features-container">
      <h2>Our Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <Link key={index} to={feature.route} className="feature-card">
            <img src={feature.imageUrl} alt={feature.title} className="feature-image" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Features;

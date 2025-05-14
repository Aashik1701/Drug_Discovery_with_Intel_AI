import React from 'react';
import { Link } from 'react-router-dom';

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
    route: '/bbb-permeability',
  },
  {
    title: 'Target Identification and Activity Prediction',
    description: 'Identify potential drug targets and predict their activity.',
    imageUrl: '/Images/features/target-identification.jpg',
    route: '/target-identification',
  },
  {
    title: 'Molecular Docking',
    description: 'Analyze the interaction between molecules and targets.',
    imageUrl: '/Images/features/molecular-docking.jpg',
    route: '/molecular-docking',
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">Capabilities</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Our Features
          </p>
          <p className="max-w-2xl mt-4 text-xl text-gray-500 lg:mx-auto">
            Advanced drug discovery tools powered by artificial intelligence and machine learning
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.route} 
                className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-lg hover:border-blue-300"
              >
                <div className="bg-gray-200 aspect-w-3 aspect-h-2">
                  <img 
                    src={feature.imageUrl} 
                    alt={feature.title} 
                    className="object-cover object-center w-full h-48 transition-transform duration-300 transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                  <div className="flex items-center mt-4 text-blue-600">
                    <span className="text-sm font-medium">Learn more</span>
                    <svg 
                      className="w-4 h-4 ml-1 transition-transform duration-300 transform group-hover:translate-x-1" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

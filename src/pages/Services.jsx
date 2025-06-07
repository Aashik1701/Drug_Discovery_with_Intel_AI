// Services.js
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDrugForge } from '../context/DrugForgeContext.jsx';

const Services = () => {
  const { state } = useDrugForge();
  const { theme } = state;
  const isDarkMode = theme === 'dark';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  
  const services = useMemo(() => [
    {
      name: "BBBP",
      image: "/Images/services/bbbp-service.gif",
      keywords: ["Pharmacokinetics", "DrugClearance", "Bioavailability"],
      description: " Predicts a drug's ability to cross the Blood-Brain Barrier (BBB), crucial for developing treatments targeting the central nervous system (CNS).",
      link: "/bbbp"
    },
    {
      name: "BindingScore",
      image: "/Images/services/binding-score-service.gif",
      keywords: ["BindingScore", "DrugAffinity", "ReceptorBinding", "DrugEfficacy"],
      description: " Measures how strongly a drug binds to its target receptor, providing insights into drug efficacy.",
      link: "/binding-score"
    },
    {
      name: "COX2",
      image: "/Images/services/cox2-service.gif",
      keywords: ["Enzyme", "Inhibition", "Receptor", "DrugInteractions", "EnzymeInhibition"],
      description: " Evaluates how a drug inhibits the COX-2 enzyme, a key target in anti-inflammatory and pain-relief medications.",
      link: "/cox2"
    },
    {
      name: "HEPG2",
      image: "/Images/services/hepg2-service.webp",
      keywords: ["Hepatotoxicity", "LiverToxicity", "CellToxicity", "Toxicity"],
      description: " Predicts hepatotoxicity using HEPG2 liver cells, helping assess a drug's potential liver toxicity",
      link: "/hepg2"
    },
    {
      name: "CYP3A4Predictor",
      image: "/Images/services/cyp3a4-service.gif",
      keywords: ["Metabolism", "CYP3A4", "DrugMetabolism", "Pharmacokinetics"],
      description: " Predicts a compound's effect on the CYP3A4 enzyme, crucial for understanding drug metabolism and potential drug-drug interactions",
      link: "/cyp3a4-predictor"
    },
    {
      name: "HalfLife",
      image: "/Images/services/half-life-service.gif",
      keywords: ["DrugClearance", "Pharmacokinetics", "DrugStability", "Metabolism"],
      description: " Estimates the half-life of a drug, indicating how long it remains active in the body, helping design dosing schedules.",
      link: "/half-life"
    },
    {
      name: "SolubilityChecker",
      image: "/Images/services/solubility-service.gif",
      keywords: ["Solubility", "DrugSolubility", "Absorption", "Bioavailability"],
      description: "Description: Predicts a compound's solubility, which impacts its absorption and overall bioavailability in the body.",
      link: "/solubility-checker"
    },
    {
      name: "ACE2",
      image: "/Images/services/ace2-service.gif",
      keywords: ["ReceptorBinding", "Binding", "Interaction", "DrugAffinity"],
      description: " Evaluates the interaction between a drug and the ACE2 receptor, which is crucial for understanding its potential in treatments, especially for diseases like COVID-19.",
      link: "/ace2"
    },
    {
      name: "Toxicity",
      image: "/Images/services/toxicity-service.gif",
      keywords: ["Toxicity", "Safety", "DrugToxicity", "CellToxicity", "Hepatotoxicity"],
      description: "",
      link: "/toxicity"
    }
  ], []);

  const filters = [
    "Pharmacokinetics", "Binding", "Interaction", "Toxicity", "Solubility", "HalfLife",
    "Metabolism", "Absorption", "CYP3A4", "COX2", "ACE2", "Receptor", "Enzyme", "Safety",
    "DrugAffinity", "Hepatotoxicity", "DrugClearance", "Bioavailability", "DrugStability",
    "DrugSolubility", "DrugMetabolism", "Inhibition", "LiverToxicity", "CellToxicity",
    "BindingScore", "DrugInteractions", "EnzymeInhibition", "ReceptorBinding", "DrugEfficacy", 
    "DrugToxicity"
  ] ;

  useEffect(() => {
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilters.length === 0 || service.keywords.some(keyword => selectedFilters.includes(keyword)))
    );
    setFilteredServices(filtered);
  }, [searchTerm, selectedFilters, services]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleFilterToggle = (filter) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${
      isDarkMode 
        ? 'text-white bg-gradient-to-b from-gray-900 to-black' 
        : 'text-gray-900 bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="mx-auto max-w-7xl">
        {/* Header with animation */}
        <h1 className={`mb-12 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r transition-colors duration-300 ${
          isDarkMode 
            ? 'from-blue-400 to-purple-600' 
            : 'from-blue-600 to-purple-800'
        } animate-pulse`}>
          DrugForge Services
        </h1>
        
        {/* Search Bar with floating effect */}
        <div className="mb-10 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`w-full p-4 transition-all duration-300 border rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 ${
                isDarkMode 
                  ? 'text-white border-gray-700 bg-gray-800/50 placeholder-gray-400 focus:border-blue-500' 
                  : 'text-gray-900 border-gray-300 bg-white/80 placeholder-gray-500 focus:border-blue-600'
              }`}
            />
            <span className={`absolute right-4 top-4 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Filters with smooth animation */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterToggle(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedFilters.includes(filter)
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 scale-105' 
                      : 'bg-blue-500 text-white shadow-lg shadow-blue-400/50 scale-105'
                    : isDarkMode
                      ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200/80 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Service Grid with hover effects */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div 
              key={service.name} 
              className={`group backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-800/30 hover:shadow-xl hover:shadow-blue-500/20' 
                  : 'bg-white/80 shadow-lg hover:shadow-2xl hover:shadow-blue-400/20'
              }`}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="object-cover w-full h-full transition-transform duration-500 transform group-hover:scale-110" 
                />
                <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                  isDarkMode ? 'from-gray-900' : 'from-gray-800'
                }`} />
              </div>
              
              <div className="p-6">
                <h3 className={`mb-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r transition-colors duration-300 ${
                  isDarkMode 
                    ? 'from-blue-400 to-purple-500' 
                    : 'from-blue-600 to-purple-700'
                }`}>
                  {service.name}
                </h3>
                <p className={`mb-4 text-sm line-clamp-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.keywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className={`px-3 py-1 text-xs border rounded-full transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-blue-400 bg-blue-600/20 border-blue-500/30' 
                        : 'text-blue-600 bg-blue-100/80 border-blue-300/50'
                    }`}>
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link 
                  to={service.link}
                  className={`block w-full py-3 font-medium text-center transition-all duration-300 rounded-lg bg-gradient-to-r hover:opacity-90 hover:shadow-lg ${
                    isDarkMode 
                      ? 'from-blue-600 to-purple-600 text-white hover:shadow-blue-500/30' 
                      : 'from-blue-500 to-purple-500 text-white hover:shadow-blue-400/30'
                  }`}
                >
                  Explore Service →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-12 text-center text-gray-400 animate-fade-in">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl">No services found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
  
export default Services;
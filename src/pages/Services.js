// Services.js
import React, { useState, useEffect, useMemo } from 'react';

import { Link } from 'react-router-dom';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  
  const services = useMemo(() => [
    {
      name: "BBBP",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1728091897/DrugForge/qcttgx57dieseh2stckd.gif",
      keywords: ["Pharmacokinetics", "DrugClearance", "Bioavailability"],
      description: " Predicts a drug's ability to cross the Blood-Brain Barrier (BBB), crucial for developing treatments targeting the central nervous system (CNS).",
      link: "/bbbp"
    },
    {
      name: "BindingScore",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1727854809/DrugForge/ldbah8inrlc43wzpo7bb.gif",
      keywords: ["BindingScore", "DrugAffinity", "ReceptorBinding", "DrugEfficacy"],
      description: " Measures how strongly a drug binds to its target receptor, providing insights into drug efficacy.",
      link: "/binding-score"
    },
    {
      name: "COX2",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1728092338/DrugForge/vnfss3tcbt3v1ppanvnf.gif",
      keywords: ["Enzyme", "Inhibition", "Receptor", "DrugInteractions", "EnzymeInhibition"],
      description: " Evaluates how a drug inhibits the COX-2 enzyme, a key target in anti-inflammatory and pain-relief medications.",
      link: "/cox2"
    },
    {
      name: "HEPG2",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1728092875/DrugForge/l8zn8xed1xxkxfna2yde.webp",
      keywords: ["Hepatotoxicity", "LiverToxicity", "CellToxicity", "Toxicity"],
      description: " Predicts hepatotoxicity using HEPG2 liver cells, helping assess a drug's potential liver toxicity",
      link: "/hepg2"
    },
    {
      name: "CYP3A4Predictor",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1727855832/DrugForge/gp5zkyzu6yeerclllomf.gif",
      keywords: ["Metabolism", "CYP3A4", "DrugMetabolism", "Pharmacokinetics"],
      description: " Predicts a compound's effect on the CYP3A4 enzyme, crucial for understanding drug metabolism and potential drug-drug interactions",
      link: "/cyp3a4-predictor"
    },
    {
      name: "HalfLife",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1728092270/DrugForge/csmm0lnoesvfmhssti6z.gif",
      keywords: ["DrugClearance", "Pharmacokinetics", "DrugStability", "Metabolism"],
      description: " Estimates the half-life of a drug, indicating how long it remains active in the body, helping design dosing schedules.",
      link: "/half-life"
    },
    {
      name: "SolubilityChecker",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1728092453/DrugForge/gp95fb7p1icdgfwnlowi.gif",
      keywords: ["Solubility", "DrugSolubility", "Absorption", "Bioavailability"],
      description: "Description: Predicts a compound's solubility, which impacts its absorption and overall bioavailability in the body.",
      link: "/solubility-checker"
    },
    {
      name: "ACE2",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1727855098/DrugForge/ajlzbg8fldzkob1ynvrn.gif",
      keywords: ["ReceptorBinding", "Binding", "Interaction", "DrugAffinity"],
      description: " Evaluates the interaction between a drug and the ACE2 receptor, which is crucial for understanding its potential in treatments, especially for diseases like COVID-19.",
      link: "/ace2"
    },
    {
      name: "Toxicity",
      image: "https://res.cloudinary.com/dvude7m7p/image/upload/v1728092539/DrugForge/higve50ze2juwqjkbyxk.gif",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto"></div>
        {/* Header with animation */}
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
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
              className="w-full p-4 rounded-xl bg-gray-800/50 backdrop-blur-sm text-white 
                       border border-gray-700 focus:border-blue-500 focus:ring-2 
                       focus:ring-blue-500/50 transition-all duration-300"
            />
            <span className="absolute right-4 top-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Filters with smooth animation */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterToggle(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
                  ${selectedFilters.includes(filter)
                    ? 'bg-blue-600 shadow-lg shadow-blue-500/50 scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-700'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Service Grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.name} 
              className="group bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden 
                       hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 
                       transform hover:scale-[1.02]"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {service.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.keywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="text-xs bg-blue-600/20 border border-blue-500/30 
                                               px-3 py-1 rounded-full text-blue-400">
                      {keyword}
                    </span>
                  ))}
                </div>
                <Link 
                  to={service.link}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 
                           py-3 rounded-lg font-medium transition-all duration-300
                           hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Explore Service →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center text-gray-400 mt-12 animate-fade-in">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl">No services found matching your criteria</p>
          </div>
        )}
      </div>
  );
};
  
export default Services;
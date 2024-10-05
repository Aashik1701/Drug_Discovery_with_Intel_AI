// Services.js
import React, { useState, useEffect } from 'react';
import './Services.css';
import { Link } from 'react-router-dom';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  const services = [
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
  ];

  const filters = [
    "Pharmacokinetics", "Binding", "Interaction", "Toxicity", "Solubility", "HalfLife",
    "Metabolism", "Absorption", "CYP3A4", "COX2", "ACE2", "Receptor", "Enzyme", "Safety",
    "DrugAffinity", "Hepatotoxicity", "DrugClearance", "Bioavailability", "DrugStability",
    "DrugSolubility", "DrugMetabolism", "Inhibition", "LiverToxicity", "CellToxicity",
    "BindingScore", "DrugInteractions", "EnzymeInhibition", "ReceptorBinding", "DrugEfficacy", 
    "DrugToxicity"
  ];

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
    <div className="services">
      <h1>List of available bioinformatic tools and services.</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by service name or keyword (i.e: alphafold, docking, esm)"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-button ${selectedFilters.includes(filter) ? 'active' : ''}`}
              onClick={() => handleFilterToggle(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="service-list">
        <div className="service-grid">
          {filteredServices.map((service) => (
            <div key={service.name} className="service-item">
              <img src={service.image} alt={service.name} className="service-image" />
              <h4 className="service-name">{service.name}</h4>
              <div className="service-keywords">
                {service.keywords.map((keyword, index) => (
                  <span key={index} className="keyword">{keyword}</span>
                ))}
              </div>
              <p className="service-description">{service.description}</p>
              <Link to={service.link} className="service-link">
              <button>
                View Service
              </button>
              </Link>
            </div>
          ))}
        </div>
        {filteredServices.length === 0 && (
          <p className="no-results">No services found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
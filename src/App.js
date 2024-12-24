// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import Hero from './pages/Hero';
import Services from './pages/Services';
import Blog from './pages/Blog';
import RegisterPage from './pages/Register';
import Pricing from './pages/Pricing';

// Feature Components
import Dashboard from './components/Dashboard';
import ProfilePage from './components/Profile';
import Features from './components/Features';
import Contact from './components/contact';
import Chatbot from './components/Chatbot';

// Prediction Components
import SolubilityChecker from './components/SolubilityChecker';
import CYP3A4Predictor from './components/CYP3A4';
import HalfLife from './components/HalfLife';
import COX2 from './components/COX2';
import HEPG2 from './components/HEPG2';
import BBBP from './components/BBBP';
import BindingScore from './components/BindingScore';
import ACE2 from './components/ACE2';
import Toxicity from './components/Toxicity';

// Styles
import './index.css';

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <main>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          
          {/* User Pages */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Prediction Tools */}
          <Route path="/solubility-checker" element={<SolubilityChecker />} />
          <Route path="/cyp3a4-predictor" element={<CYP3A4Predictor />} />
          <Route path="/half-life" element={<HalfLife />} />
          <Route path="/cox2" element={<COX2 />} />
          <Route path="/hepg2" element={<HEPG2 />} />
          <Route path="/bbbp" element={<BBBP />} />
          <Route path="/binding-score" element={<BindingScore />} />
          <Route path="/ace2" element={<ACE2 />} />
          <Route path="/toxicity" element={<Toxicity />} />
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero.js';
import Services from './components/Services.js';
import Blog from './components/Blog.js';
import RegisterPage from './components/Register.js'; 
import Dashboard from './components/Dashboard.js';
import ProfilePage from './components/Profile.js';
import Features from './components/Features'; 
import Contact from './components/contact.js';
import Pricing from './components/Pricing.js';
import SolubilityChecker from './components/SolubilityChecker.js';
import CYP3A4Predictor from './components/CYP3A4.js';
import HalfLife from './components/HalfLife.js';
import COX2 from './components/COX2.js';
import HEPG2 from './components/HEPG2.js';
import BBBP from './components/BBBP.js';
import BindingScore from './components/BindingScore.js';
import ACE2 from './components/ACE2.js';
import Toxicity from './components/Toxicity.js';
import Chatbot from './components/Chatbot.js';

const App = () => (
  <div>
    <Header />
    <Hero />
    <main>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/features" element={<Features />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
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

export default App;
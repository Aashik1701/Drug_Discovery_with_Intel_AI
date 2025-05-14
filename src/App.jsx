// App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

// Test components
import TestComponent from './TestComponent.jsx';
import DebugComponent from './DebugComponent.jsx';

// Context Provider
import { DrugForgeProvider } from './context/DrugForgeContext.jsx';

// Layout Components - These are small and used on every page, so we don't lazy load them
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';
import Notifications from './components/Notifications.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ThemeProvider } from './components/ThemeProvider.jsx';

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
  </div>
);

// Lazy-loaded Page Components
const Hero = lazy(() => import('./pages/Hero.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const RegisterPage = lazy(() => import('./pages/Register.jsx'));
const SignInPage = lazy(() => import('./pages/SignIn.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));

// Lazy-loaded Feature Components
const Dashboard = lazy(() => import('./components/Dashboard.jsx'));
const ProfilePage = lazy(() => import('./components/Profile.jsx'));
const Features = lazy(() => import('./components/Features.jsx'));
const Contact = lazy(() => import('./components/contact.jsx'));

// Lazy-loaded Prediction Components
const SolubilityChecker = lazy(() => import('./components/SolubilityChecker.jsx'));
const CYP3A4Predictor = lazy(() => import('./components/CYP3A4.jsx'));
const HalfLife = lazy(() => import('./components/HalfLife.jsx'));
const COX2 = lazy(() => import('./components/COX2.jsx'));
const HEPG2 = lazy(() => import('./components/HEPG2.jsx'));
const BBBP = lazy(() => import('./components/BBBP.jsx'));
const BindingScore = lazy(() => import('./components/BindingScore.jsx'));
const ACE2 = lazy(() => import('./components/ACE2.jsx'));
const Toxicity = lazy(() => import('./components/Toxicity.jsx'));
const VirtualScreening = lazy(() => import('./components/VirtualScreening.jsx'));



const App = () => {
  return (
    <DrugForgeProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <div>
            <Header />
            <Notifications />
            <main className="pt-16">
              {/* Test Component to check if rendering works */}
              {/* <TestComponent />
              <DebugComponent /> */}
              
              <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Hero />} />
                <Route path="/features" element={<Features />} />
                <Route path="/blog" className="pt-16" element={<Blog />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                
                {/* User Pages */}
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/signin" element={<SignInPage />} />
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
                <Route path="/virtual-screening" element={<VirtualScreening />} />
              </Routes>
              </Suspense>
            </main>
            <Chatbot />
            <Footer />
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </DrugForgeProvider>
  );
};

export default App;

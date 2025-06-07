// App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

// Context Providers
import { DrugForgeProvider } from './context/DrugForgeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Layout Components - These are small and used on every page, so we don't lazy load them
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Chatbot from './components/Chatbot.jsx';
import Notifications from './components/Notifications.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ThemeProvider } from './components/ThemeProvider.jsx';

// Loading fallback - exported for use in other components
export const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
  </div>
);

// Import Protected Route Component
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Lazy-loaded Page Components
const Hero = lazy(() => import('./pages/Hero.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const RegisterPage = lazy(() => import('./pages/Register.jsx'));
const SignInPage = lazy(() => import('./pages/SignIn.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

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
    <ErrorBoundary>
      <AuthProvider>
        <DrugForgeProvider>
          <ThemeProvider>
            <div className="flex flex-col min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-gray-100">
              <Header />
              <Notifications />
              <main className="flex-grow pt-16">
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {/* Main Pages */}
                    <Route path="/" element={<Hero />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/pricing" element={<Pricing />} />
                    
                    {/* Public User Pages */}
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Prediction Tools - No login required */}
                    <Route path="/profile" element={<ProfilePage />} />
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


                    {/* Not Found Page */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Chatbot />
              <Footer />
            </div>
          </ThemeProvider>
        </DrugForgeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;

// // App.js
// import React, { Suspense, lazy } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import './index.css';

// // Context Providers
// import { DrugForgeProvider } from './context/DrugForgeContext.jsx';
// import { AuthProvider } from './context/AuthContext.jsx';

// // Layout Components - These are small and used on every page, so we don't lazy load them
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Chatbot from './components/Chatbot.jsx';
// import Notifications from './components/Notifications.jsx';
// import ErrorBoundary from './components/ErrorBoundary.jsx';
// import { ThemeProvider } from './components/ThemeProvider.jsx';

// // Loading fallback - exported for use in other components
// export const LoadingFallback = () => (
//   <div className="flex items-center justify-center min-h-screen">
//     <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
//   </div>
// );

// // Import Protected Route Component
// import ProtectedRoute from './components/ProtectedRoute.jsx';

// // Lazy-loaded Page Components
// const Hero = lazy(() => import('./pages/Hero.jsx'));
// const Services = lazy(() => import('./pages/Services.jsx'));
// const Blog = lazy(() => import('./pages/Blog.jsx'));
// const RegisterPage = lazy(() => import('./pages/Register.jsx'));
// const SignInPage = lazy(() => import('./pages/SignIn.jsx'));
// const Pricing = lazy(() => import('./pages/Pricing.jsx'));
// const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// // Lazy-loaded Feature Components
// const Dashboard = lazy(() => import('./components/Dashboard.jsx'));
// const ProfilePage = lazy(() => import('./components/Profile.jsx'));
// const Features = lazy(() => import('./components/Features.jsx'));
// const Contact = lazy(() => import('./components/contact.jsx'));

// // Lazy-loaded Prediction Components
// const SolubilityChecker = lazy(() => import('./components/SolubilityChecker.jsx'));
// const CYP3A4Predictor = lazy(() => import('./components/CYP3A4.jsx'));
// const HalfLife = lazy(() => import('./components/HalfLife.jsx'));
// const COX2 = lazy(() => import('./components/COX2.jsx'));
// const HEPG2 = lazy(() => import('./components/HEPG2.jsx'));
// const BBBP = lazy(() => import('./components/BBBP.jsx'));
// const BindingScore = lazy(() => import('./components/BindingScore.jsx'));
// const ACE2 = lazy(() => import('./components/ACE2.jsx'));
// const Toxicity = lazy(() => import('./components/Toxicity.jsx'));
// const VirtualScreening = lazy(() => import('./components/VirtualScreening.jsx'));

// const App = () => {
//   return (
//     <ErrorBoundary>
//       <AuthProvider>
//         <DrugForgeProvider>
//           <ThemeProvider>
//             <div className="flex flex-col min-h-screen">
//               <Header />
//               <Notifications />
//               <main className="flex-grow pt-16">
//                 <Suspense fallback={<LoadingFallback />}>
//                   <Routes>
//                     {/* Main Pages */}
//                     <Route path="/" element={<Hero />} />
//                     <Route path="/features" element={<Features />} />
//                     <Route path="/blog" element={<Blog />} />
//                     <Route path="/services" element={<Services />} />
//                     <Route path="/pricing" element={<Pricing />} />
                    
//                     {/* Public User Pages */}
//                     <Route path="/register" element={<RegisterPage />} />
//                     <Route path="/signin" element={<SignInPage />} />
//                     <Route path="/contact" element={<Contact />} />
                    
//                     {/* Protected User Pages */}
//                     <Route path="/profile" element={
//                       <ProtectedRoute>
//                         <ProfilePage />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/dashboard" element={
//                       <ProtectedRoute>
//                         <Dashboard />
//                       </ProtectedRoute>
//                     } />
                    
//                     {/* Protected Prediction Tools */}
//                     <Route path="/solubility-checker" element={
//                       <ProtectedRoute>
//                         <SolubilityChecker />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/cyp3a4-predictor" element={
//                       <ProtectedRoute>
//                         <CYP3A4Predictor />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/half-life" element={
//                       <ProtectedRoute>
//                         <HalfLife />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/cox2" element={
//                       <ProtectedRoute>
//                         <COX2 />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/hepg2" element={
//                       <ProtectedRoute>
//                         <HEPG2 />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/bbbp" element={
//                       <ProtectedRoute>
//                         <BBBP />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/binding-score" element={
//                       <ProtectedRoute>
//                         <BindingScore />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/ace2" element={
//                       <ProtectedRoute>
//                         <ACE2 />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/toxicity" element={
//                       <ProtectedRoute>
//                         <Toxicity />
//                       </ProtectedRoute>
//                     } />
//                     <Route path="/virtual-screening" element={
//                       <ProtectedRoute>
//                         <VirtualScreening />
//                       </ProtectedRoute>
//                     } />
                    
//                     {/* Not Found Page */}
//                     <Route path="*" element={<NotFound />} />
//                   </Routes>
//                 </Suspense>
//               </main>
//               <Chatbot />
//               <Footer />
//             </div>
//           </ThemeProvider>
//         </DrugForgeProvider>
//       </AuthProvider>
//     </ErrorBoundary>
//   );
// };

// export default App;

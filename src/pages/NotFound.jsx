import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFound - 404 page component
 * Displays when users navigate to non-existent routes
 */
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <div className="w-24 h-24 mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500 w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            to="/services" 
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-md transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
      
      <div className="mt-16">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Looking for something specific?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <h4 className="font-medium text-blue-600 mb-2">Drug Predictions</h4>
            <p className="text-gray-600 mb-2">Try our solubility or toxicity prediction tools</p>
            <Link to="/solubility-checker" className="text-blue-600 hover:underline">
              Try Solubility Checker
            </Link>
          </div>
          <div className="p-4">
            <h4 className="font-medium text-blue-600 mb-2">Documentation</h4>
            <p className="text-gray-600 mb-2">Learn how to use our platform effectively</p>
            <Link to="/blog" className="text-blue-600 hover:underline">
              Read Our Blog
            </Link>
          </div>
          <div className="p-4">
            <h4 className="font-medium text-blue-600 mb-2">Help & Support</h4>
            <p className="text-gray-600 mb-2">Get assistance with technical issues</p>
            <Link to="/contact" className="text-blue-600 hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

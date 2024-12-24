// Header.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [setIsMenuHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-sm shadow-lg shadow-blue-500/10 transition-all duration-300 ease-in-out z-[1000]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 transition-all duration-300">
            DrugForge
          </Link>
        </div>

        {/* Navigation Links */}
        <nav 
          className="hidden md:block"
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={() => setIsMenuHovered(false)}
        >
          <ul className="flex space-x-8">
            {[
              { path: '/services', label: 'Services' },
              { path: '/blog', label: 'Blogs' },
              { path: '/features', label: 'Features' },
              { path: '/contact', label: 'Contact' },
              { path: '/pricing', label: 'Pricing' }
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 
                    ${location.pathname === item.path 
                      ? 'text-blue-400' 
                      : 'text-gray-300 hover:text-white'
                    }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transform origin-left scale-x-100 transition-transform duration-300" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/signin"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
          >
            Sign In
          </Link>
          
          <Link 
            to="/profile"
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
            <span>Profile</span>
          </Link>

          <Link 
            to="/dashboard"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
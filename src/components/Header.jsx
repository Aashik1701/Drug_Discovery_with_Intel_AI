// Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeProvider.jsx';

const Header = () => {
  const location = useLocation();
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm shadow-md dark:shadow-lg dark:shadow-blue-500/10 transition-all duration-300 ease-in-out z-[1000]">
      <div className="flex items-center justify-between px-8 py-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="transition-transform duration-300 transform hover:scale-105">
          <Link to="/" className="text-2xl font-bold text-transparent transition-all duration-300 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700">
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
              // { path: '/blog', label: 'Blogs' },
              { path: '/features', label: 'Features' },
              { path: '/contact', label: 'Contact' },
              { path: '/pricing', label: 'Pricing' },
              // { path: '/theme-demo', label: 'Theme Demo' }
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 
                    ${location.pathname === item.path 
                      ? 'text-blue-400 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-white'
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

        {/* Auth Buttons and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <Link 
            to="/signin"
            className="px-4 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-white"
          >
            Sign In
          </Link>
          
          <Link 
            to="/profile"
            className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
            <span>Profile</span>
          </Link>

          <Link 
            to="/dashboard"
            className="px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-300 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
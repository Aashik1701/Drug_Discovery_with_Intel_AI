import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-300 bg-gradient-to-b from-gray-900 to-black">
      {/* Main Footer Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* DrugForge Section */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text">
              DrugForge
            </h4>
            <p className="max-w-xs text-sm text-gray-400">
              Pioneering the future of drug discovery through innovative AI-powered solutions and advanced molecular modelling.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 transition-colors hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/target-identification" className="text-gray-400 transition-colors hover:text-blue-400">
                  Target Identification
                </Link>
              </li>
              <li>
                <Link to="/drug-properties-prediction" className="text-gray-400 transition-colors hover:text-blue-400">
                  Drug Properties Prediction
                </Link>
              </li>
              <li>
                <Link to="/virtual-screening" className="text-gray-400 transition-colors hover:text-blue-400">
                  Virtual Screening
                </Link>
              </li>
              <li>
                <Link to="/molecular-docking" className="text-gray-400 transition-colors hover:text-blue-400">
                  Molecular Docking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@drugforge.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+91 6382143070</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Chennai, Tamil Nadu, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.twitter.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-blue-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-blue-700">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-pink-600">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Stay updated with our latest developments and breakthroughs
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} DrugForge. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 transition-colors hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 transition-colors hover:text-blue-400">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 transition-colors hover:text-blue-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

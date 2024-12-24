import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* DrugForge Section */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              DrugForge
            </h4>
            <p className="text-sm text-gray-400 max-w-xs">
              Pioneering the future of drug discovery through innovative AI-powered solutions and advanced molecular modelling.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/target-identification" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Target Identification
                </Link>
              </li>
              <li>
                <Link to="/drug-properties-prediction" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Drug Properties Prediction
                </Link>
              </li>
              <li>
                <Link to="/virtual-screening" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Virtual Screening
                </Link>
              </li>
              <li>
                <Link to="/molecular-docking" className="text-gray-400 hover:text-blue-400 transition-colors">
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
                <Mail className="h-5 w-5 text-blue-400" />
                <span>info@drugforge.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+91 6382143070</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
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
                 className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.twitter.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 bg-gray-800 rounded-full hover:bg-blue-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors">
                <Instagram className="h-5 w-5" />
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
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} DrugForge. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
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

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * GlassLayout wraps /app/* routes with the floating Sidebar + inner Header.
 * The Sidebar is fixed-left; the content area is offset to its right.
 */
const GlassLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content area — offset by sidebar width + gap */}
      <div className="flex-1 ml-28 md:ml-72 pr-6 py-6 transition-all duration-300">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default GlassLayout;

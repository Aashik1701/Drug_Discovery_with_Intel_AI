import React from 'react';
import { useDrugForge } from '../../context/DrugForgeContext';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * GlassLayout wraps /app/* routes with the floating Sidebar + inner Header.
 * The Sidebar is fixed-left; the content area margin adjusts when sidebar collapses.
 */
const GlassLayout = ({ children }) => {
  const { isSidebarCollapsed } = useDrugForge();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content area — margin responds to collapsed state */}
      <div
        className={`flex-1 pr-6 py-6 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-28' : 'ml-28 md:ml-72'
        }`}
      >
        <Header />
        <div className="h-[calc(100vh-100px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassLayout;

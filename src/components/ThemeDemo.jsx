import React from 'react';
import { ThemeToggle } from './ThemeProvider';
import { useDrugForge } from '../context/DrugForgeContext';

/**
 * Component to demonstrate the theme system
 */
const ThemeDemo = () => {
  const { state } = useDrugForge();
  const { theme } = state;

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Theme System Demo</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Currently using the <strong>{theme}</strong> theme
        </p>
        
        <div className="flex items-center justify-center mt-4 space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Toggle theme:</span>
          <ThemeToggle />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Color Palette */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Color Palette</h2>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-primary-500 rounded"></div>
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Primary</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-8 bg-secondary-500 rounded"></div>
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Secondary</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Gray (Light/Dark)</span>
            </div>
          </div>
        </section>
        
        {/* UI Elements */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">UI Elements</h2>
          
          <div className="space-y-4">
            <button className="px-4 py-2 text-white bg-primary-500 rounded hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500 transition-colors">
              Primary Button
            </button>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Input Field</label>
              <input 
                type="text" 
                placeholder="Sample input" 
                className="w-full px-3 py-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            
            <div className="p-3 text-sm text-blue-800 bg-blue-100 border border-blue-200 rounded dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800">
              This is an alert component that adapts to the current theme
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThemeDemo;

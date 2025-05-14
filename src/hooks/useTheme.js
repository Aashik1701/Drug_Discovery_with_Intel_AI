// Custom hook for theme management
import { useEffect } from 'react';
import { useDrugForge } from '../context/DrugForgeContext';

/**
 * Custom hook for managing theme settings
 */
export const useTheme = () => {
  const { state, setTheme } = useDrugForge();
  const { theme } = state;
  
  // Apply theme changes to the document
  useEffect(() => {
    // Remove any existing theme classes
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    
    // Add the current theme class
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Set data-theme attribute for Tailwind
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update the meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        theme === 'dark' ? '#1f2937' : '#ffffff'
      );
    }
  }, [theme]);
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  };
};

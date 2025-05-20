// Custom hook for theme management
import { useDrugForge } from '../context/DrugForgeContext.jsx';

/**
 * Custom hook for managing theme settings
 * This is a simple wrapper around the DrugForge context
 * to provide a convenient API for theme management
 */
export const useTheme = () => {
  const { state, setTheme } = useDrugForge();
  const { theme } = state;
  
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

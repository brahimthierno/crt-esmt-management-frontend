import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 transition-all duration-200"
      aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      {isDarkMode ? (
        <>
          <Sun className="w-4 h-4 text-yellow-500" />
          <span className="text-sm hidden sm:block dark:text-gray-200">Clair</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-gray-600" />
          <span className="text-sm hidden sm:block text-gray-700">Sombre</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
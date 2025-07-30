import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();


  
  // useEffect(()=>{
  //   const handleKey = (e:KeyboardEvent)=> {
  //     if (e.key === 't') toggleTheme();
  //   }
  //   window.addEventListener('keydown',handleKey)
  //   return () => window.removeEventListener('keydown', handleKey);
  // },[toggleTheme])
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
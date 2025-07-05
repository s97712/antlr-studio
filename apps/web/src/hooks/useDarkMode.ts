import { useState, useEffect } from 'react';

/**
 * A custom React Hook to manage and toggle the application's light/dark theme.
 * It synchronizes the current mode to a class on `document.body` and persists the preference in localStorage.
 * @returns {[boolean, () => void]} A tuple containing:
 * - `isDarkMode` (boolean): Whether the dark mode is currently active.
 * - `toggleDarkMode` (function): A function to toggle the theme.
 */
export const useDarkMode = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedPreference = window.localStorage.getItem('theme');
    if (storedPreference) {
      return storedPreference === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Only change if there's no stored preference
      if (!window.localStorage.getItem('theme')) {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      window.localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return [isDarkMode, toggleDarkMode];
};
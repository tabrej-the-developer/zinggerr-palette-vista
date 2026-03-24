import React, { createContext, useContext, useState, useEffect } from 'react';

export const themes: ThemeOption[] = [
  { name: 'ocean-blue', label: 'Ocean Blue', primary: '#6C8CFF', secondary: '#22D3EE' },
  { name: 'royal-violet', label: 'Royal Violet', primary: '#8B5CF6', secondary: '#A78BFA' },
  { name: 'sunset-pink', label: 'Sunset Pink', primary: '#F472B6', secondary: '#FB7185' },
  { name: 'mint-green', label: 'Mint Green', primary: '#34D399', secondary: '#6EE7B7' },
  { name: 'dark-elegant', label: 'Dark Elegant', primary: '#6C8CFF', secondary: '#22D3EE' },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => (localStorage.getItem('zinggerr-theme')) || 'ocean-blue'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zinggerr-theme', theme);
  }, [theme]);

  const currentTheme = themes.find(t => t.name === theme) || themes[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

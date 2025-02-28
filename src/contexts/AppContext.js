import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const defaultContextValue = {
  theme: 'dark',
  reducedMotion: false,
  toggleTheme: () => {},
  toggleReducedMotion: () => {}
};

const AppContext = createContext(defaultContextValue);

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [reducedMotion, setReducedMotion] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setReducedMotion(prev => !prev);
  }, []);

  const value = {
    theme,
    reducedMotion,
    toggleTheme,
    toggleReducedMotion
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    // console.warn('useApp must be used within an AppProvider');
    return defaultContextValue;
  }
  return context;
};

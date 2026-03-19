import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext({});

export const themes = {
  dark: {
    background: '#09090b',
    card: '#18181b', 
    cardTranslucent: 'rgba(24, 24, 27, 0.95)',
    text: '#f4f4f5',
    subText: '#a1a1aa',
    border: 'rgba(255,255,255,0.05)',
    primary: '#34d399',
    danger: '#f43f5e',
    tabBarInactive: '#52525b',
    buttonActive: 'rgba(52, 211, 153, 0.1)',
    overlay: 'rgba(0,0,0,0.85)',
    skeleton: 'rgba(255,255,255,0.1)',
  },
  light: {
    background: '#f8fafc',
    card: '#ffffff',
    cardTranslucent: 'rgba(255, 255, 255, 0.95)',
    text: '#0f172a',
    subText: '#64748b',
    border: 'rgba(0,0,0,0.05)',
    primary: '#059669',
    danger: '#e11d48',
    tabBarInactive: '#94a3b8',
    buttonActive: 'rgba(5, 150, 105, 0.1)',
    overlay: 'rgba(0,0,0,0.4)',
    skeleton: 'rgba(0,0,0,0.05)',
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('@financeApp:theme').then(savedTheme => {
      if (savedTheme === 'light') setIsDark(false);
    });
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('@financeApp:theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

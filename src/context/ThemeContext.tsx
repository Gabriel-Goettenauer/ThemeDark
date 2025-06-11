import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';

interface ColorPalette {
  backgroundColor: string;
  textColor: string;
  primaryButtonColor: string;
  primaryButtonTextColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
}

interface ThemeContextType {
  themeName: 'light' | 'dark';
  currentTheme: ColorPalette;
  toggleTheme: () => void;
}

export const lightTheme: ColorPalette = {
  backgroundColor: '#F8F8F8', //testar cor para FFFF00
  textColor: '#333333',
  primaryButtonColor: '#007AFF',
  primaryButtonTextColor: '#FFFFFF',
  headerBackgroundColor: '#FFFFFF',
  headerTextColor: '#333333',
};

export const darkTheme: ColorPalette = {
  backgroundColor: '#121212', //testar tb cor para 800080
  textColor: '#E0E0E0',
  primaryButtonColor: '#BB86FC',
  primaryButtonTextColor: '#000000',
  headerBackgroundColor: '#1E1E1E',
  headerTextColor: '#E0E0E0',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const currentTheme = themeName === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme) {
      setThemeName(colorScheme);
    }

    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      if (newColorScheme) {
        setThemeName(newColorScheme);
      }
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setThemeName(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeName, currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
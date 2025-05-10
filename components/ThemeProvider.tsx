// components/ThemeProvider.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../constants/theme';

// Storage key for constrained view setting
const CONSTRAINED_VIEW_KEY = 'qep_constrained_view';

// Define the theme context type
type ThemeContextType = {
  colorScheme: 'dark';
  isDark: true;
  colors: typeof theme.colors.dark;
  spacing: typeof theme.spacing;
  fontSize: typeof theme.fontSize;
  borderRadius: typeof theme.borderRadius;
  // Add constrained view related properties
  constrainedView: boolean;
  toggleConstrainedView: () => void;
};

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme
export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
}

// ThemeProvider component
type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  // State for constrained view
  const [constrainedView, setConstrainedView] = useState(true); // Default to true

  // Load constrained view setting on mount
  useEffect(() => {
    const loadConstrainedViewSetting = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(CONSTRAINED_VIEW_KEY);
        if (storedValue !== null) {
          setConstrainedView(storedValue === 'true');
        }
      } catch (error) {
        console.error('Error loading constrained view setting:', error);
      }
    };

    loadConstrainedViewSetting();
  }, []);

  // Toggle constrained view setting
  const toggleConstrainedView = async () => {
    const newValue = !constrainedView;
    setConstrainedView(newValue);
    try {
      await AsyncStorage.setItem(CONSTRAINED_VIEW_KEY, String(newValue));
    } catch (error) {
      console.error('Error saving constrained view setting:', error);
    }
  };

  // Always use dark theme
  const themeValue: ThemeContextType = {
    colorScheme: 'dark',
    isDark: true,
    colors: theme.colors.dark,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    borderRadius: theme.borderRadius,
    constrainedView,
    toggleConstrainedView
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
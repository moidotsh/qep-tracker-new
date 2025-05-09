// components/ThemeProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { theme } from '../constants/theme';

// Define the theme context type
type ThemeContextType = {
  colorScheme: 'dark';
  isDark: true;
  colors: typeof theme.colors.dark;
  spacing: typeof theme.spacing;
  fontSize: typeof theme.fontSize;
  borderRadius: typeof theme.borderRadius;
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
  // Always use dark theme
  const themeValue: ThemeContextType = {
    colorScheme: 'dark',
    isDark: true,
    colors: theme.colors.dark,
    spacing: theme.spacing,
    fontSize: theme.fontSize,
    borderRadius: theme.borderRadius
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
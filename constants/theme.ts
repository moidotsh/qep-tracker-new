// constants/theme.ts
export const theme = {
  // Color system
  colors: {
    dark: {
      // UI Element colors
      background: '#121212',
      backgroundAlt: '#222222',
      card: '#222222',
      cardAlt: '#333333',
      border: '#444444',
      
      // Text colors
      text: '#FFFFFF',
      textMuted: '#AAAAAA',
      textSecondary: '#CCCCCC',
      
      // Interactive element colors
      buttonBackground: '#0A84FF',
      buttonBackgroundDisabled: '#0A84FF80', // 50% opacity
      
      // Additional colors from original
      success: '#4CAF50',
      alert: '#FF3B30',
    }
  },
  
  // Spacing system
  spacing: {
    xxs: 2,    // Added very small spacing
    xs: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48,
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    small: 14,
    medium: 16,
    large: 18,
    xlarge: 24,
    xxlarge: 32
  },

  // Border radius
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    pill: 9999
  }
};
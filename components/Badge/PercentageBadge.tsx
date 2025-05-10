// components/Badges/PercentageBadge.tsx
import React from 'react';
import { View, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface PercentageBadgeProps {
  /**
   * The percentage value to display (0-100)
   */
  percentage: number;
  
  /**
   * Size of the badge
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether to colorize based on percentage
   */
  colorize?: boolean;
  
  /**
   * Whether to show the % symbol
   */
  showSymbol?: boolean;
}

/**
 * A badge component for displaying percentages
 */
export function PercentageBadge({
  percentage,
  size = 'medium',
  colorize = true,
  showSymbol = true
}: PercentageBadgeProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Ensure percentage is within bounds
  const safePercentage = Math.max(0, Math.min(100, percentage));
  
  // Get background color based on percentage
  const getBackgroundColor = () => {
    if (!colorize) return colors.buttonBackground;
    
    if (safePercentage < 25) return '#FF5252'; // Red
    if (safePercentage < 50) return '#FFC107'; // Yellow
    if (safePercentage < 75) return '#2196F3'; // Blue
    return '#4CAF50'; // Green
  };
  
  // Get font size based on size prop
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return fontSize.xs;
      case 'large':
        return fontSize.medium;
      default: // medium
        return fontSize.small;
    }
  };
  
  // Get padding based on size prop
  const getPadding = () => {
    switch (size) {
      case 'small':
        return spacing.xs;
      case 'large':
        return spacing.medium;
      default: // medium
        return spacing.small;
    }
  };
  
  return (
    <View
      backgroundColor={getBackgroundColor()}
      paddingHorizontal={getPadding()}
      paddingVertical={size === 'small' ? 2 : 4}
      borderRadius={20}
    >
      <Text
        color="white"
        fontSize={getFontSize()}
        fontWeight="600"
        textAlign="center"
      >
        {safePercentage}{showSymbol ? '%' : ''}
      </Text>
    </View>
  );
}

export default PercentageBadge;
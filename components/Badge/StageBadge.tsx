// components/Badge/StageBadge.tsx
import React from 'react';
import { View, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface StageBadgeProps {
  stageName: string;
  type?: 'primary' | 'success' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
}

export default function StageBadge({
  stageName,
  type = 'primary',
  size = 'medium'
}: StageBadgeProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Get background color based on type
  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.alert;
      case 'info':
        return colors.cardAlt;
      default: // primary - use exact #0A84FF from design
        return '#0A84FF';
    }
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
        return { horizontal: spacing.small, vertical: 2 };
      case 'large':
        return { horizontal: spacing.large, vertical: 8 };
      default: // medium
        return { horizontal: spacing.medium, vertical: 6 };
    }
  };
  
  const { horizontal: paddingHorizontal, vertical: paddingVertical } = getPadding();
  
  return (
    <View
      backgroundColor={getBackgroundColor()}
      paddingHorizontal={paddingHorizontal}
      paddingVertical={paddingVertical}
      borderRadius={30} // More rounded corners to match design
    >
      <Text
        color="white"
        fontSize={getFontSize()}
        fontWeight="600"
        textAlign="center"
      >
        {stageName}
      </Text>
    </View>
  );
}
// components/Stats/StatIconCard.tsx
import React from 'react';
import { XStack, YStack, Text, Circle } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface StatIconCardProps {
  /**
   * Stat value to display
   */
  value: string | number;
  
  /**
   * Stat label
   */
  label: string;
  
  /**
   * Icon to display
   */
  icon: React.ReactNode;
  
  /**
   * Whether component is in loading state
   */
  loading?: boolean;
  
  /**
   * Additional content below the value
   */
  subtext?: string;
  
  /**
   * Unit for the value (optional)
   */
  unit?: string;
  
  /**
   * Additional bottom margin
   */
  marginBottom?: number | string;
}

/**
 * A card that displays a stat with an icon
 */
export default function StatIconCard({
  value,
  label,
  icon,
  loading = false,
  subtext,
  unit,
  marginBottom
}: StatIconCardProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Clone the icon to add the right color and size
  const iconElement = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ size?: number; color?: string }>, {
        size: 24,
        color: colors.text
      })
    : null;
  
  return (
    <XStack 
      alignItems="center" 
      space={spacing.medium}
      paddingVertical={spacing.medium}
      marginBottom={marginBottom}
    >
      <Circle 
        size={50} 
        backgroundColor="#222222"
      >
        {iconElement}
      </Circle>
      
      <YStack>
        <Text 
          color={colors.textMuted} 
          fontSize={fontSize.medium}
        >
          {label}
        </Text>
        
        <XStack alignItems="baseline" space={4} marginTop={4}>
          <Text 
            color={colors.text} 
            fontSize={fontSize.xlarge}
            fontWeight="700"
          >
            {loading ? '...' : value}
          </Text>
          
          {unit && (
            <Text 
              color={colors.textMuted}
              fontSize={fontSize.medium}
            >
              {unit}
            </Text>
          )}
        </XStack>
        
        {subtext && (
          <Text
            color={colors.textSecondary}
            fontSize={fontSize.small}
            marginTop={4}
          >
            {subtext}
          </Text>
        )}
      </YStack>
    </XStack>
  );
}
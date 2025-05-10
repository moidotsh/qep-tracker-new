// components/Stats/StreakDisplay.tsx
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { Zap } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';

interface StreakDisplayProps {
  /**
   * The streak value as a string (e.g., "5 day streak")
   */
  streak: string;
  
  /**
   * Whether the component is in a loading state
   */
  loading?: boolean;
  
  /**
   * Icon to display instead of the default Zap icon
   */
  icon?: React.ReactNode;
  
  /**
   * Size of the component: compact or regular
   */
  size?: 'compact' | 'regular';
}

/**
 * A component for displaying the user's current streak
 */
export function StreakDisplay({
  streak,
  loading = false,
  icon,
  size = 'regular'
}: StreakDisplayProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Adapt styling based on size
  const isCompact = size === 'compact';
  
  return (
    <XStack 
      alignItems="center" 
      space={isCompact ? spacing.xs : spacing.small}
      opacity={loading ? 0.7 : 1}
    >
      {icon || <Zap size={isCompact ? 16 : 20} color={colors.textMuted} />}
      
      <Text
        color={colors.textMuted}
        fontSize={isCompact ? fontSize.xs : fontSize.small}
        fontWeight={300}
      >
        {loading ? '...' : streak}
      </Text>
    </XStack>
  );
}

export default StreakDisplay;
// components/Stats/StatSummary.tsx
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface StatItem {
  /**
   * Label for the stat
   */
  label: string;
  
  /**
   * Value to display (string or number)
   */
  value: string | number;
  
  /**
   * Optional unit to display (e.g., "h", "%")
   */
  unit?: string;
  
  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;
}

interface StatSummaryProps {
  /**
   * Array of stats to display
   */
  stats: StatItem[];
  
  /**
   * Number of columns to display
   */
  columns?: 2 | 3 | 4;
  
  /**
   * Size of the stats
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether the component is in a loading state
   */
  loading?: boolean;
}

/**
 * A component for displaying a row of stats
 */
export function StatSummary({
  stats,
  columns = 3,
  size = 'medium',
  loading = false
}: StatSummaryProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Get font sizes based on size prop
  const getFontSizes = () => {
    switch (size) {
      case 'small':
        return {
          label: fontSize.xs,
          value: fontSize.small
        };
      case 'large':
        return {
          label: fontSize.medium,
          value: fontSize.large
        };
      default: // medium
        return {
          label: fontSize.small,
          value: fontSize.medium
        };
    }
  };
  
  const { label: labelSize, value: valueSize } = getFontSizes();
  
  return (
    <XStack justifyContent="space-between" width="100%">
      {stats.map((stat, index) => (
        <YStack key={index} alignItems="center" flex={1}>
          {/* Label */}
          <Text
            color={colors.textSecondary}
            fontSize={labelSize}
            fontWeight="300"
            style={{ letterSpacing: 0.5 }}
          >
            {stat.label}
          </Text>
          
          {/* Value */}
          <XStack alignItems="center" space={4}>
            {loading ? (
              <Text
                color={colors.text}
                fontSize={valueSize}
                fontWeight="600"
              >
                ...
              </Text>
            ) : (
              <>
                {stat.icon && <YStack marginRight={spacing.xs}>{stat.icon}</YStack>}
                
                <Text
                  color={colors.text}
                  fontSize={valueSize}
                  fontWeight="600"
                >
                  {stat.value}
                </Text>
                
                {stat.unit && (
                  <Text
                    color={colors.textMuted}
                    fontSize={valueSize}
                    fontWeight="500"
                  >
                    {stat.unit}
                  </Text>
                )}
              </>
            )}
          </XStack>
        </YStack>
      ))}
    </XStack>
  );
}

export default StatSummary;
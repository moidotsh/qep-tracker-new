// components/Stats/StatSummary.tsx
import React from 'react';
import { XStack, YStack, Text, Card } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface StatItem {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
}

interface StatSummaryProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export default function StatSummary({
  stats,
  columns = 3,
  size = 'medium',
  loading = false
}: StatSummaryProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
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
    <Card
      backgroundColor={colors.card}
      padding={spacing.large}
      borderRadius={borderRadius.medium}
      marginTop={spacing.xxs}
      marginBottom={spacing.medium}
      elevate
    >
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
    </Card>
  );
}
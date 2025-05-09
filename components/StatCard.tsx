// components/StatCard.tsx
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface StatCardProps {
  stats: Array<{
    label: string;
    value: string | number;
  }>;
  marginTop?: number;
  marginBottom?: number;
}

export function StatCard({ stats, marginTop, marginBottom }: StatCardProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  return (
    <YStack
      backgroundColor={colors.card}
      padding={spacing.large}
      borderRadius={borderRadius.medium}
      marginTop={marginTop}
      marginBottom={marginBottom}
      width="100%"
    >
      <XStack justifyContent="space-between" width="100%">
        {stats.map((stat, index) => (
          <YStack key={index} alignItems="center">
            <Text
              color={colors.textMuted}
              fontSize={fontSize.small}
              fontWeight="300"
              style={{ letterSpacing: 0.5 }}
            >
              {stat.label}
            </Text>
            <Text
              color={colors.text}
              fontSize={fontSize.medium}
              fontWeight="600"
              marginTop={spacing.xs}
            >
              {stat.value}
            </Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
}
// components/Home/HourTrackerCard.tsx
import React from 'react';
import { XStack, YStack, Card, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import HourTrackerGridPreview from '../HourTracker/HourTrackerGridPreview';
import { navigateToLogSession } from '../../navigation/NavigationHelper';

interface HourTrackerCardProps {
  stageName: string;
  percentage: number;
  onShowFullGrid: () => void;
}

export function HourTrackerCard({ stageName, percentage, onShowFullGrid }: HourTrackerCardProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();

  return (
    <Card
      backgroundColor={colors.card}
      borderRadius={borderRadius.medium}
      marginTop={spacing.xxs}
      marginBottom={spacing.large}
      paddingHorizontal={spacing.large}
      paddingVertical={spacing.large}
      elevate
    >
      {/* Title */}
      <Text
        color={colors.text}
        fontSize={fontSize.medium}
        fontWeight="600"
        marginBottom={spacing.small}
      >
        Hour Tracker Grid
      </Text>

      {/* Subtitle Row - with dynamic stage and percentage */}
      <XStack justifyContent="space-between" alignItems="center" marginBottom={spacing.small}>
        <Text
          color={colors.textSecondary}
          fontSize={fontSize.small}
          fontWeight="300"
        >
          Current Stage: {stageName}
        </Text>
        <Text
          color={colors.text}
          fontSize={fontSize.small}
          fontWeight="500"
        >
          {percentage}%
        </Text>
      </XStack>

      <HourTrackerGridPreview
        onLogSession={() => navigateToLogSession()}
        onShowFullGrid={onShowFullGrid}
      />
    </Card>
  );
}

export default HourTrackerCard;
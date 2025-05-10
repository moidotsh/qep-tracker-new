// components/Home/RecentSessionCard.tsx
import React from 'react';
import { XStack, YStack, Card, Text, Spinner } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import { SessionData } from '../../data/trainingData';

interface RecentSessionCardProps {
  sessions: SessionData[];
  hours: number;
  loading: boolean;
}

export function RecentSessionCard({ sessions, hours, loading }: RecentSessionCardProps) {
    const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
    return (
      <Card
        backgroundColor={colors.card}
        borderRadius={borderRadius.medium}
        marginBottom={spacing.large} // Changed from spacing.small to spacing.large
        padding={spacing.xlarge} // Changed from spacing.large to spacing.xlarge
        elevate
      >
      <Text
        color={colors.text}
        fontSize={fontSize.large}
        fontWeight="600"
        marginBottom={spacing.medium}
      >
        Recent Session
      </Text>

      {loading ? (
        <YStack alignItems="center" padding={spacing.large}>
          <Spinner size="large" color={colors.textMuted} />
        </YStack>
      ) : sessions.length > 0 ? (
        <>
          <Text
            color={colors.textMuted}
            fontSize={fontSize.medium}
            marginBottom={spacing.small}
          >
            {sessions[0].date}
          </Text>

          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" space={spacing.small}>
              <Text color={colors.textMuted}>Duration</Text>
              <Text color={colors.text} fontWeight="500">{sessions[0].duration} min</Text>
            </XStack>

            <XStack alignItems="center">
              <Text color={colors.textMuted} paddingRight={spacing.small}>Next Bar In:</Text>
              <Text color={colors.text} fontWeight="500">
                {(8 - (hours % 8)).toFixed(2)}
              </Text>
              <Text color={colors.textMuted}>h</Text>
            </XStack>
          </XStack>
        </>
      ) : (
        <Text color={colors.textMuted} textAlign="center">
          No sessions recorded yet.
        </Text>
      )}
    </Card>
  );
}
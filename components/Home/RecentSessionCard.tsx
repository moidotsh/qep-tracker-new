// components/Home/RecentSessionCard.tsx
import React from 'react';
import { XStack, YStack, Text, Card } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import { SessionData } from '../../data/trainingData';
import { getTimeSinceLastSession } from '../../utils/streakCalculator';

interface RecentSessionCardProps {
  sessions: SessionData[];
  hours: number;
  loading: boolean;
}

export function RecentSessionCard({ sessions, hours, loading }: RecentSessionCardProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  // Format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${minutes} min`;
    } else if (remainingMinutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${remainingMinutes} min`;
    }
  };
  
  // Calculate hours until next bar (8 hour increments)
  const getHoursUntilNextBar = () => {
    return (8 - (hours % 8)).toFixed(2);
  };
  
  return (
    <Card
      backgroundColor={colors.card}
      borderRadius={borderRadius.medium}
      marginTop={spacing.large}
      marginBottom={spacing.large}
      padding={spacing.xlarge}
      elevation={2}
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
          <Text color={colors.textMuted}>Loading sessions...</Text>
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
              <Text color={colors.text} fontWeight="500">{formatDuration(sessions[0].duration)}</Text>
            </XStack>

            <XStack alignItems="center">
              <Text color={colors.textMuted} paddingRight={spacing.small}>Next Bar In:</Text>
              <Text color={colors.text} fontWeight="500">
                {getHoursUntilNextBar()}
              </Text>
              <Text color={colors.textMuted}>h</Text>
            </XStack>
          </XStack>
          
          <Text
            color={colors.textSecondary}
            fontSize={fontSize.small}
            marginTop={spacing.medium}
          >
            Last trained: {getTimeSinceLastSession(sessions)}
          </Text>
        </>
      ) : (
        <Text color={colors.textMuted} textAlign="center">
          No sessions recorded yet.
        </Text>
      )}
    </Card>
  );
}
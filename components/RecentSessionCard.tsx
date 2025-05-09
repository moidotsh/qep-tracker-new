// components/RecentSessionCard.tsx
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { useAppTheme } from './ThemeProvider';
import { SessionData } from '../data/trainingData';

interface RecentSessionCardProps {
  sessions: SessionData[];
  loading?: boolean;
}

export function RecentSessionCard({ sessions, loading = false }: RecentSessionCardProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  if (loading) {
    return (
      <YStack
        backgroundColor={colors.card}
        padding={spacing.large}
        borderRadius={borderRadius.medium}
        marginTop={spacing.large}
        marginBottom={spacing.medium}
        alignItems="center"
        justifyContent="center"
        height={120}
      >
        <Text color={colors.textMuted}>Loading sessions...</Text>
      </YStack>
    );
  }
  
  if (sessions.length === 0) {
    return (
      <YStack
        backgroundColor={colors.card}
        padding={spacing.large}
        borderRadius={borderRadius.medium}
        marginTop={spacing.large}
        marginBottom={spacing.medium}
        alignItems="center"
        justifyContent="center"
        height={120}
      >
        <Text color={colors.textMuted}>No sessions recorded yet.</Text>
      </YStack>
    );
  }
  
  const recentSession = sessions[0];
  const minutes = recentSession.duration;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  let durationText;
  
  if (hours === 0) {
    durationText = `${minutes} min`;
  } else if (remainingMinutes === 0) {
    durationText = `${hours} hr`;
  } else {
    durationText = `${hours} hr ${remainingMinutes} min`;
  }
  
  return (
    <YStack
      backgroundColor={colors.card}
      padding={spacing.large}
      borderRadius={borderRadius.medium}
      marginTop={spacing.large}
      marginBottom={spacing.medium}
    >
      <Text
        color={colors.text}
        fontSize={fontSize.large}
        fontWeight="600"
        marginBottom={spacing.medium}
      >
        Recent Session
      </Text>
      
      <Text
        color={colors.textMuted}
        fontSize={fontSize.medium}
        marginBottom={spacing.small}
      >
        {recentSession.date}
      </Text>
      
      <XStack justifyContent="space-between" alignItems="center">
        <XStack alignItems="center" space={spacing.small}>
          <Text color={colors.textMuted}>Duration</Text>
          <Text color={colors.text} fontWeight="500">{durationText}</Text>
        </XStack>
      </XStack>
    </YStack>
  );
}
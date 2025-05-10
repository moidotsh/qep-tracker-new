// components/Sessions/SessionList.tsx
import React from 'react';
import { YStack, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import { SessionData } from '../../data/trainingData';
import SessionItem from './SessionItem';
import CardContainer from '../UI/Card/CardContainer';

interface SessionListProps {
  sessions: SessionData[];
  loading?: boolean;
  onEditSession?: (sessionId: string) => void;
  emptyMessage?: string;
  loadingMessage?: string;
  space?: number | string;
  formatDuration?: (minutes: number) => string;
}

export default function SessionList({
  sessions,
  loading = false,
  onEditSession,
  emptyMessage = "No sessions recorded yet.",
  loadingMessage = "Loading session history...",
  space,
  formatDuration
}: SessionListProps) {
  const { colors, spacing } = useAppTheme();
  
  // If loading, show loading state
  if (loading) {
    return (
      <CardContainer>
        <Text color={colors.textMuted} textAlign="center">{loadingMessage}</Text>
      </CardContainer>
    );
  }
  
  // If no sessions, show empty state
  if (sessions.length === 0) {
    return (
      <CardContainer>
        <Text color={colors.textMuted} textAlign="center">{emptyMessage}</Text>
      </CardContainer>
    );
  }
  
  // Render session list
  return (
    <YStack space={space || spacing.medium}>
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          onEditSession={onEditSession}
          formatDuration={formatDuration}
        />
      ))}
    </YStack>
  );
}
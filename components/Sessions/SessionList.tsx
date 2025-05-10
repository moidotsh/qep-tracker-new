// components/Sessions/SessionList.tsx
import React from 'react';
import { YStack, Card, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import { SessionData } from '../../data/trainingData';
import { SessionItem } from './SessionItem';

interface SessionListProps {
  /**
   * The array of session data to display
   */
  sessions: SessionData[];
  
  /**
   * Whether the data is loading
   */
  loading?: boolean;
  
  /**
   * Handler for editing a session
   */
  onEditSession?: (sessionId: string) => void;
  
  /**
   * Message to display when there are no sessions
   */
  emptyMessage?: string;
  
  /**
   * Message to display while loading
   */
  loadingMessage?: string;
  
  /**
   * Space between items
   */
  space?: number | string;
  
  /**
   * Optional custom formatter for duration
   */
  formatDuration?: (minutes: number) => string;
}

/**
 * A component to display a list of training sessions
 */
export function SessionList({
  sessions,
  loading = false,
  onEditSession,
  emptyMessage = "No sessions recorded yet.",
  loadingMessage = "Loading session history...",
  space,
  formatDuration
}: SessionListProps) {
  const { colors, spacing, borderRadius } = useAppTheme();
  
  // If loading, show loading state
  if (loading) {
    return (
      <Card
        backgroundColor={colors.card}
        padding={spacing.large}
        borderRadius={borderRadius.medium}
        elevate
      >
        <Text color={colors.textMuted} textAlign="center">{loadingMessage}</Text>
      </Card>
    );
  }
  
  // If no sessions, show empty state
  if (sessions.length === 0) {
    return (
      <Card
        backgroundColor={colors.card}
        padding={spacing.large}
        borderRadius={borderRadius.medium}
        elevate
      >
        <Text color={colors.textMuted} textAlign="center">{emptyMessage}</Text>
      </Card>
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

export default SessionList;
// components/Sessions/SessionList.tsx
import React from 'react';
import { YStack, Card, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import { SessionData } from '../../data/trainingData';

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
 * Default duration formatter
 */
function defaultFormatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${remainingMinutes} min`;
}

/**
 * A component to display a list of training sessions
 */
export default function SessionList({
  sessions,
  loading = false,
  onEditSession,
  emptyMessage = "No sessions recorded yet.",
  loadingMessage = "Loading session history...",
  space,
  formatDuration = defaultFormatDuration
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

// Simple SessionItem component
function SessionItem({ 
  session, 
  onEditSession, 
  formatDuration 
}: { 
  session: SessionData, 
  onEditSession?: (id: string) => void, 
  formatDuration: (minutes: number) => string 
}) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  return (
    <Card
      backgroundColor={colors.card}
      padding={spacing.large}
      borderRadius={borderRadius.medium}
      elevate
    >
      <Text 
        color={colors.text} 
        fontSize={fontSize.large} 
        fontWeight="bold"
        marginBottom={spacing.small}
      >
        {session.date}
      </Text>
      
      <Text color={colors.text} fontSize={fontSize.medium}>
        Duration: {formatDuration(session.duration)}
      </Text>
    </Card>
  );
}
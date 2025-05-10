// components/Sessions/SessionItem.tsx
import React from 'react';
import { XStack, YStack, Text, Card, Separator } from 'tamagui';
import { Clock, Edit3 } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import { SessionData } from '../../data/trainingData';

interface SessionItemProps {
  /**
   * The session data to display
   */
  session: SessionData;
  
  /**
   * Handler for editing the session
   */
  onEditSession?: (sessionId: string) => void;
  
  /**
   * Whether to show all session details
   */
  showDetails?: boolean;
  
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
 * A card displaying a single training session
 */
export function SessionItem({
  session,
  onEditSession,
  showDetails = true,
  formatDuration = defaultFormatDuration
}: SessionItemProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  const handleEdit = () => {
    if (onEditSession) {
      onEditSession(session.id);
    }
  };
  
  return (
    <Card
      backgroundColor={colors.card}
      padding={spacing.large}
      borderRadius={borderRadius.medium}
      elevate
    >
      {/* Session Header */}
      <XStack justifyContent="space-between" alignItems="center">
        <Text 
          color={colors.text} 
          fontSize={fontSize.large} 
          fontWeight="600"
        >
          {session.date}
        </Text>
        {onEditSession && (
          <Edit3 
            size={20} 
            color={colors.buttonBackground} 
            onPress={handleEdit}
          />
        )}
      </XStack>
      
      <Separator backgroundColor={colors.border} marginVertical={spacing.medium} />
      
      {/* Session Details */}
      <XStack space={spacing.large} marginBottom={spacing.medium}>
        <XStack alignItems="center" space={spacing.small}>
          <Clock size={18} color={colors.textMuted} />
          <Text color={colors.textMuted} fontSize={fontSize.medium}>
            {formatDuration(session.duration)}
          </Text>
        </XStack>
      </XStack>
      
      {/* Additional details can be added here when showDetails is true */}
      {showDetails && (
        <YStack>
          {/* Custom details can be added here */}
        </YStack>
      )}
    </Card>
  );
}

export default SessionItem;
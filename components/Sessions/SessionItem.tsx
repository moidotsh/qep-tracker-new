// components/Sessions/SessionItem.tsx
import React from 'react';
import { XStack, YStack, Text, Separator } from 'tamagui';
import { Clock, Edit3 } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import { SessionData } from '../../data/trainingData';
import CardContainer from '../UI/Card/CardContainer';

interface SessionItemProps {
  session: SessionData;
  onEditSession?: (sessionId: string) => void;
  showDetails?: boolean;
  formatDuration?: (minutes: number) => string;
}

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

export default function SessionItem({
  session,
  onEditSession,
  showDetails = true,
  formatDuration = defaultFormatDuration
}: SessionItemProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  const handleEdit = () => {
    if (onEditSession) {
      onEditSession(session.id);
    }
  };
  
  return (
    <CardContainer elevate>
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
    </CardContainer>
  );
}
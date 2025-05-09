// app/history.tsx
import React from 'react';
import { YStack, Text, XStack, ScrollView } from 'tamagui';
import { router } from 'expo-router';
import { useAppTheme } from '../components/ThemeProvider';
import { AppButton } from '../components/AppButton';
import { Card } from '../components/Card';
import { useTrainingData } from '../hooks/useTrainingData';
import { goBack, NavigationPath } from '../navigation';


export default function HistoryScreen() {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  const { sessions, loading } = useTrainingData();
  
  // Handle back button
  const handleBack = () => {
    goBack(NavigationPath.HISTORY); // or PROGRESS, HISTORY, SETTINGS depending on the screen
  };
  
  // Format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${remainingMinutes} min`;
  };
  
  return (
    <YStack flex={1} padding={spacing.large} backgroundColor={colors.background}>
      {/* Header */}
      <XStack alignItems="center" marginBottom={spacing.large}>
        <AppButton
          label="← Back"
          variant="subtle"
          size="small"
          onPress={handleBack}
        />
        <Text 
          fontSize={fontSize.xlarge} 
          fontWeight="bold" 
          color={colors.text} 
          marginLeft={spacing.small}
        >
          Session History
        </Text>
      </XStack>
      
      {/* Sessions List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          color={colors.text}
          fontSize={fontSize.medium}
          fontWeight="600"
          marginBottom={spacing.medium}
        >
          Recent Sessions
        </Text>
        
        {loading ? (
          <Card>
            <Text color={colors.textMuted} textAlign="center" padding={spacing.large}>
              Loading session history...
            </Text>
          </Card>
        ) : sessions.length === 0 ? (
          <Card>
            <Text color={colors.textMuted} textAlign="center" padding={spacing.large}>
              No sessions recorded yet.
            </Text>
          </Card>
        ) : (
          <YStack space={spacing.medium}>
            {sessions.map((session) => (
              <Card key={session.id} padding={spacing.large}>
                <Text 
                  fontSize={fontSize.large} 
                  fontWeight="bold" 
                  color={colors.text}
                  marginBottom={spacing.small}
                >
                  {session.date}
                </Text>
                <XStack alignItems="center" space={spacing.small}>
                  <Text color={colors.textMuted}>Duration:</Text>
                  <Text color={colors.text} fontWeight="500">
                    {formatDuration(session.duration)}
                  </Text>
                </XStack>
              </Card>
            ))}
          </YStack>
        )}
      </ScrollView>
    </YStack>
  );
}
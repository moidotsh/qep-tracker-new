// app/progress.tsx
import React from 'react';
import { YStack, Text, XStack, View } from 'tamagui';
import { router } from 'expo-router';
import { useAppTheme } from '../components/ThemeProvider';
import { AppButton } from '../components/AppButton';
import { Card } from '../components/Card';
import { useTrainingData } from '../hooks/useTrainingData';
import { TrendingUp, CheckCircle, Clock } from '@tamagui/lucide-icons';
import { goBack, NavigationPath } from '../navigation';


export default function ProgressScreen() {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  const { hours, percentage, sessions, loading } = useTrainingData();
  
  // Handle back button
  const handleBack = () => {
    goBack(NavigationPath.PROGRESS); // or PROGRESS, HISTORY, SETTINGS depending on the screen
  };
  
  // Sample progress metrics
  const currentSize = 16.2;  // cm (for example)
  const startSize = 15.6;    // cm
  const goalSize = 17.5;     // cm
  const stageName = "Evolution";
  
  // Calculate progress percentage based on size change
  const progressPercentage = Math.min(
    100, 
    Math.round(
      ((currentSize - startSize) / 
      (goalSize - startSize)) * 100
    )
  );
  
  // Calculate some stats
  const sessionsLogged = sessions.length;
  const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0);
  const averageSessionMinutes = sessionsLogged > 0 ? Math.round(totalMinutes / sessionsLogged) : 0;
  
  // Format time in a readable format
  const formatTime = (minutes: number) => {
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
          Your Progress
        </Text>
      </XStack>
      
      {/* Progress indicator card */}
      <Card marginBottom={spacing.medium}>
        <YStack space={spacing.medium} alignItems="center">
          <XStack>
            <Text 
              backgroundColor="#0A84FF" 
              color="white" 
              fontSize={fontSize.small}
              paddingHorizontal={spacing.medium}
              paddingVertical={6}
              borderRadius={50}
            >
              {stageName}
            </Text>
          </XStack>
          
          <YStack width="100%" space={spacing.small}>
            <XStack justifyContent="space-between">
              <Text color={colors.textMuted} fontSize={fontSize.small}>
                Start: {startSize} cm
              </Text>
              <Text color={colors.textMuted} fontSize={fontSize.small}>
                Goal: {goalSize} cm
              </Text>
            </XStack>
            
            {/* Progress bar */}
            <View 
              backgroundColor="#222222" 
              height={12} 
              borderRadius={6} 
              overflow="hidden"
            >
              <View
                backgroundColor="#0A84FF"
                height="100%"
                width={`${progressPercentage}%`}
                borderRadius={6}
              />
            </View>
            
            <XStack justifyContent="center">
              <Text color={colors.text} fontSize={fontSize.small} fontWeight="500">
                {progressPercentage}%
              </Text>
            </XStack>
          </YStack>
          
          <YStack alignItems="center" marginTop={spacing.large}>
            <Text color={colors.textMuted}>Current</Text>
            <Text
              color={colors.text}
              fontSize={32}
              fontWeight="700"
              marginTop={spacing.small}
            >
              {currentSize} cm
            </Text>
          </YStack>
        </YStack>
      </Card>
      
      {/* Stats cards */}
      <Card>
        <YStack space={spacing.large}>
          {/* Sessions Logged */}
          <XStack alignItems="center" space={spacing.medium}>
            <View 
              height={50} 
              width={50} 
              backgroundColor="#222222"
              borderRadius={25}
              alignItems="center"
              justifyContent="center"
            >
              <CheckCircle size={24} color={colors.text} />
            </View>
            
            <YStack>
              <Text color={colors.textMuted} fontSize={fontSize.medium}>
                Sessions Logged
              </Text>
              <Text 
                color={colors.text} 
                fontSize={fontSize.xlarge}
                fontWeight="700"
                marginTop={4}
              >
                {loading ? '...' : sessionsLogged}
              </Text>
            </YStack>
          </XStack>
          
          {/* Average Session */}
          <XStack alignItems="center" space={spacing.medium}>
            <View 
              height={50} 
              width={50} 
              backgroundColor="#222222"
              borderRadius={25}
              alignItems="center"
              justifyContent="center"
            >
              <Clock size={24} color={colors.text} />
            </View>
            
            <YStack>
              <Text color={colors.textMuted} fontSize={fontSize.medium}>
                Average Session
              </Text>
              <Text 
                color={colors.text} 
                fontSize={fontSize.xlarge}
                fontWeight="700"
                marginTop={4}
              >
                {loading ? '...' : `${averageSessionMinutes} min`}
              </Text>
            </YStack>
          </XStack>
          
          {/* Total Time */}
          <XStack alignItems="center" space={spacing.medium}>
            <View 
              height={50} 
              width={50} 
              backgroundColor="#222222"
              borderRadius={25}
              alignItems="center"
              justifyContent="center"
            >
              <TrendingUp size={24} color={colors.text} />
            </View>
            
            <YStack>
              <Text color={colors.textMuted} fontSize={fontSize.medium}>
                Total Time
              </Text>
              <Text 
                color={colors.text} 
                fontSize={fontSize.xlarge}
                fontWeight="700"
                marginTop={4}
              >
                {loading ? '...' : formatTime(totalMinutes)}
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </Card>
      
      {/* Log Session Button */}
      <AppButton
        label="Log New Session"
        variant="primary"
        size="large"
        fullWidth
        marginTop={spacing.xlarge}
        onPress={() => router.push('/log-session')}
      />
    </YStack>
  );
}
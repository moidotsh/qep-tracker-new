// app/history.tsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RefreshControl } from 'react-native';
import { YStack, Text } from 'tamagui';
import { useAppTheme } from '../components/ThemeProvider';
import PageContainer from '../components/Layout/PageContainer';
import ScreenHeader from '../components/Layout/ScreenHeader';
import SessionList from '../components/Sessions/SessionList';
import AppButton from '../components/Button/AppButton';
import { NavigationPath, navigateToLogSession } from '../navigation/NavigationHelper';
import { useTrainingData } from '../hooks/useTrainingData';
import { Plus } from '@tamagui/lucide-icons';
import CardContainer from '../components/UI/Card/CardContainer';
import SectionTitle from '../components/Typography/SectionTitle';
import EmptyState from '../components/Feedback/EmptyState';
import AppLoading from '../components/Feedback/AppLoading';

export default function HistoryScreen() {
  const { colors, spacing, fontSize } = useAppTheme();
  const { sessions, loading, refresh } = useTrainingData();
  
  const handleEditSession = (sessionId: string) => {
    console.log('Edit session', sessionId);
    // Would navigate to edit screen in a real app
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
    <PageContainer
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
    >
      <StatusBar style="light" />
      
      <ScreenHeader
        title="Session History"
        currentPath={NavigationPath.HISTORY}
      />
      
      {loading && sessions.length === 0 ? (
        <AppLoading message="Loading session history..." />
      ) : sessions.length === 0 ? (
        <EmptyState 
          message="No sessions recorded yet." 
          useCard 
          actionText="Log Your First Session"
          onAction={navigateToLogSession}
        />
      ) : (
        <YStack space={spacing.medium}>
          <CardContainer>
            <SectionTitle>Recent Sessions</SectionTitle>
            <SessionList 
              sessions={sessions} 
              onEditSession={handleEditSession} 
              formatDuration={formatDuration}
            />
          </CardContainer>
          
          <AppButton 
            label="Log New Session"
            icon={<Plus size={18} color="white" />}
            onPress={navigateToLogSession}
            fullWidth
            size="large"
            marginTop={spacing.large}
          />
        </YStack>
      )}
    </PageContainer>
  );
}
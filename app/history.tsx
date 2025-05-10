// app/history.tsx
import React from 'react';
import { YStack, Text } from 'tamagui';
import { useAppTheme } from '../components/ThemeProvider';
import PageContainer from '../components/Layout/PageContainer';
import ScreenHeader from '../components/Layout/ScreenHeader';
import SessionList from '../components/Sessions/SessionList';
import AppButton from '@components/Button/AppButton';
import { NavigationPath, navigateToLogSession } from '../navigation';
import { useTrainingData } from '../hooks/useTrainingData';
import { Plus } from '@tamagui/lucide-icons';

export default function HistoryScreen() {
  const { colors, spacing, fontSize } = useAppTheme();
  const { sessions, loading, refresh } = useTrainingData();
  
  const handleEditSession = (sessionId: string) => {
    console.log('Edit session', sessionId);
    // Would navigate to edit screen in a real app
  };
  
  return (
    <PageContainer>
      <ScreenHeader
        title="Session History"
        currentPath={NavigationPath.HISTORY}
      />
      
      <YStack space={spacing.medium}>
        <Text
          color={colors.text}
          fontSize={fontSize.medium}
          fontWeight="600"
          marginBottom={spacing.small}
        >
          Recent Sessions
        </Text>
        
        <SessionList 
          sessions={sessions} 
          onEditSession={handleEditSession} 
          loading={loading}
        />
        
        <AppButton
          label="Log New Session"
          variant="primary"
          size="large"
          fullWidth
          icon={<Plus size={18} color="white" />}
          onPress={navigateToLogSession}
          marginTop={spacing.xlarge}
        />
      </YStack>
    </PageContainer>
  );
}
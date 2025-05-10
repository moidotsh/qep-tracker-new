// app/progress.tsx
import React from 'react';
import { YStack, Card } from 'tamagui';
import { useAppTheme } from '../components/ThemeProvider';
import PageContainer from '../components/Layout/PageContainer';
import ScreenHeader from '../components/Layout/ScreenHeader';
import ProgressDetail from '../components/Stats/ProgressDetail';
import StatIconCard from '../components/Stats/StatIconCard';
import { AppButton } from '../components/AppButton';
import { useTrainingData } from '../hooks/useTrainingData';
import { NavigationPath, navigateToLogSession } from '../navigation';
import { TrendingUp, CheckCircle, Clock, Plus } from '@tamagui/lucide-icons';

export default function ProgressScreen() {
  const { colors, spacing } = useAppTheme();
  const { hours, sessions, loading } = useTrainingData();
  
  // Mock data - would come from storage in a real app
  const mockProgressData = {
    currentSize: 16.2, // cm
    startSize: 15.6, // cm
    goalSize: 17.5, // cm,
    stageName: "Evolution"
  };
  
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
    <PageContainer>
      <ScreenHeader 
        title="Your Progress"
        currentPath={NavigationPath.PROGRESS}
      />
      
      {/* Progress Detail Card */}
      <Card marginBottom={spacing.medium}>
        <ProgressDetail
          currentSize={mockProgressData.currentSize}
          startSize={mockProgressData.startSize}
          goalSize={mockProgressData.goalSize}
          stageName={mockProgressData.stageName}
          loading={loading}
        />
      </Card>
      
      {/* Stats Cards */}
      <Card>
        <YStack space={spacing.medium}>
          {/* Sessions Logged */}
          <StatIconCard
            icon={<CheckCircle />}
            label="Sessions Logged"
            value={sessionsLogged}
            loading={loading}
          />
          
          {/* Average Session */}
          <StatIconCard
            icon={<Clock />}
            label="Average Session"
            value={averageSessionMinutes}
            unit="min"
            loading={loading}
          />
          
          {/* Total Time */}
          <StatIconCard
            icon={<TrendingUp />}
            label="Total Time"
            value={formatTime(totalMinutes)}
            loading={loading}
            marginBottom={spacing.small}
          />
        </YStack>
      </Card>
      
      {/* Log Session Button */}
      <AppButton
        label="Log New Session"
        icon={<Plus size={18} color="white" />}
        onPress={navigateToLogSession}
        fullWidth
        size="large"
        marginTop={spacing.xlarge}
      />
    </PageContainer>
  );
}
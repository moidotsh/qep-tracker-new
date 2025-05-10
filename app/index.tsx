// app/index.tsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { BarChart2, TrendingUp, Clock } from '@tamagui/lucide-icons';
import { YStack, Text, Button } from 'tamagui';
import { useAppTheme } from '../components/ThemeProvider';
import { StatCard } from '../components/StatCard';
import { FeatureSection } from '../components/FeatureCard';
import { useTrainingData } from '../hooks/useTrainingData';
import { calculateStreak, getTimeSinceLastSession } from '../utils/streakCalculator';
import { HourTrackerCard } from '../components/Home/HourTrackerCard';
import { RecentSessionCard } from '../components/Home/RecentSessionCard';
import { FullGridModal } from '../components/Home/FullGridModal';
import { HomeHeader } from '../components/Home/HomeHeader';
import PageContainer from '../components/Layout/PageContainer';
import {
  navigateToLogSession,
  navigateToProgress,
  navigateToHistory
} from '../navigation';

export default function HomeScreen() {
  // State for full grid modal
  const [showFullGrid, setShowFullGrid] = useState(false);
  const [isDemoInitialized, setIsDemoInitialized] = useState(false);
  

  // Use training data hook
  const { hours, stageInfo, loading, error, sessions, refresh, initializeDemo } = useTrainingData();

  // Initialize demo data handler
  const handleInitializeDemo = async () => {
    await initializeDemo();
    setIsDemoInitialized(true);
    setTimeout(() => setIsDemoInitialized(false), 2000);
  };

  // Format date 
  const today = new Date();
  const formattedDate = format(today, 'MMMM d, yyyy');

  // Feature data for quick access cards
  const features = [
    {
      icon: <BarChart2 size={30} color="white" />,
      title: "Trends",
      onPress: () => navigateToLogSession()
    },
    {
      icon: <TrendingUp size={30} color="white" />,
      title: "Progress",
      onPress: () => navigateToProgress()
    },
    {
      icon: <Clock size={30} color="white" />,
      title: "History",
      onPress: () => navigateToHistory()
    }
  ];

  // Stats for the summary component
  const summaryStats = [
    { label: 'Total', value: loading ? '...' : hours.toFixed(1), unit: 'h' },
    { label: 'Goal', value: loading ? '...' : stageInfo.percentage, unit: '%' },
    { label: 'Trained', value: loading ? '...' : (sessions.length > 0 ? getTimeSinceLastSession(sessions) : 'Never') }
  ];

  // Refresh data on mount
  useEffect(() => {
    refresh();
  }, []);

  const { spacing, borderRadius } = useAppTheme();

  return (
    <PageContainer>
      {error && (
        <YStack
          backgroundColor="#FF3B30"
          padding={spacing.medium}
          borderRadius={borderRadius.medium}
          marginBottom={spacing.medium}
        >
          <Text color="white" fontWeight="500">
            {error}
          </Text>
          <Button
            onPress={refresh}
            backgroundColor="rgba(255,255,255,0.2)"
            marginTop={spacing.small}
          >
            <Text color="white">Retry</Text>
          </Button>
        </YStack>
      )}

      {/* Header Section */}
      <HomeHeader
        formattedDate={formattedDate}
        isDemoInitialized={isDemoInitialized}
        handleInitializeDemo={handleInitializeDemo}
        streak={calculateStreak(sessions)}
        loading={loading}
      />

      {/* Stats Card */}
      <StatCard
        stats={summaryStats}
      // loading={loading}
      />

      {/* Hour Tracker Card */}
      <HourTrackerCard
        stageName={stageInfo.stageName}
        percentage={stageInfo.percentage}
        onShowFullGrid={() => setShowFullGrid(true)}
      />

      {/* Recent Session Card */}
      <RecentSessionCard
        sessions={sessions}
        hours={hours}
        loading={loading}
      />

      {/* Quick Access Feature Cards */}
      <FeatureSection features={features} />

      {/* Full Grid Modal */}
      <FullGridModal
        visible={showFullGrid}
        onClose={() => setShowFullGrid(false)}
        stageName={stageInfo.stageName}
        percentage={stageInfo.percentage}
      />
    </PageContainer>
  );
}
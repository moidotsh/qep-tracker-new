// app/index.tsx - Update imports to ensure every component uses direct imports
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { BarChart2, TrendingUp, Clock } from '@tamagui/lucide-icons';
import { useTrainingData } from '../hooks/useTrainingData';
import { calculateStreak } from '../utils/streakCalculator';
import { SessionData } from '../data/trainingData';
import { navigateToLogSession, navigateToProgress, navigateToHistory } from '../navigation/NavigationHelper';

// Direct imports for each component
import PageContainer from '../components/Layout/PageContainer';
import HomeHeader from '../components/Home/HomeHeader';
import HourTrackerCard from '../components/Home/HourTrackerCard';
import { RecentSessionCard } from '@components/Home/RecentSessionCard';
import { FeatureSection } from '../components/FeatureCard';
import StatSummary from '../components/Stats/StatSummary';
import { FullGridModal } from '@components/Home/FullGridModal';

export default function HomeScreen() {
  const [showFullGrid, setShowFullGrid] = useState(false);
  const [isDemoInitialized, setIsDemoInitialized] = useState(false);
  
  const { hours, stageInfo, loading, sessions, refresh, initializeDemo } = useTrainingData();

  const handleInitializeDemo = async () => {
    await initializeDemo();
    setIsDemoInitialized(true);
    setTimeout(() => setIsDemoInitialized(false), 2000);
  };

  const today = new Date();
  const formattedDate = format(today, 'MMMM d, yyyy');

  const getTimeSinceLastSession = (sessions: SessionData[]): string => {
    if (sessions.length === 0) return "No sessions yet";

    const lastSessionDate = new Date(sessions[0].date);
    const now = new Date();
    const diffHours = Math.round((now.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60));

    if (diffHours < 1) return "Just now";
    if (diffHours === 1) return "1h ago";
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  useEffect(() => {
    refresh();
  }, []);

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

  const summaryStats = [
    { label: 'Total', value: loading ? '...' : hours.toFixed(1), unit: 'h' },
    { label: 'Goal', value: loading ? '...' : stageInfo.percentage, unit: '%' },
    { label: 'Trained', value: loading ? '...' : getTimeSinceLastSession(sessions) }
  ];

  return (
    <PageContainer>
      <HomeHeader 
        formattedDate={formattedDate}
        isDemoInitialized={isDemoInitialized}
        handleInitializeDemo={handleInitializeDemo}
        streak={calculateStreak(sessions)}
        loading={loading}
      />

      <StatSummary 
        stats={summaryStats}
        loading={loading}
        size="medium"
      />

      <HourTrackerCard 
        stageName={stageInfo.stageName}
        percentage={stageInfo.percentage}
        onShowFullGrid={() => setShowFullGrid(true)}
      />

      <RecentSessionCard 
        sessions={sessions} 
        hours={hours}
        loading={loading}
      />

      <FeatureSection features={features} />

      <FullGridModal 
        visible={showFullGrid}
        onClose={() => setShowFullGrid(false)}
        stageName={stageInfo.stageName}
        percentage={stageInfo.percentage}
      />
    </PageContainer>
  );
}
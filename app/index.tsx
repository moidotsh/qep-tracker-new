import React, { useState } from 'react';
import { YStack, Text, XStack } from 'tamagui';
import { router } from 'expo-router';
import { useAppTheme } from '../components/ThemeProvider';
import { AppButton } from '../components/AppButton';
import { StatCard } from '../components/StatCard';
import { HourTracker } from '../components/HourTracker';
import { RecentSessionCard } from '../components/RecentSessionCard';
import { useTrainingData } from '../hooks/useTrainingData';
import { Zap, TrendingUp, Settings, BarChart2, Clock } from '@tamagui/lucide-icons';
import { FeatureSection } from '../components/FeatureCard';
import {
    navigateToLogSession,
    navigateToProgress,
    navigateToHistory,
    navigateToSettings
} from '../navigation';
import { FormattedDate } from '../components/FormattedDate';
import { format } from 'date-fns';
import { calculateStreak } from '../utils/streakCalculator';
import { HomeHeader } from '../components/Home';

export default function HomeScreen() {
    const { colors, fontSize, spacing } = useAppTheme();
    const { hours, percentage, loading, sessions, initializeDemo } = useTrainingData();
    const [isDemoInitialized, setIsDemoInitialized] = useState(false);

    // Format date 
    const today = new Date();
    const formattedDate = format(today, 'MMMM d, yyyy');

    const handleInitializeDemo = async () => {
        await initializeDemo();
        setIsDemoInitialized(true);
        setTimeout(() => setIsDemoInitialized(false), 2000);
    };


    const stats = [
        { label: 'Total', value: loading ? '...' : `${hours.toFixed(1)}h` },
        { label: 'Goal', value: loading ? '...' : `${percentage}%` },
        { label: 'Trained', value: 'Active' }
    ];

    const features = [
        {
            icon: <BarChart2 size={30} color="white" />,
            title: "Trends",
            onPress: navigateToLogSession
        },
        {
            icon: <TrendingUp size={30} color="white" />,
            title: "Progress",
            onPress: navigateToProgress
        },
        {
            icon: <Clock size={30} color="white" />,
            title: "History",
            onPress: navigateToHistory
        }
    ];

    return (
        <YStack
            flex={1}
            padding={spacing.large}
            backgroundColor={colors.background}
        >
            <HomeHeader
                formattedDate={formattedDate}
                isDemoInitialized={isDemoInitialized}
                handleInitializeDemo={handleInitializeDemo}
                streak={calculateStreak(sessions)}
                loading={loading}
            />

            <StatCard
                stats={stats}
                marginTop={spacing.large}
            />

            <YStack marginTop={spacing.medium}>
                <Text
                    fontSize={fontSize.medium}
                    fontWeight="600"
                    color={colors.text}
                    marginBottom={spacing.small}
                >
                    Hour Tracker Grid
                </Text>

                <HourTracker
                    totalHours={hours}
                    stageName="Adaptation 1"
                    percentage={percentage}
                />
            </YStack>

            <RecentSessionCard
                sessions={sessions}
                loading={loading}
            />
            <FeatureSection features={features} />
        </YStack>
    );
}
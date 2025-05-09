import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, YStack, Text } from 'tamagui';
import config from './tamagui.config';
import { ThemeProvider } from './components/ThemeProvider';
import { useAppTheme } from './components/ThemeProvider';
import { AppButton } from './components/AppButton';
import { StatCard } from './components/StatCard';

function HomeScreen() {
  const { colors, fontSize, spacing } = useAppTheme();
  
  // Example stats
  const stats = [
    { label: 'Total', value: '0h' },
    { label: 'Goal', value: '0%' },
    { label: 'Trained', value: 'Never' }
  ];
  
  return (
    <YStack 
      flex={1} 
      backgroundColor={colors.background} 
      padding={spacing.large}
    >
      <YStack marginTop={spacing.xxlarge}>
        <Text fontSize={fontSize.xxlarge} color={colors.text} fontWeight="bold">
          QuickExtender Pro
        </Text>
        <Text 
          fontSize={fontSize.small} 
          color={colors.textMuted} 
          marginTop={spacing.xs}
        >
          PROGRESS TRACKER
        </Text>
      </YStack>
      
      <StatCard 
        stats={stats} 
        marginTop={spacing.xlarge}
      />
      
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color={colors.textMuted}>Hour tracker grid will go here</Text>
      </YStack>
      
      <AppButton 
        label="Log Session" 
        variant="primary"
        size="large"
        fullWidth
        marginBottom={spacing.medium}
        onPress={() => console.log('Button pressed')}
      />
    </YStack>
  );
}

export default function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ThemeProvider>
        <StatusBar style="light" />
        <HomeScreen />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
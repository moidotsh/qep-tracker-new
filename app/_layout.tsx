// app/_layout.tsx
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { ThemeProvider } from '../components/ThemeProvider';
import { theme } from '../constants/theme';
import { Platform } from 'react-native';
import { LoadingScreen } from '@components/LoadingScreen';
import { ConstrainedLayout } from '../components/ConstrainedLayout';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Always use dark theme
  const [loaded] = useFonts({
    // You can add custom fonts here if needed
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    
    // Force dark mode on web
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [loaded]);

  if (!loaded) {
    return <LoadingScreen />; // Use our slick SVG loader here
  }

  // Get the dark background color
  const backgroundColor = theme.colors.dark.background;

  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ThemeProvider>
        <ConstrainedLayout>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              contentStyle: {
                backgroundColor,
              },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen 
              name="log-session" 
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen 
              name="progress" 
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen 
              name="history" 
              options={{
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen 
              name="settings" 
              options={{
                animation: 'slide_from_right',
              }}
            />
          </Stack>
        </ConstrainedLayout>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
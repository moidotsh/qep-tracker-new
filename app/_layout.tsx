import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { ThemeProvider } from '../components/ThemeProvider';
import { StatusBar } from 'expo-status-bar';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        // You can add custom fonts here if needed
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={config} defaultTheme="dark">
            <ThemeProvider>
                <StatusBar style="light" />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        animation: 'fade',
                        contentStyle: {
                            backgroundColor: '#121212',
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
                        name="history"
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
                </Stack>
            </ThemeProvider>
        </TamaguiProvider>
    );
}
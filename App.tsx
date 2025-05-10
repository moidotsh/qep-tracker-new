// App.tsx
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider, YStack, Text } from 'tamagui';
import config from './tamagui.config';
import { ThemeProvider } from './components/ThemeProvider';
import { useEffect } from 'react';

export default function App() {
  // This helps ensure Tamagui styles are properly applied on web
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);
  
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <ThemeProvider>
        <YStack 
          flex={1} 
          backgroundColor="$background" 
          alignItems="center" 
          justifyContent="center"
        >
          <Text fontSize={30} fontWeight="bold" color="$color">
            QuickExtender Pro Tracker
          </Text>
          <StatusBar style="light" />
        </YStack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
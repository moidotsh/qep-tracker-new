// components/Home/HomeHeader.tsx
import React from 'react';
import { XStack, YStack, Text, Button } from 'tamagui';
import { Zap, Settings } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import { navigateToSettings } from '../../navigation/NavigationHelper';

interface HomeHeaderProps {
  formattedDate: string;
  isDemoInitialized: boolean;
  handleInitializeDemo: () => Promise<void>;
  streak: string;
  loading: boolean;
}

export default function HomeHeader({ 
  formattedDate, 
  isDemoInitialized, 
  handleInitializeDemo,
  streak,
  loading
}: HomeHeaderProps) {
  const { colors, spacing } = useAppTheme();
  
  return (
    <YStack paddingTop={spacing.medium} paddingBottom={spacing.small}>
      <XStack alignItems="center" justifyContent="space-between">
        <Text
          color={colors.text}
          fontSize={26}
          fontWeight="bold"
        >
          QuickExtender Pro
        </Text>
        <XStack>
          <Button
            size="$3"
            circular
            icon={<Zap size={22} color={isDemoInitialized ? '#00c896' : colors.textMuted} />}
            backgroundColor="transparent"
            onPress={handleInitializeDemo}
            pressStyle={{ opacity: 0.7 }}
            marginRight={spacing.small}
            // Add a success hint when demo data is initialized
            {...(isDemoInitialized && {
              backgroundColor: 'rgba(0, 200, 150, 0.2)',
            })}
          />
          <Button
            size="$3"
            circular
            icon={<Settings size={22} color={colors.text} />}
            backgroundColor="transparent"
            onPress={() => navigateToSettings()}
            pressStyle={{ opacity: 0.7 }}
          />
        </XStack>
      </XStack>
      
      <XStack alignItems="center" justifyContent="space-between">
        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            fontWeight: '300',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Progress Tracker
        </Text>
        {isDemoInitialized && (
          <Text
            style={{
              color: '#00c896',
              fontSize: 13,
              fontWeight: '500',
            }}
          >
            Demo Data Loaded
          </Text>
        )}
      </XStack>

      <YStack paddingTop={spacing.large}>
        <XStack justifyContent='space-between' alignItems='center' width='100%'>
          <Text
            color={colors.text}
            fontSize={13}
            fontWeight={300}
            style={{
              letterSpacing: 1.1,
            }}
          >
            {formattedDate}
          </Text>
          <Text
            color={colors.textMuted}
            fontSize={13}
            fontWeight={300}
          >
            {loading ? '...' : streak}
          </Text>
        </XStack>
      </YStack>
    </YStack>
  );
}
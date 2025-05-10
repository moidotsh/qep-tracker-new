// components/Feedback/AppLoading.tsx
import React from 'react';
import { YStack, Spinner, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface AppLoadingProps {
  /**
   * The message to display
   */
  message?: string;
  
  /**
   * The size of the spinner
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether to take full screen
   */
  fullScreen?: boolean;
  
  /**
   * The color of the spinner (uses theme textMuted by default)
   */
  color?: string;
}

/**
 * A consistent loading indicator
 */
export function AppLoading({
  message = "Loading...",
  size = 'medium',
  fullScreen = false,
  color
}: AppLoadingProps) {
  const { colors, spacing } = useAppTheme();
  
  // Map size to specific dimensions
  const spinnerSize = size === 'small' ? 'small' : 'large';
  
  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      padding={spacing.large}
      {...(fullScreen && {
        flex: 1,
        backgroundColor: colors.background
      })}
    >
      <Spinner size={spinnerSize} color={color || colors.textMuted} />
      {message && (
        <Text
          color={colors.textMuted}
          marginTop={spacing.medium}
          textAlign="center"
        >
          {message}
        </Text>
      )}
    </YStack>
  );
}

export default AppLoading;
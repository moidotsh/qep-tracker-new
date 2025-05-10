// components/Stats/ProgressDetail.tsx
import React from 'react';
import { YStack, Text, XStack, View } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface ProgressDetailProps {
  /**
   * Current progress size value
   */
  currentSize: number;
  
  /**
   * Starting size value
   */
  startSize: number;
  
  /**
   * Goal size value
   */
  goalSize: number;
  
  /**
   * Current stage name
   */
  stageName: string;
  
  /**
   * Whether the component is in loading state
   */
  loading?: boolean;
  
  /**
   * Unit for the size values
   */
  unit?: string;
}

/**
 * A component for displaying detailed progress information
 */
export default function ProgressDetail({
  currentSize,
  startSize,
  goalSize,
  stageName,
  loading = false,
  unit = 'cm'
}: ProgressDetailProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Calculate progress percentage
  const progressPercentage = !loading 
    ? Math.min(
        100, 
        Math.round(
          ((currentSize - startSize) / 
          (goalSize - startSize)) * 100
        )
      )
    : 0;
  
  return (
    <YStack space={spacing.medium}>
      {/* Stage Badge */}
      <XStack>
        <Text 
          backgroundColor="#0A84FF" 
          color="white" 
          fontSize={fontSize.small}
          paddingHorizontal={spacing.medium}
          paddingVertical={6}
          borderRadius={50}
        >
          {stageName}
        </Text>
      </XStack>
      
      {/* Progress Bar */}
      <YStack width="100%" space={spacing.small}>
        <XStack justifyContent="space-between">
          <Text color={colors.textMuted} fontSize={fontSize.small}>
            Start: {startSize} {unit}
          </Text>
          <Text color={colors.textMuted} fontSize={fontSize.small}>
            Goal: {goalSize} {unit}
          </Text>
        </XStack>
        
        <View 
          backgroundColor="#222222" 
          height={14} 
          borderRadius={7} 
          overflow="hidden"
        >
          <View
            backgroundColor="#0A84FF"
            height="100%"
            width={`${progressPercentage}%`}
            borderRadius={7}
          />
        </View>
        
        <Text color={colors.text} fontSize={fontSize.small} textAlign="center">
          {progressPercentage}%
        </Text>
      </YStack>
      
      {/* Current size display */}
      <YStack alignItems="center" marginTop={spacing.xlarge} marginBottom={spacing.large}>
        <Text color={colors.textMuted} fontSize={fontSize.medium}>
          Current
        </Text>
        <Text
          color={colors.text}
          fontSize={32}
          fontWeight="700"
          marginTop={spacing.small}
        >
          {loading ? '...' : `${currentSize} ${unit}`}
        </Text>
      </YStack>
    </YStack>
  );
}
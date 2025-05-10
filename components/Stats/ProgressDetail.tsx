// components/Stats/ProgressDetail.tsx
import React from 'react';
import { YStack, Text, XStack, View } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import StageBadge from '@components/Badge/StageBadge';

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
 * A component for displaying detailed progress information - with clearer progress visualization
 */
export function ProgressDetail({
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
      {/* Stage Badge - with proper spacing */}
      <XStack paddingVertical={spacing.small}>
        <StageBadge stageName={stageName} type="primary" />
      </XStack>
      
      {/* Enhanced Progress Bar - much clearer than the original subtle line */}
      <View
        backgroundColor="#222222" // Darker background to match design
        borderRadius={10}
        padding={spacing.medium}
        marginTop={spacing.small}
      >
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
            backgroundColor="#333333" // Slightly lighter than container
            height={14} 
            borderRadius={7} 
            overflow="hidden"
          >
            <View
              backgroundColor="#0A84FF" // Bright blue to match design
              height="100%"
              width={`${progressPercentage}%`}
              borderRadius={7}
            />
          </View>
          
          <Text color={colors.text} fontSize={fontSize.small} textAlign="center">
            {progressPercentage}%
          </Text>
        </YStack>
      </View>
      
      {/* Current size display - with increased margin and larger font */}
      <YStack alignItems="center" marginTop={spacing.xlarge} marginBottom={spacing.large}>
        <Text color={colors.textMuted} fontSize={fontSize.medium}>
          Current
        </Text>
        <Text
          color={colors.text}
          fontSize={32} // Larger font size to match design
          fontWeight="700"
          marginTop={spacing.small}
        >
          {loading ? '...' : `${currentSize} ${unit}`}
        </Text>
      </YStack>
    </YStack>
  );
}

export default ProgressDetail;
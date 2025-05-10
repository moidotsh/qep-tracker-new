// components/Stats/ProgressDetail.tsx
import React from 'react';
import { YStack, Text, XStack, View } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import StageBadge from '../Badge/StageBadge';
import EnhancedProgressBar from '../Visualizations/ProgressBar/EnhancedProgressBar';

interface ProgressDetailProps {
  currentSize: number;
  startSize: number;
  goalSize: number;
  stageName: string;
  loading?: boolean;
  unit?: string;
}

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
      {/* Stage Badge - with proper spacing */}
      <XStack paddingVertical={spacing.small}>
        <StageBadge stageName={stageName} type="primary" />
      </XStack>
      
      {/* Enhanced Progress Bar */}
      <View
        backgroundColor="#222222" // Darker background to match design
        borderRadius={10}
        padding={spacing.medium}
        marginTop={spacing.small}
      >
        <EnhancedProgressBar
          percentage={progressPercentage}
          startLabel={`Start: ${startSize} ${unit}`}
          endLabel={`Goal: ${goalSize} ${unit}`}
          height={14} // Taller and more visible
          showPercentage={true}
          backgroundColor="#333333" // Slightly lighter than container
          fillColor="#0A84FF" // Bright blue to match design
        />
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
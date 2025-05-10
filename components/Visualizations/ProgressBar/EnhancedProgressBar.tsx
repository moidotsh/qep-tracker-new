// components/Visualizations/ProgressBar/EnhancedProgressBar.tsx
import React from 'react';
import { YStack, Text, XStack, View } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

interface EnhancedProgressBarProps {
  percentage: number;
  startLabel?: string;
  endLabel?: string;
  showPercentage?: boolean;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
  textColor?: string;
}

export default function EnhancedProgressBar({
  percentage,
  startLabel,
  endLabel,
  showPercentage = true,
  height = 10,
  backgroundColor,
  fillColor,
  textColor
}: EnhancedProgressBarProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Ensure percentage is within bounds
  const safePercentage = Math.max(0, Math.min(100, percentage));
  
  // Default colors
  const bgColor = backgroundColor || '#222222';
  const fgColor = fillColor || '#0A84FF';
  const txtColor = textColor || colors.text;
  
  return (
    <YStack space={spacing.small}>
      {/* Labels above bar */}
      <XStack justifyContent="space-between" alignItems="center">
        {startLabel && (
          <Text color={colors.textMuted} fontSize={fontSize.small}>
            {startLabel}
          </Text>
        )}
        
        {showPercentage && (
          <Text color={txtColor} fontSize={fontSize.medium} fontWeight="600">
            {safePercentage}%
          </Text>
        )}
        
        {endLabel && (
          <Text color={colors.textMuted} fontSize={fontSize.small}>
            {endLabel}
          </Text>
        )}
      </XStack>
      
      {/* Progress bar container */}
      <View
        height={height}
        backgroundColor={bgColor}
        borderRadius={height / 2}
        overflow="hidden"
        position="relative"
      >
        {/* Progress fill */}
        <View
          height={height}
          width={`${safePercentage}%`}
          backgroundColor={fgColor}
          borderRadius={height / 2}
        />
        
        {/* Optional percentage overlay - only shown when the bar is wide enough */}
        {showPercentage && safePercentage > 15 && (
          <Text
            position="absolute"
            color="white"
            fontSize={height > 15 ? fontSize.small : 10}
            fontWeight="bold"
            left={10}
            top={0}
            height={height}
            style={{
              lineHeight: height,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {safePercentage}%
          </Text>
        )}
      </View>
    </YStack>
  );
}
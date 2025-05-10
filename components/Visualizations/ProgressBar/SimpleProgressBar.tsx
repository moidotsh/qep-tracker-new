// components/Visualizations/ProgressBar/SimpleProgressBar.tsx
import React from 'react';
import { XStack, YStack, Text, View } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

interface SimpleProgressBarProps {
  /**
   * Current progress percentage (0-100)
   */
  percentage: number;
  
  /**
   * Show percentage text in the center
   */
  showPercentage?: boolean;
  
  /**
   * Height of the progress bar
   */
  height?: number;
  
  /**
   * Background color (uses theme cardAlt by default)
   */
  backgroundColor?: string;
  
  /**
   * Fill color (uses theme buttonBackground by default)
   */
  fillColor?: string;
  
  /**
   * Left label (optional)
   */
  leftLabel?: string;
  
  /**
   * Right label (optional)
   */
  rightLabel?: string;
  
  /**
   * Show labels
   */
  showLabels?: boolean;
}

/**
 * A simple progress bar for showing completion percentage
 */
export default function SimpleProgressBar({
  percentage,
  showPercentage = false,
  height = 10,
  backgroundColor,
  fillColor,
  leftLabel,
  rightLabel,
  showLabels = true,
}: SimpleProgressBarProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  // Use theme colors as defaults
  const bgColor = backgroundColor || colors.cardAlt;
  const fgColor = fillColor || colors.buttonBackground;
  
  // Ensure percentage is within bounds
  const safePercentage = Math.max(0, Math.min(100, percentage));
  
  return (
    <YStack>
      {showLabels && (leftLabel || rightLabel) && (
        <XStack justifyContent="space-between" marginBottom={spacing.small}>
          {leftLabel && (
            <Text color={colors.textMuted} fontSize={fontSize.small}>
              {leftLabel}
            </Text>
          )}
          {rightLabel && (
            <Text color={colors.textMuted} fontSize={fontSize.small}>
              {rightLabel}
            </Text>
          )}
        </XStack>
      )}
      
      <YStack
        backgroundColor={bgColor}
        height={height}
        borderRadius={height / 2}
        overflow="hidden"
        position="relative"
      >
        <YStack
          backgroundColor={fgColor}
          height={height}
          width={`${safePercentage}%`}
          borderRadius={height / 2}
        />
        
        {showPercentage && (
          <Text
            position="absolute"
            width="100%"
            height="100%"
            textAlign="center"
            color="white"
            fontWeight="600"
            style={{
              lineHeight: height,
              textShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}
          >
            {safePercentage}%
          </Text>
        )}
      </YStack>
    </YStack>
  );
}
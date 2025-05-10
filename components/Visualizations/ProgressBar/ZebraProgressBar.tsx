// components/Visualizations/ProgressBar/ZebraProgressBar.tsx
import React from 'react';
import { Platform } from 'react-native';
import { XStack, YStack, Text, View } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

interface ZebraProgressBarProps {
  /**
   * Current value
   */
  value: number;
  
  /**
   * Maximum value
   */
  maxValue: number;
  
  /**
   * Already used value (shown with zebra pattern)
   */
  usedValue?: number;
  
  /**
   * Format function for labels
   */
  formatLabel?: (value: number) => string;
  
  /**
   * Height of the progress bar
   */
  height?: number;
  
  /**
   * Show min/max labels
   */
  showLabels?: boolean;
  
  /**
   * Custom label for minimum value
   */
  minLabel?: string;
  
  /**
   * Custom label for maximum value
   */
  maxLabel?: string;
  
  /**
   * Additional info to show with max label
   */
  maxLabelInfo?: string;
}

/**
 * A progress bar that supports showing already used portions with a zebra pattern
 */
export default function ZebraProgressBar({
  value,
  maxValue,
  usedValue = 0,
  formatLabel = (val) => `${val}`,
  height = 12,
  showLabels = true,
  minLabel = '0h',
  maxLabel,
  maxLabelInfo,
}: ZebraProgressBarProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  const isWeb = Platform.OS === 'web';
  
  // Calculate percentages
  const usedPercentage = Math.min(100, (usedValue / maxValue) * 100);
  const currentPercentage = Math.min(100, (value / maxValue) * 100);
  
  // Prevent negative values
  const safeUsedPercentage = Math.max(0, usedPercentage);
  const safeCurrentPercentage = Math.max(0, currentPercentage);
  
  return (
    <YStack marginBottom={spacing.medium}>
      {showLabels && (
        <XStack justifyContent="space-between" marginBottom={spacing.xs}>
          <Text color={colors.textMuted} fontSize={fontSize.small}>
            {minLabel}
          </Text>
          <Text color={colors.textMuted} fontSize={fontSize.small}>
            {maxLabel || formatLabel(maxValue)} {maxLabelInfo && `(${maxLabelInfo})`}
          </Text>
        </XStack>
      )}
      
      {/* Progress bar container */}
      <View
        height={height}
        backgroundColor={colors.cardAlt}
        borderRadius={height / 2}
        overflow="hidden"
        position="relative"
      >
        {/* Zebra Pattern for Already Used Time */}
        {usedValue > 0 && (
          <View
            position="absolute"
            left={0}
            top={0}
            width={`${safeUsedPercentage}%`}
            height="100%"
            overflow="hidden"
          >
            {/* Actual zebra pattern */}
            <View
              width="100%"
              height="100%"
              style={{
                backgroundImage: isWeb ?
                  'repeating-linear-gradient(45deg, rgba(0,0,0,0), rgba(0,0,0,0) 5px, rgba(0,0,0,0.2) 5px, rgba(0,0,0,0.2) 10px)' :
                  undefined,
                // For native platforms, use a backgroundColor with some opacity instead
                backgroundColor: !isWeb ? 'rgba(100, 100, 100, 0.3)' : undefined
              }}
            />
          </View>
        )}
        
        {/* Current Value Bar */}
        <View
          height={height}
          width={`${safeCurrentPercentage}%`}
          backgroundColor={colors.buttonBackground}
          borderRadius={height / 2}
          position="absolute"
          left={`${safeUsedPercentage}%`}
          top={0}
        />
      </View>
    </YStack>
  );
}
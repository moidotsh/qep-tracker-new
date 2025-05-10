// components/Visualizations/ProgressBar/ZebraProgressBar.tsx
import React from 'react';
import { Platform, View as RNView } from 'react-native';
import { XStack, YStack, Text, View } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

interface ZebraProgressBarProps {
  value: number;
  maxValue: number;
  usedValue?: number;
  formatLabel?: (value: number) => string;
  height?: number;
  showLabels?: boolean;
  minLabel?: string;
  maxLabel?: string;
  maxLabelInfo?: string;
}

// Custom zebra pattern component that works on both web and native
const ZebraPattern = ({ width, height }: { width: string, height: number }) => {
  const isWeb = Platform.OS === 'web';
  
  if (isWeb) {
    // Use CSS gradient on web for better performance
    return (
      <View
        width={width}
        height={height}
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0), rgba(0,0,0,0) 5px, rgba(0,0,0,0.2) 5px, rgba(0,0,0,0.2) 10px)',
        }}
      />
    );
  } else {
    // For native, create a series of small diagonal lines
    return (
      <RNView
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#333333',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Create many small diagonal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <RNView
            key={i}
            style={{
              position: 'absolute',
              width: 2,
              height: height * 2,
              backgroundColor: '#444444',
              top: -height / 2,
              left: i * 6 - 10,
              transform: [{ rotate: '45deg' }]
            }}
          />
        ))}
      </RNView>
    );
  }
};

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
            <ZebraPattern width="100%" height={height} />
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
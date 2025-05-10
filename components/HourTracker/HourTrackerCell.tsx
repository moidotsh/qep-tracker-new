// components/HourTracker/HourTrackerCell.tsx
import React from 'react';
import { View, Text } from 'tamagui';
import { Platform } from 'react-native';

export interface HourTrackerCellProps {
  size: number;
  fillColor: string;
  borderColor: string;
  borderWidth: number;
  showPartial?: boolean;
  partialHeightRatio?: number;
  isFullyFilled?: boolean;
  forceVisible?: boolean;
}

export default function HourTrackerCell({
  size,
  fillColor,
  borderColor,
  borderWidth,
  showPartial = false,
  partialHeightRatio = 0,
  isFullyFilled = false,
  forceVisible = false
}: HourTrackerCellProps) {
  const isWeb = Platform.OS === 'web';
  
  // For web, ensure size is never too small
  const MIN_SIZE = 30;
  
  // Use the provided size (responsive), but enforce minimum
  const finalSize = Math.max(size, MIN_SIZE);
  
  // Choose appropriate size for text based on cell size
  const textSize = finalSize < 36 ? 11 : (finalSize < 44 ? 13 : 15);
  
  // Enhanced borders for better visibility
  const effectiveBorderWidth = isWeb ? Math.max(borderWidth, 1.5) : borderWidth;
  
  return (
    <View
      width={finalSize}
      height={finalSize}
      backgroundColor={fillColor}
      borderWidth={effectiveBorderWidth}
      borderColor={borderColor}
      borderRadius={6}
      margin={1}
      position="relative"
      overflow="hidden"
      justifyContent="center"
      alignItems="center"
      // Enhanced shadows for better visibility on web
      {...(isWeb ? {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        style: {
          minWidth: MIN_SIZE,
          minHeight: MIN_SIZE
        }
      } : {
        elevation: 2
      })}
    >
      {/* Partial fill overlay */}
      {showPartial && (
        <>
          <View
            position="absolute"
            bottom={0}
            left={0}
            width="100%"
            height={`${partialHeightRatio * 100}%`}
            backgroundColor="rgba(255, 255, 255, 0.3)"
          />
          {partialHeightRatio < 1 && partialHeightRatio > 0 && (
            <View
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
              padding={2}
            >
              <Text
                fontSize={textSize}
                fontWeight="bold"
                color="#ffffffdd"
                textAlign="center"
              >
                {`${Math.round(partialHeightRatio * 100)}%`}
              </Text>
            </View>
          )}
        </>
      )}

      {/* Checkmark for completed cells */}
      {isFullyFilled && (
        <Text
          color="#ffffff"
          fontSize={textSize}
          fontWeight="bold"
          position="absolute"
          top={finalSize < 36 ? 1 : 2}
          right={finalSize < 36 ? 2 : 3}
        >
          ✓
        </Text>
      )}
    </View>
  );
}
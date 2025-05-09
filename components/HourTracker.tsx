// components/HourTracker.tsx
import React from 'react';
import { View, XStack, YStack, Text } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface HourTrackerProps {
  totalHours: number;
  stageName?: string;
  percentage?: number;
}

export function HourTracker({ 
  totalHours, 
  stageName = "Starting", 
  percentage = 0 
}: HourTrackerProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  // Calculate filled cells
  const totalFilledCells = Math.floor(totalHours / 8);
  const partialFill = totalHours % 8;
  
  // For now, we'll just show a 4x4 grid (16 cells)
  const GRID_SIZE = 4;
  const cells = [];
  
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      const cellIndex = i * GRID_SIZE + j;
      const isFilled = cellIndex < totalFilledCells;
      const isPartial = cellIndex === totalFilledCells && partialFill > 0;
      const isSpecial = cellIndex === 2 || cellIndex === 6 || cellIndex === 11; // Special cells
      
      let fillColor = colors.cardAlt;
      if (isFilled) {
        fillColor = isSpecial ? '#00c896' : colors.cardAlt; // Green for special cells
      } else if (isPartial) {
        fillColor = colors.cardAlt; // Partial fill
      }
      
      row.push(
        <View
          key={`cell-${i}-${j}`}
          width={40}
          height={40}
          backgroundColor={fillColor}
          borderWidth={1}
          borderColor={colors.border}
          borderRadius={6}
          margin={2}
          opacity={isFilled || isPartial ? 1 : 0.7}
        >
          {isPartial && (
            <View
              position="absolute"
              bottom={0}
              left={0}
              width="100%"
              height={`${(partialFill / 8) * 100}%`}
              backgroundColor="#0A84FF"
              opacity={0.6}
            />
          )}
        </View>
      );
    }
    cells.push(
      <XStack key={`row-${i}`} justifyContent="center" marginVertical={2}>
        {row}
      </XStack>
    );
  }
  
  return (
    <YStack width="100%">
      <XStack justifyContent="space-between" alignItems="center" marginBottom={spacing.small}>
        <Text color={colors.textSecondary} fontSize={fontSize.small}>
          Current Stage: {stageName}
        </Text>
        <Text color={colors.text} fontSize={fontSize.small} fontWeight="500">
          {percentage}%
        </Text>
      </XStack>
      
      <YStack
        backgroundColor={colors.card}
        borderRadius={borderRadius.medium}
        padding={spacing.medium}
        alignItems="center"
      >
        {cells}
      </YStack>
    </YStack>
  );
}
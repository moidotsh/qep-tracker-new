// components/HourTracker/HourTracker.tsx
import React from 'react';
import { YStack, Button, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import { HourTrackerRow } from './HourTrackerRow';
import { useWindowDimensions } from 'react-native';

interface HourTrackerProps {
  stageName: string;
  percentage: number;
  onPress?: () => void;
}

export function HourTracker({ stageName, percentage, onPress }: HourTrackerProps) {
  const { colors, spacing } = useAppTheme();
  const { width } = useWindowDimensions();
  const isNarrow = width < 350;
  
  // In a real implementation, we would calculate which rows to show
  // based on the current progress
  const visibleRows = 3; // Show 3 rows
  const startRow = 0; // Start from the first row
  
  // Calculate cell size based on available width
  const cellSize = Math.max(
    Math.floor((width - (isNarrow ? 60 : 80)) / 8) - 2, // 8 columns, with some margin
    30 // Minimum cell size
  );
  
  const rows = [];
  for (let i = startRow; i < startRow + visibleRows; i++) {
    rows.push(
      <HourTrackerRow key={`row-${i}`} row={i} cellSize={cellSize} />
    );
  }
  
  return (
    <YStack>
      <YStack
        alignItems="center"
        padding={spacing.small}
        onPress={onPress}
        pressStyle={{ opacity: 0.8 }}
        cursor={onPress ? 'pointer' : 'default'}
      >
        {rows}
      </YStack>
      
      <Button
        backgroundColor="#0A84FF"
        height={60}
        justifyContent="center"
        alignItems="center"
        borderRadius={0}
        marginHorizontal={-spacing.large}
        marginBottom={-spacing.large}
        marginTop={spacing.medium}
        pressStyle={{ opacity: 0.9 }}
        onPress={() => console.log('Log Session pressed')}
        cursor="pointer"
      >
        <Text
          color="white"
          fontSize={16}
          fontWeight="600"
        >
          Log Session
        </Text>
      </Button>
    </YStack>
  );
}
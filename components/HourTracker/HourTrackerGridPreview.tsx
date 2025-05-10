// components/HourTracker/HourTrackerGridPreview.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import { YStack, Button, Text, ScrollView } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import HourTrackerRow from './HourTrackerRow';
import { GRID_COLUMNS, getVisibleRowsForPreview } from './HourTrackerLogic';

interface HourTrackerGridPreviewProps {
  onLogSession: () => void;
  onShowFullGrid?: () => void;
  visibleRowCount?: number;
}

export default function HourTrackerGridPreview({
  onLogSession,
  onShowFullGrid,
  visibleRowCount = 3
}: HourTrackerGridPreviewProps) {
  const { colors, spacing, fontSize, borderRadius, constrainedView } = useAppTheme();
  const { width } = useWindowDimensions();
  const isNarrow = width < 350;
  const isWeb = Platform.OS === 'web';
  
  // State to force rendering after mount
  const [isReady, setIsReady] = useState(!isWeb); // Start ready if not web
  const initialRenderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Fixed cell sizes for constrained view
  const FIXED_CELL_SIZE = 40; // Fixed size for cells (ignores screen width)
  const MIN_CELL_SIZE = 32; // Minimum cell size
  
  // Calculate cell size based on constraints
  const cellSize = (isWeb && constrainedView) 
    ? FIXED_CELL_SIZE
    : Math.max(
        Math.floor((Math.min(width, 500) - (isNarrow ? 60 : 80)) / GRID_COLUMNS) - 2,
        MIN_CELL_SIZE
      );
  
  // Determine which rows to display
  const { startRow, endRow } = getVisibleRowsForPreview(visibleRowCount);

  // Force a render after component mounts on web
  useEffect(() => {
    if (isWeb) {
      // Set timeout to trigger a re-render
      initialRenderTimeoutRef.current = setTimeout(() => {
        setIsReady(true);
      }, 100);
    }
    
    // Clear any existing timeout on unmount
    return () => {
      if (initialRenderTimeoutRef.current) {
        clearTimeout(initialRenderTimeoutRef.current);
      }
    };
  }, [isWeb]);

  // Generate preview grid for visible rows
  const renderPreviewGrid = () => {
    const rows = [];
    
    for (let row = startRow; row <= endRow; row++) {
      rows.push(
        <HourTrackerRow
          key={`row-${row}`}
          row={row}
          cellSize={cellSize}
          forceVisible={true}
        />
      );
    }
    
    return rows;
  };

  // Show loading placeholder on web before ready
  if (isWeb && !isReady) {
    return (
      <YStack>
        <YStack 
          height={FIXED_CELL_SIZE * (endRow - startRow + 1) + 20}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text color={colors.textMuted}>Loading grid...</Text>
        </YStack>
        
        <Button
          backgroundColor="#0A84FF"
          height={60}
          justifyContent="center"
          alignItems="center"
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          borderBottomLeftRadius={borderRadius.medium}
          borderBottomRightRadius={borderRadius.medium}
          pressStyle={{ opacity: 0.9 }}
          onPress={onLogSession}
          marginTop={spacing.medium}
          marginHorizontal={-spacing.large}
          marginBottom={-spacing.large}
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

  // Determine if horizontal scrolling is needed
  const needsHorizontalScroll = isWeb && constrainedView 
    ? true 
    : cellSize * GRID_COLUMNS > Math.min(width, 500);

  return (
    <YStack>
      <YStack 
        alignItems="center" 
        paddingBottom={spacing.medium}
        position="relative"
        opacity={1}
        hoverStyle={{ cursor: 'pointer' }}
        onPress={onShowFullGrid}
        minHeight={cellSize * (endRow - startRow + 1) + 8}
      >
        <ScrollView 
          horizontal={needsHorizontalScroll}
          showsHorizontalScrollIndicator={needsHorizontalScroll}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: needsHorizontalScroll ? spacing.small : 0
          }}
        >
          <YStack alignItems="center">
            {renderPreviewGrid()}
          </YStack>
        </ScrollView>
      </YStack>

      <Button
        backgroundColor="#0A84FF"
        height={60}
        justifyContent="center"
        alignItems="center"
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        borderBottomLeftRadius={borderRadius.medium}
        borderBottomRightRadius={borderRadius.medium}
        pressStyle={{ opacity: 0.9 }}
        onPress={onLogSession}
        marginTop={spacing.medium}
        marginHorizontal={-spacing.large}
        marginBottom={-spacing.large}
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
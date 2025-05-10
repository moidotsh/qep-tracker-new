// components/HourTracker/HourTrackerGridPreview.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useWindowDimensions, Platform } from 'react-native';
import {
  YStack,
  XStack,
  Button,
  Text,
  ScrollView
} from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import HourTrackerRow from './HourTrackerRow';
import {
  GRID_COLUMNS,
  getVisibleRowsForPreview
} from './HourTrackerLogic';

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
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  const { width } = useWindowDimensions();
  const isNarrow = width < 350;
  const isWeb = Platform.OS === 'web';
  
  // State to force rendering after mount
  const [isReady, setIsReady] = useState(!isWeb); // Start ready if not web
  const initialRenderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Use fixed cell sizes to prevent cells from becoming too small
  const FIXED_CELL_SIZE = 40; // Fixed minimum size for cells (ignores screen width)
  const MIN_CELL_SIZE = 32; // Never go smaller than this
  
  // Calculate cell size based on available width
  const cellSize = Math.max(
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

  // Generate preview grid - only for the visible rows
  const renderPreviewGrid = () => {
    const rows = [];
    
    for (let row = startRow; row <= endRow; row++) {
      rows.push(
        <HourTrackerRow
          key={`row-${row}`}
          row={row}
          cellSize={cellSize}
        />
      );
    }
    
    return rows;
  };

  // If web and not ready, show a temporary placeholder until proper rendering
  if (isWeb && !isReady) {
    return (
      <YStack>
        {/* Placeholder with exact dimensions to reserve space */}
        <YStack 
          height={FIXED_CELL_SIZE * (endRow - startRow + 1) + 20}
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text color={colors.textMuted}>Loading grid...</Text>
        </YStack>
        
        {/* Log Session Button */}
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
          marginHorizontal={-spacing.large}
          marginBottom={-spacing.large}
          marginTop={spacing.medium}
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

  // Always enable horizontal scrolling to prevent overlap
  const needsHorizontalScroll = cellSize * GRID_COLUMNS > Math.min(width, 500);

  return (
    <YStack>
      {/* Grid container */}
      <YStack 
        alignItems="center" 
        paddingBottom={spacing.medium}
        position="relative"
        opacity={1}
        onPress={onShowFullGrid}
        // Set a minimum height to prevent layout shifts
        minHeight={cellSize * (endRow - startRow + 1) + 8}
        cursor={onShowFullGrid ? 'pointer' : 'default'}
        pressStyle={onShowFullGrid ? { opacity: 0.8 } : undefined}
      >
        {/* Make this a horizontal scrollable container if needed */}
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

      {/* Full width button that attaches to the bottom of the card */}
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
        marginHorizontal={-spacing.large}
        marginBottom={-spacing.large}
        marginTop={spacing.medium}
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
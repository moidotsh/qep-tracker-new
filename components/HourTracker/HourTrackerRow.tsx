// components/HourTracker/HourTrackerRow.tsx
import React from 'react';
import { XStack } from 'tamagui';
import { Platform } from 'react-native';
import HourTrackerCell from './HourTrackerCell';
import { 
  GRID_COLUMNS,
  getCellRenderingProps
} from './HourTrackerLogic';

export interface HourTrackerRowProps {
  row: number;
  cellSize: number;
}

export default function HourTrackerRow({ row, cellSize }: HourTrackerRowProps) {
  const rowCells = [];
  const isWeb = Platform.OS === 'web';
  
  // If on web, ensure cellSize is never too small
  const finalCellSize = isWeb ? Math.max(cellSize, 28) : cellSize;
  
  for (let col = 0; col < GRID_COLUMNS; col++) {
    const cellIndex = row * GRID_COLUMNS + col;
    const {
      fillColor,
      borderColor,
      borderWidth,
      showPartial,
      partialHeightRatio,
      isFullyFilled
    } = getCellRenderingProps(cellIndex);
    
    rowCells.push(
      <HourTrackerCell
        key={`cell-${row}-${col}`}
        size={finalCellSize}
        fillColor={fillColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        showPartial={showPartial}
        partialHeightRatio={partialHeightRatio}
        isFullyFilled={isFullyFilled}
      />
    );
  }
  
  return (
    <XStack 
      key={`row-${row}`} 
      justifyContent="center"
      alignItems="center"
      space={1}
      // Enforce minimum width to prevent row from shrinking too much
      minWidth={isWeb ? GRID_COLUMNS * Math.max(finalCellSize, 28) : undefined}
    >
      {rowCells}
    </XStack>
  );
}
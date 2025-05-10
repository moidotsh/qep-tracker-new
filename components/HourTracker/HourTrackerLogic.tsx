// components/HourTracker/HourTrackerLogic.ts
// Calculate and track progress through the program stages

// For now we'll use a global variable for tracking total hours
// In a real implementation, this would be stored in AsyncStorage or similar
let totalTrainingHours = 0;

// Type for tracking cell status
export type CellStatus = 'empty' | 'filled' | 'blue' | 'orange' | 'green';

// Training program stages
export interface ProgramStage {
  name: string;
  startCell: number;
  endCell: number;
}

// Define the stages of the program
export const PROGRAM_STAGES: ProgramStage[] = [
  {
    name: "Adaptation 1",
    startCell: 0,  // Cell 1 (0-indexed)
    endCell: 2,    // Cell 2
  },
  {
    name: "Adaptation 2",
    startCell: 2,  // Cell 3 (Green)
    endCell: 6,    // Cell 7 (Green)
  },
  {
    name: "Adaptation 3",
    startCell: 7,  // Cell 8
    endCell: 10,   // Cell 11
  },
  {
    name: "Evolution",
    startCell: 11, // Cell 12 (Green)
    endCell: 66,   // Cell 67
  },
  {
    name: "Advanced",
    startCell: 67, // Cell 68 (Green)
    endCell: 501,  // Cell 502 (Green, final checkpoint)
  }
];

// Cell positions where colored cells should appear (based on the PDF document)
// Note: these indexes are zero-based for grid cells
export const SPECIAL_CELLS: Record<number, CellStatus> = {
    // adaptation
    2: 'green',
    6: 'green',
    // evolution
    11: 'green',
    18: 'green',
    25: 'green',
    32: 'green',
    39: 'green',
    46: 'blue', // Blue cell (equalization point)
    53: 'green',
    60: 'green',
    // advanced period
    67: 'green',
    81: 'green',
    95: 'green',
    109: 'orange',
    123: 'green',
    137: 'green',
    151: 'green',
    165: 'green',
    179: 'green',
    193: 'green',
    207: 'green',
    221: 'green',
    235: 'green',
    249: 'green',
    263: 'green',
    277: 'green',
    291: 'green',
    305: 'green',
    319: 'green',
    333: 'green',
    347: 'green',
    361: 'green',
    375: 'green',
    389: 'green',
    403: 'green',
    417: 'green',
    431: 'green',
    445: 'green',
    459: 'green',
    473: 'green',
    487: 'green',
    501: 'green', // second checkpoint
};

// Grid dimensions
export const GRID_COLUMNS = 8;
export const GRID_ROWS = 14;

// Color definitions for the grid
export const GRID_COLORS = {
    empty: '#1c1c1e',
    filled: '#2c2c2e',
    green: '#00c896',
    blue: '#0A84FF',
    orange: '#FF9F0A',
    border: '#3a3a3c',
    partialOverlay: 'rgba(255, 255, 255, 0.25)',
    zebraPattern: 'rgba(100, 100, 100, 0.3)',
};

/**
 * Get base color for a cell based on its special status
 */
export function getBaseColor(status?: CellStatus): [string, string] {
    switch (status) {
        case 'green':
            return [GRID_COLORS.green, GRID_COLORS.border];
        case 'blue':
            return [GRID_COLORS.blue, GRID_COLORS.border];
        case 'orange':
            return [GRID_COLORS.orange, GRID_COLORS.border];
        default:
            return [GRID_COLORS.empty, GRID_COLORS.border];
    }
}

/**
 * Darken a hex color by a specified amount
 */
export function darkenColor(hex: string, amount = 100): string {
    const clamp = (v: number) => Math.max(0, Math.min(255, v));
    const num = parseInt(hex.slice(1), 16);
    const r = clamp((num >> 16) - amount);
    const g = clamp(((num >> 8) & 0x00FF) - amount);
    const b = clamp((num & 0x0000FF) - amount);
    return `rgb(${r},${g},${b})`;
}

/**
 * Set the total training hours - normally called from outside
 */
export function setTotalTrainingHours(hours: number) {
    totalTrainingHours = hours;
}

/**
 * Calculate progress metrics for the hour tracker
 */
export function calculateProgress() {
    const totalFilledCells = Math.floor(totalTrainingHours / 8);
    const partialFill = totalTrainingHours % 8;
    const currentRow = Math.floor(totalFilledCells / GRID_COLUMNS);
    
    return {
        totalFilledCells,
        partialFill,
        currentRow,
        partialFillPercentage: Math.round((partialFill / 8) * 100)
    };
}

/**
 * Calculate the current program stage and percentage complete
 */
export function getCurrentStageProgress(): { stageName: string; percentage: number } {
    const { totalFilledCells, partialFill } = calculateProgress();
    const currentCellIndex = totalFilledCells; // Current filled cell (0-indexed)
    const partialProgress = partialFill / 8; // Partial progress to next cell (0-1)
    
    // Find which stage the user is currently in
    let currentStage: ProgramStage | undefined;
    
    for (const stage of PROGRAM_STAGES) {
        if (currentCellIndex >= stage.startCell && currentCellIndex <= stage.endCell) {
            currentStage = stage;
            break;
        }
    }
    
    // If we've completed all stages (should be rare)
    if (!currentStage) {
        // Find the last stage
        currentStage = PROGRAM_STAGES[PROGRAM_STAGES.length - 1];
        return {
            stageName: currentStage.name,
            percentage: 100
        };
    }
    
    // Calculate progress percentage within the current stage
    const stageLength = currentStage.endCell - currentStage.startCell + 1;
    const completedCellsInStage = currentCellIndex - currentStage.startCell;
    
    // If this is the last cell in the stage, factor in the partial progress
    let stagePercentage = 0;
    if (currentCellIndex === currentStage.endCell) {
        stagePercentage = ((completedCellsInStage + partialProgress) / stageLength) * 100;
    } else {
        stagePercentage = ((completedCellsInStage + partialProgress) / stageLength) * 100;
    }
    
    return {
        stageName: currentStage.name,
        percentage: Math.round(stagePercentage)
    };
}

/**
 * Determine if a cell is the active cell (what the user is currently working on)
 */
export function isActiveCell(cellIndex: number): boolean {
    const { totalFilledCells, partialFill } = calculateProgress();
    
    if (totalFilledCells === 0) {
        // If they haven't started yet, highlight the first cell
        return cellIndex === 0;
    } else if (partialFill > 0) {
        // If there's partial progress, highlight that cell
        return cellIndex === totalFilledCells;
    } else {
        // If no partial progress, highlight the next cell after completed ones
        return cellIndex === totalFilledCells;
    }
}

/**
 * Calculate the cell rendering properties (colors, fill status, etc)
 */
export function getCellRenderingProps(cellIndex: number) {
    const { totalFilledCells, partialFill } = calculateProgress();
    const status = SPECIAL_CELLS[cellIndex];
    const [baseColor, baseBorder] = getBaseColor(status);

    let fillColor = baseColor;
    let borderColor = baseBorder;
    let showPartial = false;
    let partialHeightRatio = 0;

    const isFullyFilled = cellIndex < totalFilledCells;
    const isPartial = cellIndex === totalFilledCells && partialFill > 0;
    const active = isActiveCell(cellIndex);

    if (isFullyFilled) {
        if (status) {
            fillColor = darkenColor(baseColor, 40);
            borderColor = baseBorder;
        } else {
            fillColor = GRID_COLORS.filled;
            borderColor = GRID_COLORS.border;
        }
    }

    if (isPartial) {
        showPartial = true;
        partialHeightRatio = partialFill / 8;
    }

    return {
        fillColor,
        borderColor: active ? GRID_COLORS.blue : borderColor,
        borderWidth: active ? 2 : 1,
        showPartial,
        partialHeightRatio,
        isFullyFilled,
        isPartial
    };
}

/**
 * Get the visible rows for the preview grid
 */
export function getVisibleRowsForPreview(visibleRowCount = 3) {
    const { currentRow } = calculateProgress();
    
    // Start with row above current, current row, and row below
    let startRow = Math.max(0, currentRow - 1);
    
    // If we're at the beginning, just show first 3 rows
    if (currentRow === 0) {
        startRow = 0;
    }
    
    // If we're at the end, show the last 3 rows
    const endRow = Math.min(startRow + visibleRowCount - 1, GRID_ROWS - 1);
    
    // Adjust start row if we're at the end
    if (endRow === GRID_ROWS - 1 && endRow - startRow < visibleRowCount - 1) {
        startRow = Math.max(0, GRID_ROWS - visibleRowCount);
    }
    
    return { startRow, endRow };
}
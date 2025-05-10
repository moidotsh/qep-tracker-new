// components/Settings/VersionDisplay.tsx
import React from 'react';
import { YStack, Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface VersionDisplayProps {
  /**
   * Current app version
   */
  version: string;
  
  /**
   * Margin top for the component
   */
  marginTop?: number | string;
  
  /**
   * Custom label before the version number
   */
  label?: string;
}

/**
 * A component to display app version information - with correct spacing
 */
export function VersionDisplay({
  version,
  marginTop,
  label = "Version"
}: VersionDisplayProps) {
  const { colors, fontSize, spacing } = useAppTheme();
  
  return (
    <YStack 
      alignItems="center" 
      marginTop={marginTop || 40} // Increased margin top to match design
      marginBottom={spacing.large}
    >
      <Text 
        color={colors.textMuted} 
        fontSize={13} // Specific size to match design
      >
        {label} {version}
      </Text>
    </YStack>
  );
}

export default VersionDisplay;
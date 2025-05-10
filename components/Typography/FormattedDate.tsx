// components/Typography/FormattedDate.tsx
import React from 'react';
import { Text } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface FormattedDateProps {
  /**
   * The date string to display
   */
  date: string;
  
  /**
   * Custom font size
   */
  fontSize?: number;
  
  /**
   * Custom letter spacing
   */
  letterSpacing?: number;
  
  /**
   * Additional className for the text
   */
  className?: string;
  
  /**
   * Whether to use uppercase text
   */
  uppercase?: boolean;
}

/**
 * Displays a formatted date with consistent styling
 */
export function FormattedDate({
  date,
  fontSize,
  letterSpacing = 1.1,
  className,
  uppercase = false
}: FormattedDateProps) {
  const { colors, fontSize: themeFont } = useAppTheme();
  
  return (
    <Text
      color={colors.text}
      fontSize={fontSize || themeFont.small}
      fontWeight={300}
      style={{
        letterSpacing,
        textTransform: uppercase ? 'uppercase' : 'none',
      }}
      className={className}
    >
      {date}
    </Text>
  );
}

export default FormattedDate;
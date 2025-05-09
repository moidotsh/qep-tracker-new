// components/FormattedDate.tsx
import React from 'react';
import { Text } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface FormattedDateProps {
  date: string;
  fontSize?: number;
  letterSpacing?: number;
  uppercase?: boolean;
}

export function FormattedDate({ 
  date, 
  fontSize,
  letterSpacing = 1.1, 
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
    >
      {date}
    </Text>
  );
}
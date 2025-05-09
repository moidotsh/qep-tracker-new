// components/Card.tsx
import React, { ReactNode } from 'react';
import { YStack } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface CardProps {
  children: ReactNode;
  marginTop?: number;
  marginBottom?: number;
  padding?: number;
}

export function Card({ children, marginTop, marginBottom, padding }: CardProps) {
  const { colors, spacing, borderRadius } = useAppTheme();
  
  return (
    <YStack
      backgroundColor={colors.card}
      borderRadius={borderRadius.medium}
      padding={padding !== undefined ? padding : spacing.large}
      marginTop={marginTop}
      marginBottom={marginBottom}
      width="100%"
    >
      {children}
    </YStack>
  );
}
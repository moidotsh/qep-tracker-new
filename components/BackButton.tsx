// components/BackButton.tsx
import React from 'react';
import { Button } from 'tamagui';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useAppTheme } from './ThemeProvider';
import { goBack, NavigationPath } from '../navigation';

interface BackButtonProps {
  currentPath: NavigationPath;
  onPress?: () => void;
}

export default function BackButton({ currentPath, onPress }: BackButtonProps) {
  const { colors } = useAppTheme();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      goBack(currentPath);
    }
  };
  
  return (
    <Button
      size="$3"
      circular
      icon={<ChevronLeft size={20} color={colors.text} />}
      backgroundColor="transparent"
      onPress={handlePress}
      paddingLeft={0}
    />
  );
}
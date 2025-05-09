// components/AppButton.tsx
import React from 'react';
import { Button, Text } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'subtle';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  marginTop?: number;
  marginBottom?: number;
}

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  icon,
  marginTop,
  marginBottom
}: AppButtonProps) {
  const { colors, fontSize, borderRadius } = useAppTheme();
  
  // Get button styles based on variant
  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.cardAlt,
          color: colors.text
        };
      case 'subtle':
        return {
          backgroundColor: 'transparent',
          color: colors.text
        };
      default: // primary
        return {
          backgroundColor: disabled ? colors.buttonBackgroundDisabled : colors.buttonBackground,
          color: 'white'
        };
    }
  };
  
  // Get button size
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return {
          height: 40,
          fontSize: fontSize.small,
          paddingHorizontal: 16
        };
      case 'large':
        return {
          height: 56,
          fontSize: fontSize.large,
          paddingHorizontal: 24
        };
      default: // medium
        return {
          height: 48,
          fontSize: fontSize.medium,
          paddingHorizontal: 20
        };
    }
  };
  
  const { backgroundColor, color } = getButtonStyles();
  const { height, fontSize: textSize, paddingHorizontal } = getButtonSize();
  
  return (
    <Button
      backgroundColor={backgroundColor}
      height={height}
      borderRadius={variant === 'subtle' ? borderRadius.small : borderRadius.pill}
      paddingHorizontal={paddingHorizontal}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      opacity={disabled ? 0.7 : 1}
      width={fullWidth ? '100%' : 'auto'}
      marginTop={marginTop}
      marginBottom={marginBottom}
      pressStyle={{ opacity: 0.8 }}
    >
      <Text color={color} fontSize={textSize} fontWeight="600">
        {label}
      </Text>
    </Button>
  );
}
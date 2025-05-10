// components/Buttons/IconButton.tsx
import React from 'react';
import { Button, View } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';
import { ButtonVariant } from './AppButton';

interface IconButtonProps {
  /**
   * The icon to display
   */
  icon: React.ReactNode;
  
  /**
   * Function to call when button is pressed
   */
  onPress?: () => void;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Button variant (style)
   */
  variant?: ButtonVariant;
  
  /**
   * Whether the button should be circular
   */
  circular?: boolean;
  
  /**
   * Icon size (affects button size)
   */
  size?: number;
  
  /**
   * Custom icon color
   */
  iconColor?: string;
  
  /**
   * Custom background color
   */
  backgroundColor?: string;
  
  /**
   * Additional style props to apply
   */
  style?: any;
}

/**
 * A button that contains only an icon
 */
export function IconButton({
  icon,
  onPress,
  disabled = false,
  variant = 'primary',
  circular = true,
  size = 20,
  iconColor,
  backgroundColor,
  style
}: IconButtonProps) {
  const { colors } = useAppTheme();
  
  // Get button styles based on variant
  const getButtonStyles = () => {
    if (backgroundColor) {
      return { backgroundColor };
    }
    
    switch (variant) {
      case 'secondary':
        return { backgroundColor: colors.cardAlt };
      case 'subtle':
        return { backgroundColor: 'transparent' };
      case 'danger':
        return { backgroundColor: colors.alert };
      default: // primary
        return { backgroundColor: disabled ? colors.buttonBackgroundDisabled : colors.buttonBackground };
    }
  };
  
  // Get icon color
  const getIconColor = () => {
    if (iconColor) return iconColor;
    
    if (variant === 'secondary' || variant === 'subtle') {
      return colors.text;
    }
    
    return 'white';
  };
  
  // Calculate button dimensions based on icon size
  const buttonSize = size * 2.2;
  
  const { backgroundColor: bgColor } = getButtonStyles();
  const finalIconColor = getIconColor();
  
  // Clone the icon element to inject the correct color and size
  const styledIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ size?: number; color?: string }>, {
        size: size,
        color: finalIconColor,
      })
    : null;
  
  return (
    <Button
      width={buttonSize}
      height={buttonSize}
      padding={0}
      backgroundColor={bgColor}
      borderRadius={circular ? buttonSize / 2 : 8}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      opacity={disabled ? 0.7 : 1}
      style={[
        { 
          justifyContent: 'center', 
          alignItems: 'center',
          overflow: 'hidden'
        },
        style
      ]}
      pressStyle={{ opacity: 0.8, scale: 0.98 }}
    >
      <View>{styledIcon}</View>
    </Button>
  );
}

export default IconButton;
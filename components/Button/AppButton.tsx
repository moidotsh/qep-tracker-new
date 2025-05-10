// components/Buttons/AppButton.tsx
import React from 'react';
import { Button, Text, XStack, Spinner } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

interface AppButtonProps {
  /**
   * The label text to display on the button
   */
  label: string;
  
  /**
   * Button variant (style)
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   */
  size?: ButtonSize;
  
  /**
   * Function to call when button is pressed
   */
  onPress?: () => void;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  
  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;
  
  /**
   * Whether the button should take the full width of its container
   */
  fullWidth?: boolean;
  
  /**
   * Margin top value
   */
  marginTop?: number | string;
  
  /**
   * Margin bottom value
   */
  marginBottom?: number | string;
  
  /**
   * Additional style props to apply
   */
  style?: any;
}

/**
 * A consistent button component with variants - updated with correct styling
 */
export function AppButton({
  label,
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  marginTop,
  marginBottom,
  style
}: AppButtonProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
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
      case 'danger':
        return {
          backgroundColor: '#FF3B30', // Exact red from design
          color: 'white'
        };
      default: // primary
        return {
          backgroundColor: disabled ? colors.buttonBackgroundDisabled : '#0A84FF', // Exact blue from design
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
          paddingHorizontal: spacing.medium,
          fontSize: fontSize.small
        };
      case 'large':
        return {
          height: 56, // Taller to match design
          paddingHorizontal: spacing.large,
          fontSize: fontSize.large
        };
      default: // medium
        return {
          height: 50,
          paddingHorizontal: spacing.large,
          fontSize: fontSize.medium
        };
    }
  };
  
  const { backgroundColor, color } = getButtonStyles();
  const { height, paddingHorizontal, fontSize: textSize } = getButtonSize();
  
  return (
    <Button
      backgroundColor={backgroundColor}
      color={color}
      height={height}
      paddingHorizontal={paddingHorizontal}
      fontWeight="600" // Slightly less bold to match design
      onPress={loading || disabled ? undefined : onPress}
      disabled={disabled || loading}
      opacity={disabled ? 0.7 : 1}
      width={fullWidth ? '100%' : 'auto'}
      pressStyle={{ opacity: 0.9, scale: 0.99 }}
      marginTop={marginTop}
      marginBottom={marginBottom}
      borderRadius={28} // More rounded to match design
      style={style}
    >
      {loading ? (
        <XStack space={spacing.small} alignItems="center">
          <Spinner color={color} />
          <Text color={color} fontWeight="600" fontSize={textSize}>
            {label}
          </Text>
        </XStack>
      ) : (
        <XStack space={icon ? spacing.small : 0} alignItems="center">
          {icon}
          <Text color={color} fontWeight="600" fontSize={textSize}>
            {label}
          </Text>
        </XStack>
      )}
    </Button>
  );
}

export default AppButton;
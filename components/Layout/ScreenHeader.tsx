// components/Layout/ScreenHeader.tsx
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import { goBack, NavigationPath } from '../../navigation';
import IconButton from '@components/Button/IconButton';

interface ScreenHeaderProps {
  /**
   * Main title text
   */
  title: string;
  
  /**
   * Optional subtitle text
   */
  subtitle?: string;
  
  /**
   * Optional right-aligned content
   */
  rightContent?: React.ReactNode;
  
  /**
   * Whether to show the back button
   */
  showBackButton?: boolean;
  
  /**
   * Current screen path (used for back navigation)
   */
  currentPath: NavigationPath;
  
  /**
   * Custom handler for back button press
   */
  onBackPress?: () => void;
  
  /**
   * Bottom margin for the header
   */
  marginBottom?: number | string;
  
  /**
   * Horizontal padding for the header
   */
  paddingHorizontal?: number | string;
}

/**
 * A consistent header component for all screens - with padding control
 */
export function ScreenHeader({
  title,
  subtitle,
  rightContent,
  showBackButton = true,
  currentPath,
  onBackPress,
  marginBottom,
  paddingHorizontal
}: ScreenHeaderProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Handler for back button press
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      goBack(currentPath);
    }
  };
  
  return (
    <XStack 
      width="100%" 
      justifyContent="space-between"
      alignItems="center" 
      marginBottom={marginBottom || spacing.large}
      paddingHorizontal={paddingHorizontal}
    >
      <XStack alignItems="center" space={spacing.small} flex={1}>
        {showBackButton && (
          <IconButton
            icon={<ChevronLeft size={20} />}
            variant="subtle"
            onPress={handleBackPress}
            size={20}
          />
        )}
        
        <YStack flex={1}>
          <Text
            color={colors.text}
            fontSize={fontSize.xlarge}
            fontWeight="600"
            numberOfLines={1}
          >
            {title}
          </Text>
          
          {subtitle && (
            <Text
              color={colors.textMuted}
              fontSize={fontSize.small}
              marginTop={2}
            >
              {subtitle}
            </Text>
          )}
        </YStack>
      </XStack>
      
      {rightContent && (
        <XStack>{rightContent}</XStack>
      )}
    </XStack>
  );
}

export default ScreenHeader;
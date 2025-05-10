// components/Settings/SettingItem.tsx
import React, { ReactNode } from 'react';
import { YStack, XStack, Text, View } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface SettingItemProps {
  /**
   * Icon to display (typically a Lucide icon)
   */
  icon: ReactNode;
  
  /**
   * Title of the setting
   */
  title: string;
  
  /**
   * Optional description text
   */
  description?: string;
  
  /**
   * Element to display on the right side (switch, button, etc.)
   */
  rightElement?: ReactNode;
  
  /**
   * Handler for when the setting is pressed
   */
  onPress?: () => void;
  
  /**
   * Whether the setting is destructive (will display in red)
   */
  destructive?: boolean;
}

/**
 * Standard setting item component for use in settings screens
 */
export default function SettingItem({
  icon,
  title,
  description = '',
  rightElement = null,
  onPress,
  destructive = false
}: SettingItemProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  return (
    <YStack
      padding={spacing.medium}
      pressStyle={onPress ? { opacity: 0.7 } : undefined}
      onPress={onPress}
      cursor={onPress ? 'pointer' : 'default'}
    >
      <XStack alignItems="center" justifyContent="space-between">
        <XStack alignItems="center" space={spacing.medium}>
          {React.isValidElement(icon) && 
            React.cloneElement(icon as React.ReactElement<{ size?: number; color?: string }>, { 
              size: 24, 
              color: destructive ? '#FF3B30' : colors.text 
            })
          }
          
          <YStack>
            <Text 
              color={destructive ? '#FF3B30' : colors.text}
              fontSize={fontSize.medium}
              fontWeight="500"
            >
              {title}
            </Text>
            
            {description ? (
              <Text 
                color={colors.textMuted} 
                fontSize={fontSize.small}
              >
                {description}
              </Text>
            ) : null}
          </YStack>
        </XStack>
        
        <View>
          {rightElement}
        </View>
      </XStack>
    </YStack>
  );
}
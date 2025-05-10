// components/Settings/SettingsGroup.tsx
import React, { ReactNode } from 'react';
import { YStack, Text, Card, Separator } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface SettingsGroupProps {
  /**
   * The settings items to display in the group
   */
  children: ReactNode;
  
  /**
   * Optional title for the group
   */
  title?: string;
  
  /**
   * Optional footer text for the group
   */
  footer?: string;
  
  /**
   * Margin top
   */
  marginTop?: number | string;
  
  /**
   * Margin bottom
   */
  marginBottom?: number | string;
}

/**
 * Group of related settings items with a card container - card style version
 */
export function SettingsGroup({
  children,
  title,
  footer,
  marginTop,
  marginBottom = 16
}: SettingsGroupProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  // Process children to add separators between them
  const childrenArray = React.Children.toArray(children);
  const childrenWithSeparators = childrenArray.flatMap((child, index) => {
    if (index === childrenArray.length - 1) {
      return [child];
    }
    return [
      child,
      <Separator key={`separator-${index}`} backgroundColor={colors.border} />
    ];
  });
  
  return (
    <YStack marginTop={marginTop} marginBottom={marginBottom} paddingHorizontal={16}>
      {title && (
        <Text
          color={colors.textSecondary}
          fontSize={fontSize.small}
          fontWeight="500"
          marginBottom={4}
          marginLeft={spacing.small}
          style={{ textTransform: 'uppercase' }}
        >
          {title}
        </Text>
      )}
      
      <Card
        backgroundColor={colors.card}
        borderRadius={borderRadius.medium}
        elevate
        marginBottom={spacing.small}
        overflow="hidden"
      >
        {childrenWithSeparators}
      </Card>
      
      {footer && (
        <Text
          color={colors.textMuted}
          fontSize={fontSize.small}
          marginTop={spacing.small}
          marginLeft={spacing.small}
        >
          {footer}
        </Text>
      )}
    </YStack>
  );
}

export default SettingsGroup;
// components/Feedback/EmptyState.tsx
import React from 'react';
import { YStack, Text, Button } from 'tamagui';
import { useAppTheme } from '../ThemeProvider';

interface EmptyStateProps {
  /**
   * The message to display
   */
  message: string;
  
  /**
   * Optional action button text
   */
  actionText?: string;
  
  /**
   * Optional action handler
   */
  onAction?: () => void;
  
  /**
   * Optional icon to display
   */
  icon?: React.ReactNode;
  
  /**
   * Whether to show inside a card
   */
  useCard?: boolean;
}

/**
 * A component to show when there's no data to display
 */
export function EmptyState({
  message,
  actionText,
  onAction,
  icon,
  useCard = false
}: EmptyStateProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  const content = (
    <YStack
      alignItems="center"
      justifyContent="center"
      padding={spacing.large}
      space={spacing.medium}
    >
      {icon && <YStack marginBottom={spacing.small}>{icon}</YStack>}
      
      <Text
        color={colors.textMuted}
        fontSize={fontSize.medium}
        textAlign="center"
      >
        {message}
      </Text>
      
      {actionText && onAction && (
        <Button
          backgroundColor={colors.buttonBackground}
          color="white"
          marginTop={spacing.medium}
          onPress={onAction}
        >
          {actionText}
        </Button>
      )}
    </YStack>
  );
  
  // If useCard is true, wrap in a card container
  if (useCard) {
    return (
      <YStack
        backgroundColor={colors.card}
        borderRadius={10}
        overflow="hidden"
        marginVertical={spacing.medium}
      >
        {content}
      </YStack>
    );
  }
  
  return content;
}

export default EmptyState;
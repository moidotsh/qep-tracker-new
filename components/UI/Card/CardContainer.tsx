// components/UI/Card/CardContainer.tsx
import React, { ReactNode } from 'react';
import { Card, YStack, Text } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

interface CardContainerProps {
    /**
     * Card content
     */
    children: ReactNode;

    /**
     * Card title
     */
    title?: string;

    /**
     * Additional content to display in the header next to the title
     */
    headerContent?: ReactNode;

    /**
     * Whether to apply elevation shadow
     */
    elevate?: boolean;

    /**
     * Custom padding
     */
    padding?: number | string;

    /**
     * Margin top
     */
    marginTop?: number | string;

    /**
     * Margin bottom
     */
    marginBottom?: number | string;

    /**
     * Whether to add space between children
     */
    spaced?: boolean;

    /**
     * Space amount when spaced is true
     */
    space?: number;

    /**
     * Custom background color
     */
    backgroundColor?: string;

    /**
     * On press handler for making the card clickable
     */
    onPress?: () => void;
}

/**
 * Standard card container with consistent styling - updated with correct spacing
 */
export function CardContainer({
    children,
    title,
    headerContent,
    elevate = false, // Changed default to match design
    padding,
    marginTop,
    marginBottom = 24, // Added default bottom margin to prevent colliding cards
    spaced = false,
    space,
    backgroundColor,
    onPress,
}: CardContainerProps) {
    const { colors, spacing, fontSize, borderRadius } = useAppTheme();

    // Default padding based on theme spacing
    const defaultPadding = spacing.xlarge; // Changed from spacing.large to spacing.xlarge

    return (
        <Card
            backgroundColor={backgroundColor || colors.card}
            padding={padding !== undefined ? padding : defaultPadding}
            borderRadius={borderRadius.medium}
            marginTop={marginTop}
            marginBottom={marginBottom}
            elevate={elevate}
            onPress={onPress}
            overflow="hidden"
            {...(onPress && {
                pressStyle: { opacity: 0.9, scale: 0.98 },
                focusStyle: {},
                hoverStyle: { opacity: 0.95 }
            })}
        >
            {title && (
                <YStack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={spacing.medium}
                >
                    <Text
                        color={colors.text}
                        fontSize={fontSize.large}
                        fontWeight="600"
                    >
                        {title}
                    </Text>
                    {headerContent}
                </YStack>
            )}

            <YStack
                space={spaced ? (space || spacing.medium) : undefined}
                // Added small internal padding to prevent content from touching edges
                paddingVertical={padding === undefined ? 0 : 4}
            >
                {children}
            </YStack>
        </Card>
    );
}

export default CardContainer;
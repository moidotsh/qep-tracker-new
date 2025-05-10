// components/UI/Card/CardContainer.tsx
import React, { ReactNode } from 'react';
import { Card, YStack, Text } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

interface CardContainerProps {
    children: ReactNode;
    title?: string;
    headerContent?: ReactNode;
    elevate?: boolean;
    padding?: number | string;
    marginTop?: number | string;
    marginBottom?: number | string;
    paddingBottom?: number | string;
    borderBottomLeftRadius?: number ;
    borderBottomRightRadius?: number ;
    spaced?: boolean;
    space?: number;
    backgroundColor?: string;
    onPress?: () => void;
}

export default function CardContainer({
    children,
    title,
    headerContent,
    elevate = false,
    padding,
    paddingBottom,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    marginTop,
    marginBottom = 24,
    spaced = false,
    space,
    backgroundColor,
    onPress,
}: CardContainerProps) {
    const { colors, spacing, fontSize, borderRadius } = useAppTheme();

    // Default padding based on theme spacing
    const defaultPadding = spacing.xlarge;

    return (
        <Card
            backgroundColor={backgroundColor || colors.card}
            padding={padding !== undefined ? padding : defaultPadding}
            borderRadius={borderRadius.medium}
            marginTop={marginTop}
            marginBottom={marginBottom}
            borderBottomLeftRadius={borderBottomLeftRadius}
            borderBottomEndRadius={borderBottomRightRadius}
            paddingBottom={paddingBottom}
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
                paddingVertical={padding === undefined ? 0 : 4}
            >
                {children}
            </YStack>
        </Card>
    );
}
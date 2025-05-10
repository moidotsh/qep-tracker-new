// components/Layout/ScreenHeader.tsx
import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import { goBack, NavigationPath } from '../../navigation';
import { AppButton } from '../AppButton';
import BackButton from '../BackButton';

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
}

/**
 * A consistent header component for all screens
 */
export default function ScreenHeader({
    title,
    subtitle,
    rightContent,
    showBackButton = true,
    currentPath,
    onBackPress,
    marginBottom,
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
        >
            <XStack alignItems="center" space={spacing.small} flex={1}>
                {showBackButton && (
                    <BackButton currentPath={currentPath} onPress={onBackPress} />
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
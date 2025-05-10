// components/Form/PresetSelector/PresetSelector.tsx
import React from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

export interface PresetOption {
    hours: number;
    minutes: number;
    label: string;
}

interface PresetSelectorProps {
    presets: PresetOption[];
    selectedHours: number;
    selectedMinutes: number;
    onSelectPreset: (hours: number, minutes: number) => void;
    label?: string;
    maxRemainingMinutes?: number;
}

export default function PresetSelector({
    presets,
    selectedHours,
    selectedMinutes,
    onSelectPreset,
    label = "Quick Select",
    maxRemainingMinutes,
}: PresetSelectorProps) {
    const { colors, spacing, fontSize, borderRadius } = useAppTheme();

    // Filter presets that exceed remaining time
    const availablePresets = presets.filter(preset => {
        if (maxRemainingMinutes === undefined) return true;
        const presetMinutes = preset.hours * 60 + preset.minutes;
        return presetMinutes <= maxRemainingMinutes;
    });

    // Check if a preset is currently selected
    const isSelected = (hours: number, minutes: number) => {
        return selectedHours === hours && selectedMinutes === minutes;
    };

    if (availablePresets.length === 0) {
        return null;
    }

    return (
        <YStack marginTop={spacing.medium}>
            <Text color={colors.textMuted} fontSize={fontSize.small} marginBottom={spacing.small}>
                {label}
            </Text>

            <XStack justifyContent="space-between" marginHorizontal={spacing.small}>
                {availablePresets.map((preset) => (
                    <Button
                        key={preset.label}
                        backgroundColor={
                            isSelected(preset.hours, preset.minutes)
                                ? colors.buttonBackground
                                : colors.cardAlt
                        }
                        color={
                            isSelected(preset.hours, preset.minutes)
                                ? 'white'
                                : colors.text
                        }
                        fontWeight="500"
                        paddingHorizontal={spacing.small} // Reduce horizontal padding
                        height={38}
                        onPress={() => onSelectPreset(preset.hours, preset.minutes)}
                        borderRadius={borderRadius.small}
                        flex={1}
                        marginHorizontal={3} // Reduce margin to fit more content
                        // Add text styles to prevent truncation
                        textProps={{
                            numberOfLines: 1,
                            ellipsizeMode: 'clip',
                            fontSize: fontSize.xs // Use smaller font size
                        }}
                    >
                        {preset.label}
                    </Button>
                ))}
            </XStack>
        </YStack>
    );
}
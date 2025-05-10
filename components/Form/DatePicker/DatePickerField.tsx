// components/Form/DatePicker/DatePickerField.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { XStack, Text, View } from 'tamagui';
import { Calendar } from '@tamagui/lucide-icons';
import { useAppTheme } from '../../ThemeProvider';
import { format } from 'date-fns';
import { WebCalendar } from './WebCalendar';
import { NativeCalendar } from './NativeCalendar';

interface DatePickerFieldProps {
    value: Date;
    onChange: (date: Date) => void;
    label?: string;
    placeholder?: string;
}

/**
 * A cross-platform date picker field that handles both web and native implementations
 */
export function DatePickerField({
    value,
    onChange,
    label,
    placeholder = 'Select date',
}: DatePickerFieldProps) {
    const { colors, spacing, fontSize, borderRadius } = useAppTheme();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const isWeb = Platform.OS === 'web';

    // Format date for display
    const formattedDate = format(value, 'MMMM d, yyyy');

    // Handle date selection
    const handleDateChange = (selectedDate: Date) => {
        onChange(selectedDate);
        setShowDatePicker(false);
    };

    // Open date picker
    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    // Close date picker
    const closeDatePicker = () => {
        setShowDatePicker(false);
    };

    // Render the appropriate date picker based on platform
    const renderDatePicker = () => {
        if (!showDatePicker) return null;

        if (isWeb) {
            return (
                <WebCalendar
                    currentDate={value}
                    onDateSelect={handleDateChange}
                    onClose={closeDatePicker}
                />
            );
        } else {
            return (
                <NativeCalendar
                    currentDate={value}
                    onDateChange={handleDateChange}
                    onClose={closeDatePicker}
                />
            );
        }
    };

    return (
        <View>
            {label && (
                <Text color={colors.text} fontSize={fontSize.medium} marginBottom={spacing.small}>
                    {label}
                </Text>
            )}

            <TouchableOpacity onPress={openDatePicker} activeOpacity={0.7}>
                <XStack
                    backgroundColor={colors.cardAlt}
                    padding={spacing.medium}
                    borderRadius={borderRadius.small}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Text color={colors.text} fontSize={fontSize.medium}>
                        {formattedDate}
                    </Text>
                    <Calendar size={20} color={colors.text} />
                </XStack>
            </TouchableOpacity>

            {renderDatePicker()}
        </View>
    );
}

export default DatePickerField;
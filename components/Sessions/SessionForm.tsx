// components/Sessions/SessionForm.tsx
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { YStack, Separator, XStack, Text } from 'tamagui';
import { AlertCircle } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import { DatePickerField } from '../DatePickerField';
import { DurationInput } from '../DurationInput';
import { Card } from '../Card';
import { AppButton } from '../AppButton';
import { format } from 'date-fns';
import { saveSession } from '../../data/trainingData';
import { getDailyLoggedMinutes } from '../../data/trainingData';

interface PresetOption {
    hours: number;
    minutes: number;
    label: string;
}

interface SessionFormProps {
    /**
     * Function to call when form is successfully submitted
     */
    onSubmitSuccess?: () => void;

    /**
     * Initial date value
     */
    initialDate?: Date;
}

export default function SessionForm({
    onSubmitSuccess,
    initialDate = new Date()
}: SessionFormProps) {
    const { colors, spacing, fontSize } = useAppTheme();

    // Form state
    const [sessionDate, setSessionDate] = useState<Date>(initialDate);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(45);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [dailyLoggedMinutes, setDailyLoggedMinutes] = useState<number>(0);
    const [remainingMinutes, setRemainingMinutes] = useState<number>(8 * 60); // 8 hours in minutes

    // Maximum allowed daily minutes (8 hours)
    const MAX_DAILY_MINUTES = 8 * 60;

    // Format date for display
    const formattedDate = format(sessionDate, 'MMMM d, yyyy');

    // Mock function to get already logged time for selected date
    // In a real app, this would come from AsyncStorage
    const getDailyLoggedMinutes = async (date: string): Promise<number> => {
        // Simulate an API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Randomly return some minutes (0-120)
                resolve(Math.floor(Math.random() * 121));
            }, 300);
        });
    };

    // Load already logged time for selected date
    useEffect(() => {
        const loadDailyTime = async () => {
            try {
                // Use the getDailyLoggedMinutes function to get already logged time
                const dailyTotal = await getDailyLoggedMinutes(formattedDate);

                setDailyLoggedMinutes(dailyTotal);
                setRemainingMinutes(Math.max(0, MAX_DAILY_MINUTES - dailyTotal));

                // Adjust current duration selection if it exceeds remaining time
                const currentTotalMinutes = hours * 60 + minutes;
                if (currentTotalMinutes > MAX_DAILY_MINUTES - dailyTotal) {
                    const newRemainingMinutes = MAX_DAILY_MINUTES - dailyTotal;
                    if (newRemainingMinutes <= 0) {
                        // No time remaining today
                        setHours(0);
                        setMinutes(0);
                    } else {
                        // Adjust to remaining time
                        setHours(Math.floor(newRemainingMinutes / 60));
                        setMinutes(newRemainingMinutes % 60);
                    }
                }
            } catch (error) {
                console.error('Error loading daily time:', error);
            }
        };

        loadDailyTime();
    }, [sessionDate]);

    // Get preset duration options
    const getDurationPresets = (): PresetOption[] => {
        return [
            { hours: 1, minutes: 0, label: '1h' },
            { hours: 2, minutes: 0, label: '2h' },
            { hours: 4, minutes: 0, label: '4h' },
        ];
    };

    // Set duration from preset
    const setDurationFromPreset = (presetHours: number, presetMinutes: number) => {
        setHours(presetHours);
        setMinutes(presetMinutes);
    };

    // Helper function to check if hours and minutes are valid
    const isValidDuration = () => {
        return hours > 0 || minutes > 0;
    };

    // Format duration in hours and minutes
    const formatDuration = (minutes: number) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (hrs === 0) {
            return `${mins}m`;
        } else if (mins === 0) {
            return `${hrs}h`;
        } else {
            return `${hrs}h ${mins}m`;
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        // Validate form
        if (hours === 0 && minutes === 0) {
            Alert.alert('Error', 'Please enter session duration');
            return;
        }

        // Double-check daily limit
        const sessionMinutes = hours * 60 + minutes;
        if (sessionMinutes + dailyLoggedMinutes > MAX_DAILY_MINUTES) {
            Alert.alert(
                'Daily Limit Exceeded',
                `You've already logged ${formatDuration(dailyLoggedMinutes)} today. This session would exceed the 8-hour daily limit.`,
                [{ text: 'OK' }]
            );
            return;
        }

        setIsSubmitting(true);

        try {
            // Calculate total duration in minutes
            const totalMinutes = hours * 60 + minutes;

            // Create session object
            const session = {
                id: Date.now().toString(),
                date: formattedDate,
                duration: totalMinutes
            };

            // Save session
            await saveSession(session);

            // Callback on success
            if (onSubmitSuccess) {
                onSubmitSuccess();
            }
        } catch (error) {
            console.error('Error saving session:', error);
            Alert.alert('Error', 'Failed to save session. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Create a simple progress bar for time remaining
    const TimeRemainingBar = () => (
        <YStack width="100%" space={spacing.xs}>
            <XStack justifyContent="space-between">
                <Text fontSize={12} color={colors.textMuted}>0h</Text>
                <Text fontSize={12} color={colors.textMuted}>
                    {formatDuration(remainingMinutes)} {dailyLoggedMinutes > 0 ? "(Remaining)" : "(Max)"}
                </Text>
            </XStack>
            <XStack
                height={10}
                backgroundColor="#222"
                borderRadius={5}
                overflow="hidden"
            >
                {dailyLoggedMinutes > 0 && (
                    <XStack
                        width={`${(dailyLoggedMinutes / MAX_DAILY_MINUTES) * 100}%`}
                        backgroundColor="#444"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 10px)'
                        }}
                    />
                )}
                <XStack
                    width={`${((hours * 60 + minutes) / MAX_DAILY_MINUTES) * 100}%`}
                    backgroundColor="#0A84FF"
                />
            </XStack>
        </YStack>
    );

    return (
        <YStack>
            <Card>
                <YStack space={spacing.large}>
                    {/* Date Field with Calendar Picker */}
                    <DatePickerField
                        value={sessionDate}
                        onChange={setSessionDate}
                        label="Date"
                    />

                    <Separator backgroundColor={colors.border} />

                    {/* Daily Limit Information */}
                    {dailyLoggedMinutes > 0 && (
                        <YStack backgroundColor={colors.cardAlt} padding={spacing.medium} borderRadius={12}>
                            <XStack alignItems="center" space={spacing.small}>
                                <AlertCircle size={20} color={colors.textMuted} />
                                <Text color={colors.textMuted} fontSize={fontSize.small}>
                                    Already logged {formatDuration(dailyLoggedMinutes)} for this date.
                                </Text>
                            </XStack>
                            <Text color={colors.text} fontSize={fontSize.medium} marginTop={spacing.small}>
                                Remaining time: {formatDuration(remainingMinutes)}
                            </Text>
                        </YStack>
                    )}

                    {/* Session Duration */}
                    <YStack>
                        <Text color={colors.text} fontSize={fontSize.medium} marginBottom={spacing.small}>
                            Session Duration
                        </Text>

                        <TimeRemainingBar />

                        <DurationInput
                            hours={hours}
                            minutes={minutes}
                            onHoursChange={setHours}
                            onMinutesChange={setMinutes}
                            maxHours={8}
                        //   remainingMinutes={remainingMinutes}
                        />

                        {/* Quick select options */}
                        <YStack marginTop={spacing.large} space={spacing.small}>
                            <Text color={colors.textMuted} fontSize={fontSize.small}>
                                Quick Select
                            </Text>
                            <XStack space={spacing.small}>
                                {getDurationPresets().map((preset, index) => (
                                    <AppButton
                                        key={index}
                                        label={preset.label}
                                        variant="secondary"
                                        size="small"
                                        onPress={() => setDurationFromPreset(preset.hours, preset.minutes)}
                                        fullWidth
                                        disabled={preset.hours * 60 + preset.minutes > remainingMinutes}
                                    />
                                ))}
                            </XStack>
                        </YStack>
                    </YStack>
                </YStack>
            </Card>

            {/* Submit Button */}
            <AppButton
                label="Save Session"
                variant="primary"
                size="large"
                fullWidth
                onPress={handleSubmit}
                disabled={!isValidDuration() || isSubmitting}
                // loading={isSubmitting}
                marginTop={spacing.xlarge}
            />
        </YStack>
    );
}
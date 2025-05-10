// components/Sessions/SessionForm.tsx
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { YStack, Separator, XStack, Text, View, Button } from 'tamagui';
import { AlertCircle } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import DatePickerField from '../Form/DatePicker/DatePickerField';
import DurationInput from '../Form/InputField/DurationInput';
import PresetSelector from '../Form/PresetSelector/PresetSelector';
import ZebraProgressBar from '../Visualizations/ProgressBar/ZebraProgressBar';
import CardContainer from '../UI/Card/CardContainer';
import AppButton from '../Button/AppButton';
import { format } from 'date-fns';
import { saveSession, getDailyLoggedMinutes, SessionData } from '../../data/trainingData';

interface SessionFormProps {
    onSubmitSuccess?: () => void;
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Daily logged time information
    const [dailyLoggedMinutes, setDailyLoggedMinutes] = useState<number>(0);
    const [remainingMinutes, setRemainingMinutes] = useState<number>(8 * 60); // 8 hours in minutes

    // Maximum allowed daily minutes (8 hours)
    const MAX_DAILY_MINUTES = 8 * 60;

    // Format date for display
    const formattedDate = format(sessionDate, 'MMMM d, yyyy');

    // Load already logged time for selected date
    useEffect(() => {
        const loadDailyTime = async () => {
            setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        };

        loadDailyTime();
    }, [sessionDate, hours, minutes]);

    // Get preset duration options with even spacing
    const getDurationPresets = () => {
        // Fixed presets focused on hours
        return [
            { hours: 1, minutes: 0, label: '1h' },
            { hours: 2, minutes: 0, label: '2h' },
            { hours: 4, minutes: 0, label: '4h' },
            { hours: 8, minutes: 0, label: '8h' },
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
            const session: SessionData = {
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

    return (
        <YStack>
            <View
                style={{
                    overflow: 'hidden',
                    borderRadius: 15, // Match card's border radius
                    marginBottom: spacing.large // Add some space at the bottom
                }}
            >
                <CardContainer
                    spaced
                    paddingBottom={spacing.xlarge} // Add extra padding at the bottom for the button
                    borderBottomLeftRadius={0} // Remove bottom border radius
                    borderBottomRightRadius={0} // Remove bottom border radius
                    marginBottom={0} // Remove bottom margin
                >
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
                                <Text color={colors.textMuted} fontSize={fontSize.small} flexShrink={1} flexWrap="wrap">
                                    Already logged {formatDuration(dailyLoggedMinutes)} for this date.
                                </Text>
                            </XStack>
                            <Text color={colors.text} fontSize={fontSize.medium} marginTop={spacing.small}>
                                Remaining time: {formatDuration(remainingMinutes)}
                            </Text>
                        </YStack>
                    )}

                    {/* Enhanced Duration Field */}
                    <YStack>
                        <Text color={colors.text} fontSize={fontSize.medium} marginBottom={spacing.small}>
                            Session Duration
                        </Text>

                        {/* Progress Indicator with Zebra Pattern */}
                        <ZebraProgressBar
                            value={hours * 60 + minutes}
                            maxValue={MAX_DAILY_MINUTES}
                            usedValue={dailyLoggedMinutes}
                            formatLabel={(val) => formatDuration(val)}
                            minLabel="0h"
                            maxLabel={formatDuration(remainingMinutes)}
                            maxLabelInfo={dailyLoggedMinutes > 0 ? "Remaining" : "Max"}
                        />

                        {/* Duration Input Component */}
                        <DurationInput
                            hours={hours}
                            minutes={minutes}
                            onHoursChange={setHours}
                            onMinutesChange={setMinutes}
                            maxHours={8}
                            remainingMinutes={remainingMinutes}
                        />

                        {/* Preset Durations Component */}
                        <PresetSelector
                            presets={getDurationPresets()}
                            selectedHours={hours}
                            selectedMinutes={minutes}
                            onSelectPreset={setDurationFromPreset}
                            label="Quick Select"
                            maxRemainingMinutes={remainingMinutes}
                        />
                    </YStack>
                </CardContainer>

                {/* Button that sits outside the card but inside the wrapping View */}
                <Button
                    backgroundColor="#0A84FF"
                    height={60}
                    justifyContent="center"
                    alignItems="center"
                    borderTopLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomLeftRadius={15} // Match outer container border radius
                    borderBottomRightRadius={15} // Match outer container border radius
                    pressStyle={{ opacity: 0.9 }}
                    onPress={handleSubmit}
                    disabled={!isValidDuration() || isSubmitting}
                    opacity={!isValidDuration() || isSubmitting ? 0.7 : 1}
                >
                    <Text
                        color="white"
                        fontSize={18}
                        fontWeight="600"
                    >
                        {isSubmitting ? "Saving..." : "Save Session"}
                    </Text>
                </Button>
            </View>
        </YStack>
    );
}
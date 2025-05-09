// app/log-session.tsx
import React, { useState } from 'react';
import { YStack, Text, XStack } from 'tamagui';
import { Alert } from 'react-native';
import { useAppTheme } from '../components/ThemeProvider';
import { AppButton } from '../components/AppButton';
import { DurationInput } from '../components/DurationInput';
import { DatePickerField } from '../components/DatePickerField';
import { Card } from '../components/Card';
import { saveSession } from '../data/trainingData';
import { format } from 'date-fns';
import { goBack, NavigationPath } from '../navigation';

export default function LogSessionScreen() {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  // State for session details
  const [sessionDate, setSessionDate] = useState(new Date());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Save session
  const handleSave = async () => {
    if (hours === 0 && minutes === 0) {
      Alert.alert('Error', 'Please enter session duration');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate total duration in minutes
      const totalMinutes = hours * 60 + minutes;
      
      // Create session object
      const session = {
        id: Date.now().toString(),
        date: format(sessionDate, 'MMMM d, yyyy'),
        duration: totalMinutes
      };
      
      // Save session
      await saveSession(session);
      
      // Navigate back to home
      goBack(NavigationPath.LOG_SESSION);
    } catch (error) {
      console.error('Error saving session:', error);
      Alert.alert('Error', 'Failed to save session. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <YStack flex={1} padding={spacing.large} backgroundColor={colors.background}>
      {/* Header */}
      <XStack alignItems="center" marginBottom={spacing.large}>
        <AppButton
          label="← Back"
          variant="subtle"
          size="small"
          onPress={() => goBack(NavigationPath.LOG_SESSION)}
        />
        <Text 
          fontSize={fontSize.xlarge} 
          fontWeight="bold" 
          color={colors.text} 
          marginLeft={spacing.small}
        >
          Log Session
        </Text>
      </XStack>
      
      {/* Session Form */}
      <Card>
        <YStack space={spacing.large}>
          {/* Date Picker */}
          <DatePickerField
            value={sessionDate}
            onChange={setSessionDate}
            label="Date"
          />
          
          {/* Duration Input */}
          <DurationInput
            hours={hours}
            minutes={minutes}
            onHoursChange={setHours}
            onMinutesChange={setMinutes}
            label="Session Duration"
          />
        </YStack>
      </Card>
      
      {/* Quick Selection Buttons */}
      <YStack marginTop={spacing.large} space={spacing.small}>
        <Text color={colors.textMuted} fontSize={fontSize.small}>
          Quick Select
        </Text>
        <XStack space={spacing.small}>
          <AppButton 
            label="1h"
            variant="secondary"
            size="small"
            onPress={() => { setHours(1); setMinutes(0); }}
            fullWidth
          />
          <AppButton 
            label="2h"
            variant="secondary"
            size="small"
            onPress={() => { setHours(2); setMinutes(0); }}
            fullWidth
          />
          <AppButton 
            label="4h"
            variant="secondary"
            size="small"
            onPress={() => { setHours(4); setMinutes(0); }}
            fullWidth
          />
        </XStack>
      </YStack>
      
      {/* Save Button */}
      <AppButton
        label="Save Session"
        variant="primary"
        size="large"
        fullWidth
        marginTop="auto"
        marginBottom={spacing.medium}
        onPress={handleSave}
        disabled={isSubmitting || (hours === 0 && minutes === 0)}
      />
    </YStack>
  );
}
// components/DurationInput.tsx
import React from 'react';
import { XStack, YStack, Text, Button } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface DurationInputProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
  maxHours?: number;
  minuteStep?: number;
  label?: string;
}

export function DurationInput({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
  maxHours = 8,
  minuteStep = 5,
  label
}: DurationInputProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  // Hours increment handler
  const incrementHours = () => {
    if (hours < maxHours) {
      onHoursChange(hours + 1);
    }
  };
  
  // Hours decrement handler
  const decrementHours = () => {
    if (hours > 0) {
      onHoursChange(hours - 1);
    }
  };
  
  // Minutes increment handler
  const incrementMinutes = () => {
    // If at max hours, minutes must stay at 0
    if (hours === maxHours) {
      return;
    }
    
    const newMinutes = minutes + minuteStep;
    
    if (newMinutes >= 60) {
      // Roll over to next hour
      const nextHour = hours + 1;
      
      // If next hour would be max, set to max:00
      if (nextHour === maxHours) {
        onHoursChange(maxHours);
        onMinutesChange(0);
      } else {
        onHoursChange(nextHour);
        onMinutesChange(newMinutes - 60);
      }
    } else {
      onMinutesChange(newMinutes);
    }
  };
  
  // Minutes decrement handler
  const decrementMinutes = () => {
    if (minutes === 0) {
      if (hours > 0) {
        // Roll back to previous hour
        onHoursChange(hours - 1);
        onMinutesChange(60 - minuteStep);
      }
      return;
    }
    
    onMinutesChange(minutes - minuteStep);
  };
  
  return (
    <YStack>
      {label && (
        <Text color={colors.text} fontSize={fontSize.medium} marginBottom={spacing.small}>
          {label}
        </Text>
      )}
      
      {/* Duration Display */}
      <XStack
        backgroundColor={colors.cardAlt}
        height={70}
        borderRadius={borderRadius.medium}
        alignItems="center"
        justifyContent="center"
        marginBottom={spacing.medium}
      >
        <Text color={colors.text} fontSize={32} fontWeight="bold">
          {`${hours}h ${minutes}m`}
        </Text>
      </XStack>
      
      {/* Hours and Minutes Controls */}
      <XStack space={spacing.medium} alignItems="center">
        {/* Hours Control */}
        <YStack flex={1}>
          <Text color={colors.textMuted} fontSize={fontSize.small} marginBottom={4} textAlign="center">
            Hours
          </Text>
          <XStack alignItems="center" justifyContent="space-between">
            <Button
              circular
              size="$4"
              backgroundColor={colors.cardAlt}
              onPress={decrementHours}
              disabled={hours <= 0}
              opacity={hours <= 0 ? 0.5 : 1}
            >
              -
            </Button>
            
            <Text color={colors.text} fontSize={fontSize.large} fontWeight="600" width={50} textAlign="center">
              {hours}
            </Text>
            
            <Button
              circular
              size="$4"
              backgroundColor={colors.cardAlt}
              onPress={incrementHours}
              disabled={hours >= maxHours}
              opacity={hours >= maxHours ? 0.5 : 1}
            >
              +
            </Button>
          </XStack>
        </YStack>
        
        {/* Minutes Control */}
        <YStack flex={1}>
          <Text color={colors.textMuted} fontSize={fontSize.small} marginBottom={4} textAlign="center">
            Minutes
          </Text>
          <XStack alignItems="center" justifyContent="space-between">
            <Button
              circular
              size="$4"
              backgroundColor={colors.cardAlt}
              onPress={decrementMinutes}
              disabled={hours <= 0 && minutes <= 0}
              opacity={hours <= 0 && minutes <= 0 ? 0.5 : 1}
            >
              -
            </Button>
            
            <Text color={colors.text} fontSize={fontSize.large} fontWeight="600" width={50} textAlign="center">
              {minutes}
            </Text>
            
            <Button
              circular
              size="$4"
              backgroundColor={colors.cardAlt}
              onPress={incrementMinutes}
              disabled={hours >= maxHours}
              opacity={hours >= maxHours ? 0.5 : 1}
            >
              +
            </Button>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}
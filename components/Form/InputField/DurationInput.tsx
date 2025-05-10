// components/Form/InputField/DurationInput.tsx
import React, { useEffect } from 'react';
import { XStack, YStack, Text, Button, View } from 'tamagui';
import { Minus, Plus } from '@tamagui/lucide-icons';
import { useAppTheme } from '../../ThemeProvider';

interface DurationInputProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
  maxHours?: number;
  minuteStep?: number;
  remainingMinutes?: number;
  label?: string;
}

export default function DurationInput({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
  maxHours = 8,
  minuteStep = 5,
  remainingMinutes,
  label
}: DurationInputProps) {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Watch for hours changes and automatically clear minutes when at maxHours
  useEffect(() => {
    // If hours is at max, force minutes to 0
    if (hours === maxHours) {
      onMinutesChange(0);
    }
  }, [hours, maxHours, onMinutesChange]);
  
  // Calculate if the current total would exceed remaining minutes
  const calculateTotalMinutes = (h: number, m: number) => h * 60 + m;
  const currentTotalMinutes = calculateTotalMinutes(hours, minutes);
  
  // Check if incrementing hours would exceed remaining minutes (if provided)
  const wouldExceedLimit = (h: number, m: number) => {
    if (remainingMinutes === undefined) return false;
    return calculateTotalMinutes(h, m) > remainingMinutes;
  };
  
  // Calculate if we can increment to max (top off to remaining minutes)
  const canTopOffToMax = () => {
    if (remainingMinutes === undefined) return false;
    
    // If we're already at max or over, we can't top off
    if (currentTotalMinutes >= remainingMinutes) return false;
    
    // If the hours + button is already disabled in normal mode, but there's still room to top off
    return wouldExceedLimit(hours + 1, minutes) && currentTotalMinutes < remainingMinutes;
  };
  
  // Calculate if we can increment minutes to max
  const canTopOffMinutesToMax = () => {
    if (remainingMinutes === undefined) return false;
    
    // If we're already at max or over, we can't top off
    if (currentTotalMinutes >= remainingMinutes) return false;
    
    // If the minutes + button is already disabled in normal mode, but there's still room to top off
    return wouldExceedLimit(hours, minutes + minuteStep) && currentTotalMinutes < remainingMinutes;
  };
  
  // Hours increment handler
  const incrementHours = () => {
    // Calculate total minutes with incremented hours
    const newHours = hours + 1;
    const totalMinutes = newHours * 60 + minutes;
    
    // Check if incrementing hours would exceed remaining daily time
    if (remainingMinutes !== undefined && totalMinutes > remainingMinutes) {
      // Allow maxing out to exact remaining time
      const maxHours = Math.floor(remainingMinutes / 60);
      const maxMinutes = remainingMinutes % 60;
      
      // Update to maximum possible time
      onHoursChange(maxHours);
      onMinutesChange(maxMinutes);
    } else {
      // If new hours is maxHours, force minutes to 0
      if (newHours === maxHours) {
        onHoursChange(newHours);
        onMinutesChange(0);
      } else {
        // Normal increment
        onHoursChange(newHours);
      }
    }
  };
  
  // Hours decrement handler
  const decrementHours = () => {
    if (hours <= 0) return;
    onHoursChange(hours - 1);
  };
  
  // Minutes increment handler
  const incrementMinutes = () => {
    // If at max hours, minutes must stay at 0
    if (hours === maxHours) {
      return;
    }
    
    // Calculate total minutes with incremented minutes
    const newMinutes = minutes + minuteStep;
    const totalMinutes = hours * 60 + newMinutes;
    
    // Check if incrementing minutes would exceed remaining daily time
    if (remainingMinutes !== undefined && totalMinutes > remainingMinutes) {
      // Allow maxing out to exact remaining time
      const maxHours = Math.floor(remainingMinutes / 60);
      const maxMinutes = remainingMinutes % 60;
      
      // Update to maximum possible time
      onHoursChange(maxHours);
      onMinutesChange(maxMinutes);
      return;
    }
    
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
        borderRadius={12}
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
              <Minus size={18} color={colors.text} />
            </Button>
            
            <Text color={colors.text} fontSize={fontSize.large} fontWeight="600" width={50} textAlign="center">
              {hours}
            </Text>
            
            <Button
              circular
              size="$4"
              backgroundColor={colors.cardAlt}
              onPress={incrementHours}
              // Enable button if we can top off
              disabled={hours >= maxHours && !canTopOffToMax() && (wouldExceedLimit(hours + 1, minutes) && !canTopOffToMax())}
              opacity={(hours >= maxHours && !canTopOffToMax()) || (wouldExceedLimit(hours + 1, minutes) && !canTopOffToMax()) ? 0.5 : 1}
            >
              <Plus size={18} color={colors.text} />
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
              <Minus size={18} color={colors.text} />
            </Button>
            
            <Text color={colors.text} fontSize={fontSize.large} fontWeight="600" width={50} textAlign="center">
              {minutes}
            </Text>
            
            <Button
              circular
              size="$4"
              backgroundColor={colors.cardAlt}
              onPress={incrementMinutes}
              // Enable button if we can top off minutes
              disabled={(wouldExceedLimit(hours, minutes + minuteStep) && !canTopOffMinutesToMax()) || hours === maxHours}
              opacity={(wouldExceedLimit(hours, minutes + minuteStep) && !canTopOffMinutesToMax()) || hours === maxHours ? 0.5 : 1}
            >
              <Plus size={18} color={colors.text} />
            </Button>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}
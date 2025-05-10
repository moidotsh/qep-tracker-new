// components/Form/DatePicker/WebCalendar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View as RNView, Platform, TouchableOpacity } from 'react-native';
import { XStack, YStack, Text, Button, View } from 'tamagui';
import { ChevronLeft, ChevronRight, X } from '@tamagui/lucide-icons';
import { useAppTheme } from '../../ThemeProvider';
import { 
  format, 
  addMonths, 
  subMonths, 
  isSameDay, 
  isSameMonth
} from 'date-fns';

interface WebCalendarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

/**
 * Calendar component optimized for web use
 */
export function WebCalendar({
  currentDate,
  onDateSelect,
  onClose
}: WebCalendarProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  const [displayMonth, setDisplayMonth] = useState(new Date(currentDate));
  const containerRef = useRef<typeof View>(null);
  
  // Get days of the week - use shorter abbreviations to prevent overflow
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Get days in month with the correct calendar grid layout
  const getDaysInMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    // First day of month
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Create array with leading empty days
    const days = Array(dayOfWeek).fill(null);
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, monthIndex, i));
    }
    
    return days;
  };
  
  // Navigate months
  const goToPreviousMonth = () => {
    setDisplayMonth(subMonths(displayMonth, 1));
  };
  
  const goToNextMonth = () => {
    setDisplayMonth(addMonths(displayMonth, 1));
  };
  
  // Handle outside clicks to close the calendar
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !(containerRef.current as any).contains(event.target)) {
        onClose();
      }
    };
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Get calendar days
  const days = getDaysInMonth(displayMonth);
  
  return (
    <View
    //   position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      justifyContent="center"
      alignItems="center"
      zIndex={99999}
      style={{ 
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        position: 'fixed'
      }}
    >
      <View
        ref={containerRef as any}
        width={300}
        backgroundColor={colors.card}
        borderRadius={borderRadius.medium}
        // Enhanced shadow for better visibility
        shadowColor="black"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={12}
        overflow="hidden"
        style={{
          maxHeight: 500,
          minHeight: 380,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          elevation: 10
        }}
      >
        {/* Header with Close button */}
        <XStack 
          justifyContent="space-between" 
          paddingHorizontal={spacing.medium} 
          paddingVertical={spacing.medium} 
          alignItems="center" 
          borderBottomWidth={1} 
          borderColor={colors.border}
          backgroundColor={colors.cardAlt}
        >
          <Text color={colors.text} fontSize={fontSize.medium} fontWeight="600">
            Select Date
          </Text>
          <Button
            size="$2"
            circular
            icon={<X size={16} color={colors.text} />}
            onPress={onClose}
            backgroundColor="transparent"
            hoverStyle={{ backgroundColor: colors.background }}
          />
        </XStack>
        
        {/* Month Navigation */}
        <XStack justifyContent="space-between" padding={spacing.medium} alignItems="center">
          <Button
            icon={<ChevronLeft size={16} color={colors.text} />}
            onPress={goToPreviousMonth}
            backgroundColor="transparent"
            pressStyle={{ backgroundColor: colors.cardAlt }}
          />
          <Text color={colors.text} fontSize={fontSize.medium} fontWeight="600">
            {format(displayMonth, 'MMMM yyyy')}
          </Text>
          <Button
            icon={<ChevronRight size={16} color={colors.text} />}
            onPress={goToNextMonth}
            backgroundColor="transparent"
            pressStyle={{ backgroundColor: colors.cardAlt }}
          />
        </XStack>
        
        {/* Days of Week - fixed width for consistent layout */}
        <XStack paddingHorizontal={spacing.small} paddingTop={spacing.small}>
          {daysOfWeek.map(day => (
            <Text
              key={day}
              color={colors.textMuted}
              fontSize={fontSize.small}
              fontWeight="500"
              width={36}
              textAlign="center"
            >
              {day}
            </Text>
          ))}
        </XStack>
        
        {/* Calendar Grid - using fixed sizes and better layout */}
        <YStack padding={spacing.small} flex={1}>
          <YStack>
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, rowIndex) => (
              <XStack key={`row-${rowIndex}`} justifyContent="space-between" marginBottom={10}>
                {Array.from({ length: 7 }).map((_, colIndex) => {
                  const dayIndex = rowIndex * 7 + colIndex;
                  const day = days[dayIndex];
                  
                  return (
                    <TouchableOpacity
                      key={`day-${rowIndex}-${colIndex}`}
                      onPress={() => day && onDateSelect(day)}
                      style={{
                        width: 36,
                        height: 36,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 18,
                        backgroundColor: day && isSameDay(day, currentDate)
                          ? colors.buttonBackground
                          : 'transparent',
                      }}
                    >
                      <Text
                        color={
                          day
                            ? isSameDay(day, currentDate)
                              ? 'white'
                              : isSameMonth(day, displayMonth)
                                ? colors.text
                                : colors.textMuted
                            : 'transparent'
                        }
                        fontSize={fontSize.small}
                        fontWeight={day && isSameDay(day, currentDate) ? '600' : '400'}
                      >
                        {day ? format(day, 'd') : ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </XStack>
            ))}
          </YStack>
        </YStack>
        
        {/* Today Button */}
        <Button
          onPress={() => {
            const today = new Date();
            setDisplayMonth(today);
            onDateSelect(today);
          }}
          backgroundColor={colors.buttonBackground}
          color="white"
          margin={spacing.medium}
          fontWeight="500"
          borderRadius={borderRadius.small}
          height={40}
        >
          Today
        </Button>
      </View>
    </View>
  );
}

export default WebCalendar;
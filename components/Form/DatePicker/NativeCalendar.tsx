// components/Form/DatePicker/NativeCalendar.tsx
import React from 'react';
import { Modal, Pressable, View as RNView, Platform } from 'react-native';
import { XStack, Text } from 'tamagui';
import { useAppTheme } from '../../ThemeProvider';

// Only import DateTimePicker for native platforms
let DateTimePicker: any = null;
if (Platform.OS === 'ios' || Platform.OS === 'android') {
  // Dynamically import DateTimePicker for native platforms only
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

interface NativeCalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
}

/**
 * Native calendar implementation using platform-specific date pickers
 */
export function NativeCalendar({
  currentDate,
  onDateChange,
  onClose
}: NativeCalendarProps) {
  const { colors, spacing } = useAppTheme();
  
  // Handle date change from date picker
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      onDateChange(selectedDate);
    }
    // For Android, closing happens automatically
    if (Platform.OS === 'ios') {
      // Do not close automatically for iOS
      // The user will press "Done" button
    } else {
      onClose();
    }
  };
  
  // iOS-specific modal
  if (Platform.OS === 'ios') {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={onClose}
      >
        <RNView style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <RNView style={{
            backgroundColor: colors.card,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20
          }}>
            <XStack justifyContent="flex-end" marginBottom={10}>
              <Pressable onPress={onClose}>
                <Text color={colors.buttonBackground} fontSize={16}>Done</Text>
              </Pressable>
            </XStack>
            <DateTimePicker
              value={currentDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              themeVariant="dark"
            />
          </RNView>
        </RNView>
      </Modal>
    );
  }
  
  // Android implementation
  // On Android, the DateTimePicker shows as a dialog automatically
  return (
    <DateTimePicker
      value={currentDate}
      mode="date"
      display="calendar"
      onChange={handleDateChange}
      themeVariant="dark"
    />
  );
}

export default NativeCalendar;
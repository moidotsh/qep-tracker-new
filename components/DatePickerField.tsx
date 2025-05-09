// components/DatePickerField.tsx
import React, { useState } from 'react';
import { Button, Text, XStack, YStack } from 'tamagui';
import { Calendar } from '@tamagui/lucide-icons';
import { TouchableOpacity, Platform } from 'react-native';
import { useAppTheme } from './ThemeProvider';
import { format } from 'date-fns';

interface DatePickerFieldProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
}

export function DatePickerField({ value, onChange, label }: DatePickerFieldProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  const [showPicker, setShowPicker] = useState(false);
  
  // Format date for display
  const formattedDate = format(value, 'MMMM d, yyyy');
  
  // On web, we'll just use a native date input
  // On native, we would need to implement a custom date picker or use a library
  // For this example, we'll keep it simple
  return (
    <YStack space={spacing.small}>
      {label && (
        <Text color={colors.text} fontSize={fontSize.medium}>
          {label}
        </Text>
      )}
      
      <TouchableOpacity 
        onPress={() => Platform.OS === 'web' && setShowPicker(true)}
        activeOpacity={0.7}
      >
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
      
      {Platform.OS === 'web' && showPicker && (
        <YStack
          position="absolute"
          top="100%"
          left={0}
          right={0}
          backgroundColor={colors.card}
          padding={spacing.medium}
          borderRadius={borderRadius.small}
          marginTop={spacing.small}
          zIndex={999}
          shadowColor="black"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.2}
          shadowRadius={8}
        >
          <XStack justifyContent="space-between" marginBottom={spacing.small}>
            <Text color={colors.text} fontSize={fontSize.medium} fontWeight="600">
              Select Date
            </Text>
            <Button
              size="$2"
              onPress={() => setShowPicker(false)}
              backgroundColor="transparent"
              color={colors.text}
            >
              Done
            </Button>
          </XStack>
          
          <input
            type="date"
            value={format(value, 'yyyy-MM-dd')}
            onChange={(e) => {
              const newDate = e.target.value ? new Date(e.target.value) : new Date();
              onChange(newDate);
              setShowPicker(false);
            }}
            style={{
              backgroundColor: colors.cardAlt,
              color: colors.text,
              fontSize: 16,
              padding: 10,
              border: 'none',
              borderRadius: 8,
              width: '100%'
            }}
          />
        </YStack>
      )}
    </YStack>
  );
}
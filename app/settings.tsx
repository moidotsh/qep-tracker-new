// app/settings.tsx
import React, { useState } from 'react';
import { YStack, Text, XStack, Switch, Separator } from 'tamagui';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useAppTheme } from '../components/ThemeProvider';
import { AppButton } from '../components/AppButton';
import { Card } from '../components/Card';
import { clearAllData } from '../data/trainingData';
import { 
  Bell, 
  Moon, 
  LogOut, 
  Trash2, 
  HelpCircle, 
  Mail, 
  Shield, 
  ChevronRight 
} from '@tamagui/lucide-icons';
import { goBack, NavigationPath } from '../navigation';

export default function SettingsScreen() {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  
  // Mock settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeOnly, setDarkModeOnly] = useState(true); // Always true for now
  
  // Handle back button
  const handleBack = () => {
    goBack(NavigationPath.SETTINGS); // or PROGRESS, HISTORY, SETTINGS depending on the screen
  };
  
  // Handle data clearing
  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This action will permanently delete all your training data. This cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete Everything", 
          style: "destructive", 
          onPress: async () => {
            await clearAllData();
            Alert.alert("Success", "All data has been cleared");
            router.replace('/');
          }
        }
      ]
    );
  };
  
  return (
    <YStack flex={1} padding={spacing.large} backgroundColor={colors.background}>
      {/* Header */}
      <XStack alignItems="center" marginBottom={spacing.large}>
        <AppButton
          label="← Back"
          variant="subtle"
          size="small"
          onPress={handleBack}
        />
        <Text 
          fontSize={fontSize.xlarge} 
          fontWeight="bold" 
          color={colors.text} 
          marginLeft={spacing.small}
        >
          Settings
        </Text>
      </XStack>
      
      {/* App Settings */}
      <Text 
        color={colors.textSecondary} 
        fontSize={fontSize.small} 
        marginLeft={spacing.small}
        marginBottom={spacing.small}
        style={{ textTransform: 'uppercase' }}
      >
        App Settings
      </Text>
      
      <Card marginBottom={spacing.large}>
        <YStack>
          <XStack 
            justifyContent="space-between" 
            alignItems="center" 
            paddingVertical={16}
          >
            <XStack alignItems="center" space={spacing.medium}>
              <Bell size={24} color={colors.text} />
              <YStack>
                <Text color={colors.text} fontSize={fontSize.medium}>
                  Notifications
                </Text>
                <Text color={colors.textMuted} fontSize={fontSize.small}>
                  Session reminders and progress alerts
                </Text>
              </YStack>
            </XStack>
            
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
              backgroundColor={notificationsEnabled ? colors.buttonBackground : colors.cardAlt}
            />
          </XStack>
          
          <Separator backgroundColor={colors.border} />
          
          <XStack 
            justifyContent="space-between" 
            alignItems="center" 
            paddingVertical={16}
          >
            <XStack alignItems="center" space={spacing.medium}>
              <Moon size={24} color={colors.text} />
              <Text color={colors.text} fontSize={fontSize.medium}>
                Dark Mode Only
              </Text>
            </XStack>
            
            <Switch
              checked={darkModeOnly}
              onCheckedChange={setDarkModeOnly}
              backgroundColor={darkModeOnly ? colors.buttonBackground : colors.cardAlt}
              disabled={true} // Disabled for now as we only support dark mode
            />
          </XStack>
        </YStack>
      </Card>
      
      {/* Support Settings */}
      <Text 
        color={colors.textSecondary} 
        fontSize={fontSize.small} 
        marginLeft={spacing.small}
        marginBottom={spacing.small}
        style={{ textTransform: 'uppercase' }}
      >
        Support
      </Text>
      
      <Card marginBottom={spacing.large}>
        <YStack>
          <XStack 
            justifyContent="space-between" 
            alignItems="center" 
            paddingVertical={16}
            onPress={() => console.log('Help pressed')}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <XStack alignItems="center" space={spacing.medium}>
              <HelpCircle size={24} color={colors.text} />
              <Text color={colors.text} fontSize={fontSize.medium}>
                Help & Support
              </Text>
            </XStack>
            
            <ChevronRight size={18} color={colors.textMuted} />
          </XStack>
          
          <Separator backgroundColor={colors.border} />
          
          <XStack 
            justifyContent="space-between" 
            alignItems="center" 
            paddingVertical={16}
            onPress={() => console.log('Contact pressed')}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <XStack alignItems="center" space={spacing.medium}>
              <Mail size={24} color={colors.text} />
              <Text color={colors.text} fontSize={fontSize.medium}>
                Contact Us
              </Text>
            </XStack>
            
            <ChevronRight size={18} color={colors.textMuted} />
          </XStack>
          
          <Separator backgroundColor={colors.border} />
          
          <XStack 
            justifyContent="space-between" 
            alignItems="center" 
            paddingVertical={16}
            onPress={() => console.log('Privacy pressed')}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <XStack alignItems="center" space={spacing.medium}>
              <Shield size={24} color={colors.text} />
              <Text color={colors.text} fontSize={fontSize.medium}>
                Privacy Policy
              </Text>
            </XStack>
            
            <ChevronRight size={18} color={colors.textMuted} />
          </XStack>
        </YStack>
      </Card>
      
      {/* Account Settings */}
      <Text 
        color={colors.textSecondary} 
        fontSize={fontSize.small} 
        marginLeft={spacing.small}
        marginBottom={spacing.small}
        style={{ textTransform: 'uppercase' }}
      >
        Account
      </Text>
      
      <Card marginBottom={spacing.large}>
        <YStack>
          {/* In a real app, this would log the user out */}
          <XStack 
            justifyContent="space-between" 
            alignItems="center" 
            paddingVertical={16}
            onPress={() => console.log('Log out pressed')}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <XStack alignItems="center" space={spacing.medium}>
              <LogOut size={24} color={colors.text} />
              <Text color={colors.text} fontSize={fontSize.medium}>
                Log Out
              </Text>
            </XStack>
          </XStack>
          
          <Separator backgroundColor={colors.border} />
          
          <XStack 
            justifyContent="space-between" 
            alignItems="center" 
            paddingVertical={16}
            onPress={handleClearData}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <XStack alignItems="center" space={spacing.medium}>
              <Trash2 size={24} color="#FF3B30" />
              <YStack>
                <Text color="#FF3B30" fontSize={fontSize.medium}>
                  Clear All Data
                </Text>
                <Text color={colors.textMuted} fontSize={fontSize.small}>
                  This action cannot be undone
                </Text>
              </YStack>
            </XStack>
          </XStack>
        </YStack>
      </Card>
      
      {/* Version */}
      <YStack alignItems="center" marginTop={40}>
        <Text color={colors.textMuted} fontSize={13}>
          Version 1.0.0
        </Text>
      </YStack>
    </YStack>
  );
}
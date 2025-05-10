// app/settings.tsx
import React, { useState } from 'react';
import { YStack, Text, XStack, Switch } from 'tamagui';
import { Alert } from 'react-native';
import { useAppTheme } from '../components/ThemeProvider';
import PageContainer from '../components/Layout/PageContainer';
import ScreenHeader from '../components/Layout/ScreenHeader';
import SettingItem from '../components/Settings/SettingItem';
import SettingsGroup from '../components/Settings/SettingsGroup';
import { clearAllData } from '../data/trainingData';
import { NavigationPath } from '../navigation';
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
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { colors, spacing, fontSize } = useAppTheme();
  
  // Mock settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeOnly, setDarkModeOnly] = useState(true); // Always true for now
  
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
    <PageContainer paddingHorizontal={0}>
      <YStack paddingHorizontal={spacing.large} marginBottom={spacing.medium}>
        <ScreenHeader
          title="Settings"
          currentPath={NavigationPath.SETTINGS}
        />
      </YStack>
      
      {/* App Settings */}
      <SettingsGroup title="APP SETTINGS">
        <SettingItem 
          icon={<Bell />}
          title="Notifications"
          description="Session reminders and progress alerts"
          rightElement={
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
              backgroundColor={notificationsEnabled ? colors.buttonBackground : colors.cardAlt}
            />
          }
        />
        
        <SettingItem 
          icon={<Moon />}
          title="Dark Mode Only"
          rightElement={
            <Switch
              checked={darkModeOnly}
              onCheckedChange={setDarkModeOnly}
              backgroundColor={darkModeOnly ? colors.buttonBackground : colors.cardAlt}
              disabled={true} // Disabled for now as we only support dark mode
            />
          }
        />
      </SettingsGroup>
      
      {/* Support Settings */}
      <SettingsGroup title="SUPPORT">
        <SettingItem 
          icon={<HelpCircle />}
          title="Help & Support"
          rightElement={<ChevronRight size={18} color={colors.textMuted} />}
          onPress={() => console.log('Help pressed')}
        />
        
        <SettingItem 
          icon={<Mail />}
          title="Contact Us"
          rightElement={<ChevronRight size={18} color={colors.textMuted} />}
          onPress={() => console.log('Contact pressed')}
        />
        
        <SettingItem 
          icon={<Shield />}
          title="Privacy Policy"
          rightElement={<ChevronRight size={18} color={colors.textMuted} />}
          onPress={() => console.log('Privacy pressed')}
        />
      </SettingsGroup>
      
      {/* Account Settings */}
      <SettingsGroup title="ACCOUNT">
        <SettingItem 
          icon={<LogOut />}
          title="Log Out"
          onPress={() => console.log('Log out pressed')}
        />
        
        <SettingItem 
          icon={<Trash2 />}
          title="Clear All Data"
          description="This action cannot be undone"
          destructive
          onPress={handleClearData}
        />
      </SettingsGroup>
      
      {/* Version */}
      <YStack alignItems="center" marginTop={40}>
        <Text color={colors.textMuted} fontSize={13}>
          Version 1.0.0
        </Text>
      </YStack>
    </PageContainer>
  );
}
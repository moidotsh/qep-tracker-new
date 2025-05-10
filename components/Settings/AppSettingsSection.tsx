// components/Settings/AppSettingsSection.tsx
import React from 'react';
import { Platform } from 'react-native';
import { Switch } from 'tamagui';
import { Bell, Moon, Smartphone } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import { SettingsGroup } from './SettingsGroup';
import { SettingItem } from './SettingItem';

interface AppSettingsSectionProps {
  /**
   * Whether notifications are enabled
   */
  notificationsEnabled: boolean;
  
  /**
   * Handler for changing notifications setting
   */
  setNotificationsEnabled: (enabled: boolean) => void;
  
  /**
   * Whether dark mode is enabled (always true for now)
   */
  darkModeOnly: boolean;
  
  /**
   * Handler for changing dark mode setting
   */
  setDarkModeOnly: (enabled: boolean) => void;
  
  /**
   * Whether constrained view is enabled
   */
  constrainedView?: boolean;
  
  /**
   * Handler for changing constrained view setting
   */
  toggleConstrainedView?: () => void;
}

/**
 * App settings section for the settings screen
 */
export function AppSettingsSection({
  notificationsEnabled,
  setNotificationsEnabled,
  darkModeOnly,
  setDarkModeOnly,
  constrainedView,
  toggleConstrainedView
}: AppSettingsSectionProps) {
  const { colors } = useAppTheme();
  const isWeb = Platform.OS === 'web';
  
  return (
    <SettingsGroup>
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
        description="Always use dark theme"
        rightElement={
          <Switch
            checked={darkModeOnly}
            onCheckedChange={setDarkModeOnly}
            backgroundColor={darkModeOnly ? colors.buttonBackground : colors.cardAlt}
          />
        }
      />
      
      {/* Only show constrained view setting on web */}
      {isWeb && constrainedView !== undefined && toggleConstrainedView && (
        <SettingItem 
          icon={<Smartphone />}
          title="Phone-Width Layout"
          description="Constrain the app to phone dimensions"
          rightElement={
            <Switch
              checked={constrainedView}
              onCheckedChange={toggleConstrainedView}
              backgroundColor={constrainedView ? colors.buttonBackground : colors.cardAlt}
            />
          }
        />
      )}
    </SettingsGroup>
  );
}

export default AppSettingsSection;
// app/settings.tsx
import React, { useState } from 'react';
import { Alert } from 'react-native';
import PageContainer from '../components/Layout/PageContainer';
import ScreenHeader from '../components/Layout/ScreenHeader';
import AppSettingsSection from '../components/Settings/AppSettingsSection';
import SupportSettingsSection from '../components/Settings/SupportSettingsSection';
import AccountSettingsSection from '../components/Settings/AccountSettingsSection';
import VersionDisplay from '../components/Settings/VersionDisplay';
import { NavigationPath } from '../navigation/NavigationHelper';
import { clearAllData } from '../data/trainingData';
import { useAppTheme } from '../components/ThemeProvider';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { constrainedView, toggleConstrainedView } = useAppTheme();
  
  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeOnly, setDarkModeOnly] = useState(true);
  
  // Handle data clearing
  const handleClearData = async () => {
    await clearAllData();
    Alert.alert("Success", "All data has been cleared");
    router.push('/');
  };
  
  // Handle (mock) logout
  const handleLogOut = () => {
    // In a real app, this would clear the session and navigate to login
    console.log('User logged out');
  };
  
  return (
    <PageContainer paddingHorizontal={0}>
      <ScreenHeader
        title="Settings"
        currentPath={NavigationPath.SETTINGS}
        paddingHorizontal={16}
      />
      
      {/* App Settings */}
      <AppSettingsSection
        notificationsEnabled={notificationsEnabled}
        setNotificationsEnabled={setNotificationsEnabled}
        darkModeOnly={darkModeOnly}
        setDarkModeOnly={setDarkModeOnly}
        constrainedView={constrainedView}
        toggleConstrainedView={toggleConstrainedView}
      />
      
      {/* Support Settings */}
      <SupportSettingsSection
        marginTop={8}
        helpUrl="https://quickextenderpro.com/help"
        contactEmail="support@quickextenderpro.com"
        privacyUrl="https://quickextenderpro.com/privacy"
      />
      
      {/* Account Settings */}
      <AccountSettingsSection
        marginTop={8}
        // onLogOut={handleLogOut}
        onClearData={handleClearData}
      />
      
      {/* Version Display */}
      <VersionDisplay version="1.0.0" marginTop={40} />
    </PageContainer>
  );
}
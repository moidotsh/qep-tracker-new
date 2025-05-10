// app/log-session.tsx
import React from 'react';
import { router } from 'expo-router';
import PageContainer from '../components/Layout/PageContainer';
import ScreenHeader from '../components/Layout/ScreenHeader';
import SessionForm from '../components/Sessions/SessionForm';
import { NavigationPath } from '../navigation/NavigationHelper';

export default function LogSessionScreen() {
  // Handle successful submission
  const handleSubmitSuccess = () => {
    // Navigate back to home page after successful submission
    router.back();
  };

  return (
    <PageContainer>
      <ScreenHeader
        title="Log Session"
        currentPath={NavigationPath.LOG_SESSION}
      />
      
      <SessionForm onSubmitSuccess={handleSubmitSuccess} />
    </PageContainer>
  );
}
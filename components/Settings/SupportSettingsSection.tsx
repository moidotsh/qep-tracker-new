// components/Settings/SupportSettingsSection.tsx
import React from 'react';
import { Linking } from 'react-native';
import { HelpCircle, Mail, Shield, ChevronRight } from '@tamagui/lucide-icons';
import { SettingsGroup } from './SettingsGroup';
import { SettingItem } from './SettingItem';

interface SupportSettingsSectionProps {
  /**
   * Title for the section
   */
  title?: string;
  
  /**
   * URL for help & support
   */
  helpUrl?: string;
  
  /**
   * Email for contact
   */
  contactEmail?: string;
  
  /**
   * URL for privacy policy
   */
  privacyUrl?: string;
  
  /**
   * Margin top for the section
   */
  marginTop?: number | string;
}

/**
 * Support settings section for the settings screen
 */
export function SupportSettingsSection({
  title = "SUPPORT",
  helpUrl = "https://example.com/help",
  contactEmail = "support@example.com",
  privacyUrl = "https://example.com/privacy",
  marginTop
}: SupportSettingsSectionProps) {
  const handleHelp = () => {
    Linking.openURL(helpUrl);
  };
  
  const handleContact = () => {
    Linking.openURL(`mailto:${contactEmail}`);
  };
  
  const handlePrivacy = () => {
    Linking.openURL(privacyUrl);
  };
  
  return (
    <SettingsGroup title={title} marginTop={marginTop}>
      <SettingItem 
        icon={<HelpCircle />}
        title="Help & Support"
        rightElement={<ChevronRight size={18} />}
        onPress={handleHelp}
      />
      
      <SettingItem 
        icon={<Mail />}
        title="Contact Us"
        rightElement={<ChevronRight size={18} />}
        onPress={handleContact}
      />
      
      <SettingItem 
        icon={<Shield />}
        title="Privacy Policy"
        rightElement={<ChevronRight size={18} />}
        onPress={handlePrivacy}
      />
    </SettingsGroup>
  );
}

export default SupportSettingsSection;
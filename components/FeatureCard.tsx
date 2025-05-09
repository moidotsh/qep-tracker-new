// components/FeatureCard.tsx
import React from 'react';
import { Card, XStack, YStack, Text } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

export function FeatureCard({ icon, title, onPress }: FeatureCardProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();

  return (
    <Card
      backgroundColor={colors.card}
      borderRadius={borderRadius.medium}
      padding={spacing.large}
      flex={1}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
      onPress={onPress}
      elevation={2}
    >
      <YStack alignItems="center" space={spacing.small}>
        {icon}
        <Text 
          fontSize={fontSize.medium} 
          fontWeight="500" 
          color={colors.text}
        >
          {title}
        </Text>
      </YStack>
    </Card>
  );
}

export function FeatureSection({ features }: { features: Array<{ icon: React.ReactNode; title: string; onPress: () => void; }> }) {
  const { spacing } = useAppTheme();
  
  return (
    <XStack justifyContent="space-between">
      {features.map((feature, index) => (
        <React.Fragment key={index}>
          {index > 0 && <YStack width={spacing.medium} />}
          <FeatureCard
            icon={feature.icon}
            title={feature.title}
            onPress={feature.onPress}
          />
        </React.Fragment>
      ))}
    </XStack>
  );
}
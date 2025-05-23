// components/FeatureCard.tsx
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Card, XStack, YStack, Text } from 'tamagui';
import { useAppTheme } from './ThemeProvider';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

export function FeatureCard({ icon, title, onPress }: FeatureCardProps) {
  const { colors, spacing, fontSize, borderRadius } = useAppTheme();
  const { width } = useWindowDimensions();
  const isNarrow = width < 350;

  return (
    <Card
      backgroundColor={colors.card}
      borderRadius={borderRadius.medium}
      padding={isNarrow ? spacing.medium : spacing.large}
      flex={1}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
      onPress={onPress}
      elevate
      focusStyle={{}}
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
        outline: 'none'
      }}
    >
      <YStack alignItems="center" space={spacing.small}>
        <Text>{icon}</Text>
        <Text 
          fontSize={isNarrow ? fontSize.xs : fontSize.xs} 
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
    <XStack justifyContent="space-between" marginTop={spacing.xxs}>
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
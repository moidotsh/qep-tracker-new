// components/Home/FullGridModal.tsx
import React from 'react';
import { Modal as RNModal, useWindowDimensions, Platform } from 'react-native';
import { YStack, XStack, Button, Text, ScrollView, View } from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import { useAppTheme } from '../ThemeProvider';
import HourTrackerRow from '../HourTracker/HourTrackerRow';
import { GRID_ROWS } from '../HourTracker/HourTrackerLogic';

interface FullGridModalProps {
  visible: boolean;
  onClose: () => void;
  stageName: string;
  percentage: number;
}

export function FullGridModal({ visible, onClose, stageName, percentage }: FullGridModalProps) {
  const { colors, spacing, fontSize, borderRadius, constrainedView } = useAppTheme();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';

  return (
    <RNModal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <YStack
        flex={1}
        backgroundColor={"rgba(0,0,0,0.85)"}
        justifyContent="flex-end"
        // Add constraints for web
        style={isWeb && constrainedView ? {
          maxWidth: 480,
          alignSelf: "center",
          width: "100%"
        } : undefined}
      >
        <YStack
          backgroundColor={colors.card}
          padding={0}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          // Adjust modal height based on platform
          height={isWeb ? "85%" : "92%"}
          // On web, with constrained view
          {...(isWeb && constrainedView ? {
            maxWidth: 480,
            alignSelf: "center",
            width: "100%",
            borderRadius: 20,
            marginBottom: 40
          } : isWeb ? {
            maxWidth: 800,
            alignSelf: "center",
            width: "100%",
            borderRadius: 20,
            marginBottom: 40
          } : {})}
        >
          {/* Handle Bar at top */}
          <YStack
            alignSelf="center"
            width={60}
            height={5}
            backgroundColor={colors.border}
            marginVertical={spacing.medium}
            borderRadius={2.5}
          />

          {/* Header with title and close button */}
          <YStack paddingHorizontal={spacing.large} marginBottom={spacing.medium}>
            <XStack
              justifyContent="space-between"
              alignItems="center"
            >
              <YStack>
                <Text
                  color={colors.text}
                  fontSize={fontSize.xlarge}
                  fontWeight="600"
                >
                  Training Progress
                </Text>
                <Text
                  color={colors.textMuted}
                  fontSize={fontSize.medium}
                  fontWeight="400"
                  marginTop={4}
                >
                  Stage: {stageName} - {percentage}% Complete
                </Text>
              </YStack>

              <Button
                height={38}
                width={38}
                circular
                onPress={onClose}
                backgroundColor="transparent"
                icon={<X size={20} color={colors.text} />}
              />
            </XStack>
          </YStack>

          {/* Grid content - NO outer border, just the scroll container */}
          <YStack
            flex={1}
            overflow="hidden"
            marginHorizontal={spacing.large}
            marginBottom={spacing.large}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingVertical: spacing.medium,
                alignItems: 'center'
              }}
              showsVerticalScrollIndicator={true}
            >
              {/* Grid rows without the outer border container */}
              <YStack alignItems="center" padding={spacing.medium}>
                {Array.from({ length: GRID_ROWS }).map((_, rowIndex) => (
                  <HourTrackerRow
                    key={`row-${rowIndex}`}
                    row={rowIndex}
                    cellSize={40}
                    forceVisible={true}
                  />
                ))}
              </YStack>
            </ScrollView>
          </YStack>

          {/* Show Less button at bottom */}
          <YStack
            padding={spacing.large}
            paddingTop={0}
            alignItems="center"
          >
            <Button
              height={45}
              minWidth={150}
              backgroundColor={colors.cardAlt}
              color={colors.text}
              paddingHorizontal={spacing.large}
              borderRadius={50}
              onPress={onClose}
            >
              <Text fontSize={16} fontWeight="500" color={colors.text}>
                Show Less
              </Text>
            </Button>
          </YStack>
        </YStack>
      </YStack>
    </RNModal>
  );
}
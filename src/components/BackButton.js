import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, zIndices } from '../styles/GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
    accessibilityLabel="Wróć do menu głównego"
  >
    <Ionicons name="home" size={24} color={colors.text} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.sm,
    width: 40,
    height: 40,
    zIndex: zIndices.notification, // Using notification zIndex for now
    borderRadius: 20,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;

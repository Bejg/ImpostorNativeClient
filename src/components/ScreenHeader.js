import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../styles/GlobalStyles';

const ScreenHeader = ({ title, onBack, children }) => {
  useEffect(() => {
    // Obsługa przycisku wstecz na Androidzie
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true; // Zatrzymaj domyślne zachowanie przycisku wstecz
    });

    // Usuń listener przy odmontowaniu komponentu
    return () => backHandler.remove();
  }, [onBack]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.placeholder} /> {/* Placeholder for alignment */}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    ...typography.h2,
    flex: 1,
    textAlign: 'center',
    marginRight: 30, // To account for the back button
  },
  placeholder: {
    width: 30, // Same width as the back button area
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: spacing.md,
  },
});

export default ScreenHeader;
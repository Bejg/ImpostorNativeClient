import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, layout } from '../styles/GlobalStyles';

const SettingsOptionScreen = ({ title, onBack }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.placeholder} /> {/* Placeholder for alignment */}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>Opcja wdrożona wkrótce...</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...layout.screen,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    ...typography.h1,
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    ...typography.p,
    fontSize: 18,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});

export default SettingsOptionScreen;
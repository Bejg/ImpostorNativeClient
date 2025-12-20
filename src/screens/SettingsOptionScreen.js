import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, typography, layout } from '../styles/GlobalStyles';
import ScreenHeader from '../components/ScreenHeader';

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
      <ScreenHeader title={title} onBack={onBack}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>Opcja wdrożona wkrótce...</Text>
        </View>
      </ScreenHeader>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...layout.screen,
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
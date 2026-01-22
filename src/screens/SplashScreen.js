import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, layout, spacing, components } from '../styles/GlobalStyles';

const SplashScreen = ({ onHealthCheckComplete, apiUrl }) => {
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const checkHealth = useCallback(async () => {
    setConnectionStatus('checking');
    try {
      const response = await fetch(`${apiUrl}/health`);
      if (response.ok) {
        setConnectionStatus('connected');
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => onHealthCheckComplete(true));
        return true;
      }
    } catch (error) {
      console.error('Błąd podczas sprawdzania health check: ', error);
    }
    setConnectionStatus('disconnected');
    return false;
  }, [apiUrl, onHealthCheckComplete, fadeAnim]);

  useEffect(() => {
    const initialCheck = async () => {
      const success = await checkHealth();
      if (!success) {
        const interval = setInterval(async () => {
          await checkHealth();
        }, 7000);
        return () => clearInterval(interval);
      }
    };
    initialCheck();
  }, [checkHealth]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <LinearGradient colors={colors.background} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.logo}>IMPOSTOR</Text>
          <Text style={styles.title}>Ładowanie...</Text>
          <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
          
          {connectionStatus === 'disconnected' && (
            <View style={styles.disconnectedContainer}>
                          <Text style={styles.retryText}>
                            Próba połączenia z serwrem gry
                          </Text>
                        </View>          )}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...layout.screen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    ...typography.h1,
    fontSize: 48,
    marginBottom: spacing.xl,
    color: colors.primary,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  spinner: {
    marginVertical: spacing.xl,
  },
  disconnectedContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  retryText: {
    ...typography.p,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

});

export default SplashScreen;
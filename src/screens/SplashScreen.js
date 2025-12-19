import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, layout } from '../styles/GlobalStyles';

const SplashScreen = ({ onHealthCheckComplete, apiUrl }) => {
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'
  const [retryCount, setRetryCount] = useState(0);

  const checkHealth = async () => {
    try {
      const response = await fetch(`${apiUrl}/health`);
      if (response.ok) {
        // Sprawdź typ odpowiedzi, aby uniknąć błędów parsowania
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (data.status === 'OK') {
            setConnectionStatus('connected');
            setTimeout(() => {
              onHealthCheckComplete(true);
            }, 1000); // Mała opóźnienie dla lepszego efektu wizualnego
            return true;
          }
        } else {
          // Jeśli odpowiedź nie jest JSON, ale status OK, uznajemy za połączone
          setConnectionStatus('connected');
          setTimeout(() => {
            onHealthCheckComplete(true);
          }, 1000);
          return true;
        }
      }
    } catch (error) {
      console.error('Błąd podczas sprawdzania health check:', error);
    }

    setConnectionStatus('disconnected');
    return false;
  };

  useEffect(() => {
    const initialCheck = async () => {
      const success = await checkHealth();
      if (!success) {
        // Rozpocznij cykliczne sprawdzanie co 7 sekund
        const interval = setInterval(async () => {
          setRetryCount(prev => prev + 1);
          const success = await checkHealth();
          if (success) {
            clearInterval(interval);
          }
        }, 7000);

        // Wyczyść interwał przy odmontowaniu komponentu
        return () => clearInterval(interval);
      }
    };

    initialCheck();
  }, []);

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ładowanie gry...</Text>
        <ActivityIndicator size="large" color={colors.primary} style={styles.spinner} />
        
        {connectionStatus === 'disconnected' && (
          <Text style={styles.retryText}>
            Próba ponownego łączenia z serwerem gry. (Próba: {retryCount + 1})
          </Text>
        )}
      </View>
    </LinearGradient>
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
    paddingHorizontal: 20,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    marginBottom: 30,
  },
  spinner: {
    marginVertical: 20,
  },
  retryText: {
    ...typography.p,
    textAlign: 'center',
    color: colors.warning,
    marginTop: 10,
  },
});

export default SplashScreen;
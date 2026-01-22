import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, typography, layout } from '../styles/GlobalStyles';

const RevealScreen = ({ playerName, role, secretWord, category, impostorHint, onNext }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPassing, setIsPassing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsRevealed(false);
    setIsPassing(false);
  }, [playerName, fadeAnim]);

  useEffect(() => {
    if (isRevealed && role === 'Impostor') {
      // Add a subtle shake animation for impostor reveal
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRevealed, role, shakeAnim]);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handlePass = () => {
    setIsPassing(true);
    setTimeout(() => {
      onNext();
    }, 500);
  };

  if (isPassing) {
    return (
      <Animated.View style={[styles.screen, styles.handoffScreen, { opacity: fadeAnim }]}>
        <Text style={typography.h2}>Przekazywanie...</Text>
        <Text style={styles.handoffText}>Podaj telefon <Text style={typography.highlight}>następnemu graczowi</Text> teraz.</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Tura: <Text style={typography.highlight}>{playerName}</Text></Text>
      <Text style={styles.subtitle}>Przekaż telefon tej osobie</Text>

      <TouchableOpacity
        style={[
          styles.roleCard,
          !isRevealed || role !== 'Impostor' ? { borderColor: colors.primary } : styles.roleCardImpostor,
          ...(role === 'Impostor' && isRevealed ? [{ transform: [{ translateX: shakeAnim }] }] : [])
        ]}
        onPress={handleReveal}
        activeOpacity={0.8}
      >
        {!isRevealed ? (
          <Text style={styles.tapHint}>Dotknij, aby zobaczyć rolę</Text>
        ) : (
          <View style={styles.roleContent}>
            {role === 'Impostor' ? (
              <>
                <Text style={styles.roleTitleImpostor}>IMPOSTOR</Text>
                <Text style={styles.roleDescription}>Twój cel: Nie daj się złapać!</Text>
                <View style={styles.impostorHintBox}>
                  <Text style={styles.impostorHintTitle}>Podpowiedź:</Text>
                  <Text style={styles.impostorHintText}>{impostorHint}</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.categoryLabel}>{category}</Text>
                <Text style={styles.secretWord}>{secretWord}</Text>
                <Text style={styles.roleDescription}>Jesteś zwykłym obywatelem.</Text>
              </>
            )}
          </View>
        )}
      </TouchableOpacity>

      {isRevealed && (
        <TouchableOpacity
          style={[
            styles.btn,
            role === 'Impostor' ? styles.btnDanger : styles.btnPrimary
          ]}
          onPress={handlePass}
        >
          <Text style={styles.btnText}>Ok, podaj dalej</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: { ...layout.screen, justifyContent: 'center' },
  title: { ...typography.h2, textAlign: 'center' },
  subtitle: { ...typography.p, textAlign: 'center', marginBottom: 20 },
  roleCard: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.cardInput,
    borderWidth: 2,
    padding: 20,
    marginBottom: 20,
  },
  roleCardImpostor: {
    backgroundColor: colors.cardInput,
    borderColor: colors.danger,
  },
  tapHint: {
    color: colors.textPlaceholder,
    fontSize: 16,
    fontWeight: '500',
  },
  roleContent: {
    alignItems: 'center',
  },
  roleTitleImpostor: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.danger,
    marginBottom: 10,
  },
  secretWord: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 10,
  },
  categoryLabel: {
    ...typography.p,
    color: colors.textPlaceholder,
  },
  roleDescription: {
    ...typography.p,
    textAlign: 'center',
  },
  impostorHintBox: {
    backgroundColor: colors.dangerTransparent,
    borderRadius: 12,
    padding: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  impostorHintTitle: {
    color: colors.danger,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  impostorHintText: {
    color: colors.text,
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: colors.primary,
  },
  btnDanger: {
    backgroundColor: colors.danger,
  },
  btnText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  handoffScreen: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  handoffText: {
      ...typography.p,
      textAlign: 'center',
  }
});

export default RevealScreen;
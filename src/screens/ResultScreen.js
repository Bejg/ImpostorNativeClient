import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, typography, layout, components } from '../styles/GlobalStyles';

const ResultScreen = ({ winner, secretWord, onRestart, onDeleteWord, wordId }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleDelete = async () => {
    if (isDeleted) return;

    const success = await onDeleteWord();
    if (success) {
      setIsDeleted(true);
    }
  };

  return (
    <Animated.View style={[styles.screen, winner.type === 'Citizens' ? styles.winBg : styles.loseBg, { opacity: fadeAnim }]}>
      <Text style={styles.title}>{winner.type === 'Citizens' ? 'Wygrana Obywateli!' : 'Wygrana Impostorów!'}</Text>
      <Text style={styles.resultMsg}>{winner.msg}</Text>
      
      <View style={styles.revealWord}>
        <Text style={styles.revealTitle}>Tajne hasło to:</Text>
        <Text style={styles.secretWordText}>{secretWord}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onRestart}>
          <Text style={styles.btnText}>Nowa Gra</Text>
        </TouchableOpacity>
        {wordId && (
          <TouchableOpacity 
            style={[styles.btn, styles.btnDanger, isDeleted && styles.btnDisabled]} 
            onPress={handleDelete}
            disabled={isDeleted}
          >
            <Text style={styles.btnText}>{isDeleted ? 'Usunięto!' : 'Usuń Słowo'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...layout.screen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winBg: {
    borderColor: colors.success,
  },
  loseBg: {
    borderColor: colors.danger,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
  },
  resultMsg: {
    ...typography.p,
    textAlign: 'center',
    marginBottom: 20,
  },
  revealWord: {
    ...components.card,
    marginVertical: 25,
  },
  revealTitle: {
    ...typography.p,
  },
  secretWordText: {
    ...typography.h2,
    color: colors.primary,
    marginTop: 10,
  },
  buttonGroup: {
    width: '100%',
    gap: 10,
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
  btnDisabled: {
    backgroundColor: '#888',
  },
  btnText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResultScreen;

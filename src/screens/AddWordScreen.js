import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors, typography, layout } from '../styles/GlobalStyles';

const AddWordScreen = ({ onAddWord, onBack }) => {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleAdd = async () => {
    const success = await onAddWord(word, hint);
    if (success) {
      setWord('');
      setHint('');
      // Optionally navigate back or show confirmation
    }
  };

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      <Text style={typography.h1}>Dodaj Nowe Słowo</Text>
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Nowe słowo..."
            placeholderTextColor={colors.textPlaceholder}
            value={word}
            onChangeText={setWord}
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Podpowiedź..."
            placeholderTextColor={colors.textPlaceholder}
            value={hint}
            onChangeText={setHint}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={handleAdd}>
            <Text style={styles.btnText}>Dodaj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={onBack}>
            <Text style={styles.btnText}>Wróć</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...layout.screen,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.cardInput,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  inputRow: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: colors.cardInput,
    borderWidth: 2,
    borderColor: colors.inactive,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
  },
  buttonGroup: {
    marginTop: 10,
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
  btnSecondary: {
    backgroundColor: colors.cardInput,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  btnText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddWordScreen;

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, typography, layout } from '../styles/GlobalStyles';

const MIN_PLAYERS = 3;

const SetupScreen = ({ players, setPlayers, impostorCount, setImpostorCount, onStart, onNavigateToAddWord, onNavigateToPlayers, onNavigateToGameMode, onNavigateToCategories }) => {
  const maxImpostors = Math.max(1, players.length - 1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (impostorCount > maxImpostors) {
      setImpostorCount(maxImpostors);
    }
  }, [players.length, impostorCount, maxImpostors, setImpostorCount]);

  const settingsOptions = [
    {
      id: 'players',
      title: 'Gracze',
      subtitle: `${players.length} graczy`,
      onPress: onNavigateToPlayers
    },
    {
      id: 'gameMode',
      title: 'Tryb gry',
      subtitle: 'Standardowy',
      onPress: onNavigateToGameMode
    },
    {
      id: 'categories',
      title: 'Kategorie',
      subtitle: 'Domyślne',
      onPress: onNavigateToCategories
    },
  ];

  const renderSettingOption = ({ item }) => (
    <TouchableOpacity style={styles.settingItem} onPress={item.onPress}>
      <View style={styles.settingContent}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.text} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      <Text style={typography.h1}>Konfiguracja Gry</Text>
      <View style={styles.container}>
        <ScrollView style={styles.settingsList}>
          {settingsOptions.map(option => (
            <TouchableOpacity key={option.id} style={styles.settingItem} onPress={option.onPress}>
              <View style={styles.settingContent}>
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>{option.title}</Text>
                  <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.settingsRow}>
          <Text style={styles.label}>Impostorzy: {impostorCount}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={maxImpostors}
            step={1}
            value={impostorCount}
            onValueChange={setImpostorCount}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.inactive}
            thumbTintColor={colors.primary}
          />
        </View>

        <View style={[styles.buttonGroup, { paddingHorizontal: 20 }]}>
          <TouchableOpacity
            style={[styles.btn, styles.btnPrimary, players.length < MIN_PLAYERS && styles.btnDisabled]}
            onPress={onStart}
            disabled={players.length < MIN_PLAYERS}
          >
            <Text style={styles.btnText}>ROZPOCZNIJ GRĘ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={onNavigateToAddWord}>
            <Text style={styles.btnText}>Dodaj Słowo</Text>
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
  container: {
    flex: 1,
    width: '100%',
  },
  settingsList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  settingItem: {
    backgroundColor: colors.cardInput,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  settingSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  settingsRow: {
    alignItems: 'stretch',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: 15,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonGroup: {
    marginTop: 20,
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
  btnDisabled: {
    backgroundColor: colors.inactive,
  },
  btnText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default SetupScreen;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { colors, typography, layout } from '../styles/GlobalStyles';

const MIN_PLAYERS = 3;

const SetupScreen = ({ players, setPlayers, impostorCount, setImpostorCount, onStart, onNavigateToAddWord }) => {
  const [newName, setNewName] = useState('');
  const maxImpostors = Math.max(1, players.length - 1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const addPlayer = () => {
    if (newName.trim()) {
      setPlayers([...players, newName.trim()]);
      setNewName('');
      Keyboard.dismiss();
    }
  };

  const removePlayer = (index) => {
    const newCtx = [...players];
    newCtx.splice(index, 1);
    setPlayers(newCtx);
    if (impostorCount >= newCtx.length) {
      setImpostorCount(Math.max(1, newCtx.length - 1));
    }
  };

  useEffect(() => {
    if (impostorCount > maxImpostors) {
      setImpostorCount(maxImpostors);
    }
  }, [players.length, impostorCount, maxImpostors, setImpostorCount]);

  const renderPlayer = ({ item, index }) => (
    <View style={styles.playerListItem}>
      <Text style={styles.playerListItemText}>{item}</Text>
      <TouchableOpacity style={styles.btnRemove} onPress={() => removePlayer(index)}>
        <Ionicons name="close" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      <Text style={typography.h1}>Konfiguracja Graczy</Text>
      <View style={{ flex: 1}}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Imię gracza..."
            placeholderTextColor={colors.textPlaceholder}
            value={newName}
            onChangeText={setNewName}
            onSubmitEditing={addPlayer}
          />
          <TouchableOpacity style={styles.btnSmall} onPress={addPlayer}>
            <Ionicons name="add" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.playerList}
          data={players}
          renderItem={renderPlayer}
          keyExtractor={(item, index) => index.toString()}
        />
        
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

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.btn, styles.btnPrimary]} onPress={onStart}>
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
  card: {
    backgroundColor: colors.cardInput,
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: colors.cardItem,
    borderWidth: 2,
    borderColor: colors.inactive,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
    flexGrow: 1,
    height: 50,
  },
  playerList: {
    flexGrow: 1,
    marginBottom: 20,
  },
  playerListItem: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerListItemText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
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
  btnSmall: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  btnRemove: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  btnText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  btnRemoveText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SetupScreen;

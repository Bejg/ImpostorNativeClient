import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, layout } from '../styles/GlobalStyles';
import ScreenHeader from '../components/ScreenHeader';

const MIN_PLAYERS = 3;

const PlayersScreen = ({ players, setPlayers, onBack }) => {
  const [newName, setNewName] = useState('');
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
      // Sprawdź, czy gracz o tej nazwie już istnieje
      if (!players.some(player => player.toLowerCase() === newName.trim().toLowerCase())) {
        setPlayers([...players, newName.trim()]);
        setNewName('');
        Keyboard.dismiss();
      } else {
        // Możesz dodać powiadomienie o duplikacie, jeśli chcesz
        // Na razie zostawiam puste, ale w przyszłości można dodać InfoCard
      }
    }
  };

  const removePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

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
      <ScreenHeader title="Zarządzaj Graczami" onBack={onBack}>
        <View style={styles.container}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Imię gracza..."
              placeholderTextColor={colors.textPlaceholder}
              value={newName}
              onChangeText={setNewName}
              onSubmitEditing={addPlayer}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.btnSmall} onPress={addPlayer}>
              <Ionicons name="add" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.playerList}
            data={players}
            renderItem={renderPlayer}
            keyExtractor={(item, index) => `${item}-${index}`}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Brak graczy. Dodaj pierwszego gracza!</Text>
              </View>
            }
          />

          <Text style={styles.playerCount}>Liczba graczy: {players.length}</Text>

          {players.length < MIN_PLAYERS && (
            <Text style={styles.warningText}>
              Potrzebujesz przynajmniej {MIN_PLAYERS} graczy, aby rozpocząć grę
            </Text>
          )}
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
  container: {
    flex: 1,
    width: '100%',
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
    width: '100%',
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
  playerList: {
    flexGrow: 1,
    marginBottom: 20,
    width: '100%',
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
  playerCount: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: 10,
  },
  warningText: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PlayersScreen;
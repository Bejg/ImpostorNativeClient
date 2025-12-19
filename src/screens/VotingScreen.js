import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import { colors, typography, layout } from '../styles/GlobalStyles';

const VotingScreen = ({ players, onVotePlayer }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderPlayerCard = ({ item }) => (
    <TouchableOpacity style={styles.voteCard} onPress={() => onVotePlayer(item.id)}>
      <Text style={styles.voteCardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      <FlatList
        data={players}
        renderItem={renderPlayerCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={
          <>
            <Text style={typography.h1}>Kogo eliminujecie?</Text>
            <Text style={styles.subtitle}>Kliknij na gracza, którego grupa postanowiła wyrzucić.</Text>
          </>
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: { ...layout.screen, justifyContent: 'center' },
  subtitle: { ...typography.p, textAlign: 'center', marginBottom: 20 },
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: 'space-between',
  },
  voteCard: {
    flex: 1,
    margin: 5,
    backgroundColor: colors.cardItem,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.inactive,
    minHeight: 80,
  },
  voteCardText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default VotingScreen;

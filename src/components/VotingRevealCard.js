import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { colors, typography } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');

const VotingRevealCard = ({ visible, player, onOkPress }) => {
  if (!visible || !player) return null;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onOkPress}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Ujawniono gracza</Text>
          <Text style={styles.playerName}>{player.name}</Text>
          
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Rola:</Text>
            <Text style={[
              styles.roleText, 
              player.role === 'Impostor' ? styles.impostorRole : styles.citizenRole
            ]}>
              {player.role === 'Impostor' ? 'Impostor' : 'Obywatel'}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.8,
    backgroundColor: colors.cardItem,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    ...typography.h2,
    marginBottom: 15,
    textAlign: 'center',
  },
  playerName: {
    ...typography.h1,
    fontSize: 24,
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  roleContainer: {
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  roleLabel: {
    ...typography.p,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  roleText: {
    fontSize: 20,
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  impostorRole: {
    backgroundColor: colors.dangerTransparent,
    color: colors.danger,
  },
  citizenRole: {
    backgroundColor: colors.successTransparent,
    color: colors.success,
  },
  okButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  okButtonText: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default VotingRevealCard;
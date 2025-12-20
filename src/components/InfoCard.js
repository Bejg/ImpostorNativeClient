import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { colors, typography } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');

const InfoCard = ({ visible, title, message, type = 'info', onOkPress }) => {
  if (!visible) return null;

  // Determine color scheme based on type
  const getColors = () => {
    switch(type) {
      case 'success':
        return { 
          bgColor: colors.successTransparent, 
          textColor: colors.success,
          borderColor: colors.success
        };
      case 'error':
        return { 
          bgColor: colors.dangerTransparent, 
          textColor: colors.danger,
          borderColor: colors.danger
        };
      case 'warning':
        return { 
          bgColor: colors.warningTransparent, 
          textColor: colors.warning,
          borderColor: colors.warning
        };
      default: // info
        return { 
          bgColor: colors.primary, 
          textColor: colors.text,
          borderColor: colors.primary
        };
    }
  };

  const cardColors = getColors();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onOkPress}
    >
      <View style={styles.overlay}>
        <View style={[
          styles.card,
          { 
            backgroundColor: cardColors.bgColor,
            borderColor: cardColors.borderColor,
            borderWidth: 2
          }
        ]}>
          <Text style={[
            styles.title,
            { color: cardColors.textColor }
          ]}>
            {title || (type === 'error' ? 'Błąd' : type === 'success' ? 'Sukces' : 'Informacja')}
          </Text>
          
          <Text style={styles.message}>{message}</Text>
          
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
  message: {
    ...typography.p,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: colors.text,
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

export default InfoCard;
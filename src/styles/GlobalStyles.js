export const colors = {
  background: ['#1a1a2e', '#16213e', '#0f3460'],
  primary: '#667eea',
  accent: '#764ba2',
  success: '#48bb78',
  warning: '#ed8936',
  danger: '#f56565',
  dangerLight: '#fc8181',
  dangerTransparent: 'rgba(252, 129, 129, 0.2)',
  text: '#ffffff',
  textSecondary: '#e2e8f0',
  textPlaceholder: '#a0aec0',
  inactive: '#4a5568',
  card: 'rgba(30, 30, 45, 0.95)',
  cardInput: 'rgba(51, 65, 85, 0.95)',
  cardItem: 'rgba(51, 65, 85, 0.8)',
  blackTransparent: 'rgba(0,0,0,0.3)',
  border: 'rgba(102, 126, 234, 0.4)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  fontFamily: 'Montserrat_400Regular',
  fontFamilyBold: 'Montserrat_700Bold',
  fontFamilySemiBold: 'Montserrat_600SemiBold',
  h1: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 28,
    color: colors.text,
    marginBottom: 12,
  },
  h2: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 22,
    color: colors.text,
    marginBottom: 12,
  },
  p: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  highlight: {
    fontFamily: 'Montserrat_700Bold',
    color: colors.primary,
  },
  button: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    color: colors.text,
  }
};

export const layout = {
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 15,
    width: '100%',
  },
};

export const components = {
  card: {
    backgroundColor: colors.cardItem,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.inactive,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  buttonDanger: {
    backgroundColor: colors.danger,
  }
};

export const zIndices = {
  notification: 1000,
  modal: 2000,
};

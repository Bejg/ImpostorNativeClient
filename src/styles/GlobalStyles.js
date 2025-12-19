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

export const typography = {
  fontFamily: 'sans-serif',
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  p: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  highlight: {
    color: colors.primary,
    fontWeight: '700',
  },
};

export const layout = {
  container: {
    flex: 1,
    padding: 20,
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
  }
};

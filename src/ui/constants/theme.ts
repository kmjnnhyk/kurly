import type { StyleProp, TextStyle } from 'react-native';

export const color = {
  background: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',

  accent: '#FF3B30',
  searchBarBg: '#F3F3F3',
  divider: '#EEEEEE',
  iconGray: '#888888',

  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const typo: Record<string, StyleProp<TextStyle>> = {
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
    color: color.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: color.text,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 22,
    color: color.text,
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 18,
    color: color.textSecondary,
  },
  small: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 16,
    color: color.textTertiary,
  },
};

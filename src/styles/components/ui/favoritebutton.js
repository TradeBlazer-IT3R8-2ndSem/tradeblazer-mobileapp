import { StyleSheet } from 'react-native';

export const favoriteButtonStyles = StyleSheet.create({
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 4,
    zIndex: 10,
  },
  favoriteIcon: {
    fontSize: 18,
  },
});
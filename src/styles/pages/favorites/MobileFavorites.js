import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
    lineHeight: 24,
  },
  gridContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});


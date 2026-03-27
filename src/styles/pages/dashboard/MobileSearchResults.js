import { StyleSheet } from 'react-native';

export const searchResultsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 8,
  },
  backIconContainer: {
    padding: 5,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 18,
    color: '#2B4A2F',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B4A2F',
  },
  subtitle: {
    color: 'gray',
    marginBottom: 16,
  },
  noResults: {
    alignItems: 'center',
    paddingTop: 50,
  },
  noResultsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  productGrid: {
    paddingHorizontal: 8,
  },
});

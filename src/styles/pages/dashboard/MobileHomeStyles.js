import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bannerImage: {
    width: width,
    height: 120,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  categoryRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  noProducts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 40,
  },
});
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  announcement: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 20,
  },
  announcementImage: {
    width: width - 40,
    height: 100,
    resizeMode: 'contain',
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
  productRow: {
    flexDirection: 'row',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noProducts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 40,
  },
});


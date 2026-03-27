import { StyleSheet } from 'react-native';

export const mobileProductCardStyles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 10,
    marginBottom: 10,
    elevation: 2,
  },
  imageContainer: {
    height: 100,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#335c38',
  },
  category: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  seller: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
});
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MobileProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} defaultSource={{ uri: 'https://via.placeholder.com/150' }} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.seller}>{product.seller}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    height: 220,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  imageContainer: {
    height: 130,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  info: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
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

export default MobileProductCard;


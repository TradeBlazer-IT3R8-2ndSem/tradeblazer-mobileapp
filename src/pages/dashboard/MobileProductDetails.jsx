import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const MobileProductDetails = ({ product, isVisible, onClose }) => {
  if (!product) return null;

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scroll}>
            <Image source={{ uri: product.image }} style={styles.detailImage} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.category}>Category: {product.category}</Text>
            <Text style={styles.seller}>Seller: {product.seller}</Text>
            {product.description && (
              <Text style={styles.description}>{product.description}</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    maxHeight: height * 0.8,
    maxWidth: width * 0.9,
    width: width * 0.9,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1,
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    color: '#999',
  },
  scroll: {
    padding: 20,
    paddingTop: 40,
  },
  detailImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  seller: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default MobileProductDetails;

export { MobileProductDetails };


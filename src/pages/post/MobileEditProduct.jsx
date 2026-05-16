import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '../../services/api';
import { getItem } from '../../utils/storage';

const MobileEditProduct = ({ visible, onClose, onSuccess, product }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pre-fill form when product changes
  useEffect(() => {
    if (product) {
      setTitle(product.name || '');
      setDescription(product.description || '');
      setPrice(String(product.price || ''));
      setImage(null);
    }
  }, [product]);

  // Fetch categories and pre-select current one
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}categories/`);
        const data = await res.json();
        setCategories(data);

        if (product?.category) {
          const match = data.find((c) => c.name === product.category);
          if (match) setCategory(match);
        }
      } catch (err) {
        console.log('Failed to fetch categories:', err);
      }
    };
    if (visible) fetchCategories();
  }, [visible, product]);

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission required', 'Please allow gallery access.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.7,
      });
      if (!result.canceled) setImage(result.assets[0]);
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleSubmit = async () => {
    if (!title || !price || !category || !description) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    setLoading(true);

    try {
      const token = await getItem('accessToken');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', String(price));
      formData.append('category', category.id);

      if (image) {
        const fileType = image.uri.split('.').pop();
        formData.append('image', {
          uri: image.uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const res = await fetch(`${API_URL}posts/${product.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const message =
          data.detail ||
          data.message ||
          Object.values(data).flat().join('\n') ||
          'Failed to update product.';
        Alert.alert('Error', message);
        return;
      }

      Alert.alert('Success', 'Product updated successfully!');
      if (onSuccess) onSuccess(data);
      onClose();
    } catch (err) {
      console.log('Edit error:', err);
      Alert.alert('Error', err.message || 'Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setImage(null);
    onClose();
  };

  const currentImageUri =
    image?.uri ||
    (typeof product?.image === 'string'
      ? product.image
      : product?.image?.uri ?? null);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Product Details</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            style={styles.saveBtn}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.saveBtnText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
        >
          {/* IMAGE PICKER */}
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {currentImageUri ? (
              <>
                <Image
                  source={{ uri: currentImageUri }}
                  style={styles.imagePreview}
                />
                <View style={styles.changeOverlay}>
                  <Text style={styles.changeOverlayText}>Change Photo</Text>
                </View>
              </>
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.cameraIcon}>📷</Text>
                <Text style={styles.imagePlaceholderText}>
                  Tap to add a photo
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* PRODUCT INFO */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Product Info</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
              placeholder="What are you selling?"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholderTextColor="#aaa"
            />

            <View style={styles.divider} />

            <Text style={styles.label}>Price</Text>
            <View style={styles.priceRow}>
              <Text style={styles.pesoSign}>₱</Text>
              <TextInput
                placeholder="0.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.priceInput}
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Describe your product..."
              value={description}
              onChangeText={setDescription}
              multiline
              style={styles.textArea}
              placeholderTextColor="#aaa"
            />
          </View>

          {/* CATEGORY */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.categoryChip,
                    category?.id === cat.id && styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category?.id === cat.id && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  cancelText: { fontSize: 16, color: '#888' },
  saveBtn: {
    backgroundColor: '#355E3B',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  body: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  imagePicker: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  imagePreview: { width: '100%', height: 220 },
  changeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 8,
    alignItems: 'center',
  },
  changeOverlayText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  imagePlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  cameraIcon: { fontSize: 36, marginBottom: 8 },
  imagePlaceholderText: { fontSize: 15, color: '#aaa' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  label: { fontSize: 13, color: '#888', marginBottom: 4 },
  input: { fontSize: 15, color: '#000', paddingVertical: 6 },
  textArea: {
    fontSize: 15,
    color: '#000',
    paddingVertical: 6,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'center' },
  pesoSign: {
    fontSize: 20,
    color: '#355E3B',
    fontWeight: 'bold',
    marginRight: 6,
  },
  priceInput: { fontSize: 22, fontWeight: 'bold', color: '#000', flex: 1 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 4,
    backgroundColor: '#f5f5f5',
  },
  categoryChipActive: { backgroundColor: '#355E3B', borderColor: '#355E3B' },
  categoryChipText: { fontSize: 13, color: '#555' },
  categoryChipTextActive: { color: '#fff', fontWeight: '700' },
});

export default MobileEditProduct;

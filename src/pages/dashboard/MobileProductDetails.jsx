import React from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const getImageUri = (image) => {
  if (!image) return null;
  if (typeof image === 'string') return image;
  if (typeof image === 'object') {
    return image.uri ?? image.url ?? image.src ?? null;
  }
  return null;
};

const MobileProductDetails = ({
  product,
  isVisible,
  onClose,
  onDelete,
  onEdit,
  isOwner,
  isDeleting,
}) => {
  if (!product) return null;

  const imageUri = getImageUri(product.image);

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDelete) onDelete(product.id);
          },
        },
      ]
    );
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>

          {/* DRAG HANDLE */}
          <View style={styles.handle} />

          {/* CLOSE BUTTON */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* IMAGE */}
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderIcon}>📦</Text>
                <Text style={styles.imagePlaceholderText}>No Image Available</Text>
              </View>
            )}

            {/* CONTENT */}
            <View style={styles.content}>

              {/* CATEGORY BADGE */}
              {product.category ? (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
              ) : null}

              {/* NAME */}
              <Text style={styles.name}>{product.name}</Text>

              {/* PRICE */}
              <Text style={styles.price}>₱{product.price}</Text>

              {/* DIVIDER */}
              <View style={styles.divider} />

              {/* SELLER */}
              <View style={styles.sellerRow}>
                <View style={styles.sellerAvatar}>
                  <Text style={styles.sellerAvatarText}>
                    {product.seller?.charAt(0)?.toUpperCase() || 'S'}
                  </Text>
                </View>
                <View>
                  <Text style={styles.sellerLabel}>Seller</Text>
                  <Text style={styles.sellerName}>{product.seller}</Text>
                </View>
              </View>

              {/* DIVIDER */}
              <View style={styles.divider} />

              {/* DESCRIPTION */}
              {product.description ? (
                <>
                  <Text style={styles.descLabel}>Description</Text>
                  <Text style={styles.description}>{product.description}</Text>
                </>
              ) : null}

            </View>
          </ScrollView>

          {/* BOTTOM ACTIONS */}
          <View style={styles.bottomBar}>
            {isOwner ? (
              // ✅ Owner sees Edit + Delete buttons
              <View style={styles.ownerActions}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => {
                    onClose();
                    if (onEdit) onEdit(product);
                  }}
                >
                  <Text style={styles.editBtnText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.deleteBtnText}>Delete</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              // Non-owner sees Contact Seller
              <TouchableOpacity style={styles.contactBtn}>
                <Text style={styles.contactBtnText}>💬  Contact Seller</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.9,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  image: {
    width: width,
    height: 260,
  },
  imagePlaceholder: {
    width: width,
    height: 260,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderIcon: {
    fontSize: 50,
    marginBottom: 8,
  },
  imagePlaceholderText: {
    color: '#aaa',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    color: '#355E3B',
    fontWeight: '700',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#355E3B',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 14,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#355E3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sellerLabel: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sellerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  descLabel: {
    fontSize: 11,
    color: '#aaa',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 23,
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },

  // ✅ Owner action buttons side by side
  ownerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#355E3B',
  },
  editBtnText: {
    color: '#355E3B',
    fontWeight: 'bold',
    fontSize: 15,
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#355E3B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  contactBtn: {
    backgroundColor: '#355E3B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MobileProductDetails;
export { MobileProductDetails };
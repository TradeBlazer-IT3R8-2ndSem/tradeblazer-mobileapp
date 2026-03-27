import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { mobileProductCardStyles as styles } from '../../styles/components/ui/MobileProductCard';
import { favoriteButtonStyles as fbStyles } from '../../styles/components/ui/favoritebutton';

const MobileProductCard = ({ product, onPress, style, isLiked, toggleFavorite, onFavoritePress }) => {
  const handleFavoritePress = () => {
    if (toggleFavorite) {
      toggleFavorite(product);
    }
    if (onFavoritePress) {
      onFavoritePress(product);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <View style={styles.imageContainer}>
        <Image source={product.image} style={styles.productImage} />

        {/* Favorite Button */}
        <TouchableOpacity onPress={handleFavoritePress} style={fbStyles.favoriteButton}>
          <Text style={fbStyles.favoriteIcon}>{isLiked ? '💚' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.price}>₱{product.price}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.seller}>{product.seller}</Text>
      </View>
    </TouchableOpacity>
  );
};

MobileProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  isLiked: PropTypes.bool,
  toggleFavorite: PropTypes.func,
  onFavoritePress: PropTypes.func, // Optional callback after toggle (e.g. navigate)
};

MobileProductCard.defaultProps = {
  isLiked: false,
};

export default MobileProductCard;


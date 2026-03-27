import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { favoritesStyles } from '../../styles/pages/favorites/MobileFavorites';
import { useFavorites } from '../../context/MobileFavoritesContext';
import MobileProductCard from '../../components/ui/MobileProductCard';

const { width } = Dimensions.get('window');

const MobileFavorites = () => {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const renderFavoriteProduct = ({ item }) => (
    <MobileProductCard
      product={item}
      isLiked={true} // Always liked in favorites
      toggleFavorite={toggleFavorite}
      style={{ marginRight: 10, marginBottom: 15, width: (width - 40) / 3 }} // 3 per row
    />
  );

  if (favorites.length === 0) {
    return (
      <View style={favoritesStyles.emptyContainer}>
        <Text style={[favoritesStyles.title, { marginBottom: 10 }]}>Favorites</Text>
        <Text style={favoritesStyles.emptyText}>No favorites yet. Tap hearts on products to add them here!</Text>
      </View>
    );
  }

  return (
    <View style={favoritesStyles.container}>
      <Text style={favoritesStyles.title}>Favorites ({favorites.length})</Text>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={favoritesStyles.gridContent}
      />
    </View>
  );
};

export default MobileFavorites;


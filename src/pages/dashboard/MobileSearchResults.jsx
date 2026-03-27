import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import MobileProductCard from '../../components/ui/MobileProductCard';
import { useFavorites } from '../../context/MobileFavoritesContext';
import { searchResultsStyles } from '../../styles/pages/dashboard/MobileSearchResults';
import MobileProductDetails from './MobileProductDetails';

const bestSelling = [
  { id: 1, name: "Ferrero Bouquet", price: "1,100", category: "Gifts", image: require('../../assets/images/ferrero.jpg'), seller: "TradeBlazer" },
  { id: 2, name: "Keychain", price: "600", category: "Gifts", image: require('../../assets/images/keychain.jpg'), seller: "TradeBlazer" },
  { id: 3, name: "Plush Teddy Bear", price: "600", category: "Gifts", image: require('../../assets/images/teddy.jpg'), seller: "TradeBlazer" },
  { id: 4, name: "Flower Bouquet", price: "500", category: "Gifts", image: require('../../assets/images/flowers.jpg'), seller: "TradeBlazer" },
  { id: 5, name: "Chocolate Box", price: "400", category: "Gifts", image: require('../../assets/images/choco.jpg'), seller: "TradeBlazer" },
  { id: 6, name: "Keychain", price: "600", category: "Gifts", image: require('../../assets/images/keychain.jpg'), seller: "TradeBlazer" },
];

const MobileSearchResults = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const query = route.params?.query || '';
  const filteredProducts = bestSelling.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const renderProduct = ({ item }) => (
    <MobileProductCard
      product={item}
      onPress={() => handleViewDetails(item)}
      isLiked={isFavorite(item.id)}
      toggleFavorite={toggleFavorite}
      style={{ width: 160, marginRight: 8, marginBottom: 12 }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={searchResultsStyles.container}>
        <View style={searchResultsStyles.header}>
          <TouchableOpacity 
            style={searchResultsStyles.backIconContainer}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" style={searchResultsStyles.backIcon} />
          </TouchableOpacity>
          <Text style={searchResultsStyles.title}>
            Search Results for "{query}"
          </Text>
        </View>

        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <Text style={searchResultsStyles.subtitle}>
            Found {filteredProducts.length} results
          </Text>
        </View>

        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={searchResultsStyles.productGrid}
            ListFooterComponent={showDetailModal ? <View /> : null}
          />
        ) : (
          <View style={[searchResultsStyles.noResults, { flex: 1 }]}>
            <Text style={searchResultsStyles.noResultsText}>
              No results found for "{query}"
            </Text>
            <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center' }}>
              Try different keywords
            </Text>
          </View>
        )}

        {showDetailModal && (
          <MobileProductDetails
            product={selectedProduct}
            isVisible={showDetailModal}
            onClose={() => setShowDetailModal(false)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MobileSearchResults;

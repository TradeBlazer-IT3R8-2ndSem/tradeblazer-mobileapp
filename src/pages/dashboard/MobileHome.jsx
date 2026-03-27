import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MobileCategoryBox from '../../components/ui/MobileCategoryBox';
import MobileProductCard from '../../components/ui/MobileProductCard';
import MobileProductDetails from './MobileProductDetails';
import { homeStyles } from '../../styles/pages/dashboard/MobileHomeStyles';
import SearchBar from '../../components/ui/SearchBar';
import { useFavorites } from '../../context/MobileFavoritesContext';



// Local images
import banner from '../../assets/images/banner.gif';
import ferrero from '../../assets/images/ferrero.jpg';
import keychain from '../../assets/images/keychain.jpg';
import teddy from '../../assets/images/teddy.jpg';
import flowers from '../../assets/images/flowers.jpg';
import choco from '../../assets/images/choco.jpg';

const { width } = Dimensions.get('window');

const MobileHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('MobileSearchResults', { query: searchQuery.trim() });
    }
  };

  const categories = [
    "Recommended",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
    "Beauty",
    "Gifts",
  ];

  const bestSelling = [
    { id: 1, name: "Ferrero Bouquet", price: "1,100", category: "Gifts", image: ferrero, seller: "TradeBlazer" },
    { id: 2, name: "Keychain", price: "600", category: "Gifts", image: keychain, seller: "TradeBlazer" },
    { id: 3, name: "Plush Teddy Bear", price: "600", category: "Gifts", image: teddy, seller: "TradeBlazer" },
    { id: 4, name: "Flower Bouquet", price: "500", category: "Gifts", image: flowers, seller: "TradeBlazer" },
    { id: 5, name: "Chocolate Box", price: "400", category: "Gifts", image: choco, seller: "TradeBlazer" },
    { id: 6, name: "Keychain", price: "600", category: "Gifts", image: keychain, seller: "TradeBlazer" },

  ];

  const allProducts = [...bestSelling]; // For now, same as best selling
  const filteredProducts = selectedCategory === "Recommended" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const renderCategoryRow = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={homeStyles.categoryRow}>
      {categories.map((cat) => (
        <MobileCategoryBox
          key={cat}
          name={cat}
          onClick={() => setSelectedCategory(cat)}
          isActive={selectedCategory === cat}
        />
      ))}
    </ScrollView>
  );

  const { toggleFavorite, isFavorite } = useFavorites();
  const handleFavoritePress = () => {}; // Placeholder, navigation handled by tab

  return (
    <View style={homeStyles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Banner */}
        <Image source={banner} style={homeStyles.bannerImage} resizeMode="cover" />

        {/* Search Bar */}
        <View style={homeStyles.searchContainer}>
          <SearchBar 
            placeholder="Search products..." 
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>

        {/* Top 5 Best Selling */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Top 5 Best Selling</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
            {bestSelling.map((item) => (
              <MobileProductCard
                key={item.id}
                product={item}
                onPress={() => handleViewDetails(item)}
                isLiked={isFavorite(item.id)}
                toggleFavorite={toggleFavorite}
                style={{ marginRight: 15 }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Categories</Text>
          {renderCategoryRow()}
        </View>

        {/* Products */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Products</Text>
          <ScrollView contentContainerStyle={homeStyles.productGrid}>
            {filteredProducts.map((item) => (
                <MobileProductCard
                key={item.id}
                product={item}
                onPress={() => handleViewDetails(item)}
                isLiked={isFavorite(item.id)}
                toggleFavorite={toggleFavorite}
                style={{ width: 160, marginRight: 8, marginBottom: 12 }}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <MobileProductDetails
        product={selectedProduct}
        isVisible={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </View>
  );
};

export default MobileHome;
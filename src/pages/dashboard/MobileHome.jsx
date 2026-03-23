import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import MobileCategoryBox from '../../components/ui/MobileCategoryBox';
import MobileProductCard from '../../components/ui/MobileProductCard';
import MobileProductDetails from './MobileProductDetails';
import { homeStyles } from '../../styles/pages/dashboard/MobileHomeStyles';

const { width } = Dimensions.get('window');

const MobileHome = () => {
  const [selectedCategory, setSelectedCategory] = useState("Recommended");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    { id: 1, name: "Ferrero Bouquet", price: "1,100", category: "Gifts", image: "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Ferrero", seller: "TradeBlazer" },
    { id: 2, name: "Keychain", price: "600", category: "Gifts", image: "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Keychain", seller: "TradeBlazer" },
    { id: 3, name: "Plush Teddy Bear", price: "600", category: "Gifts", image: "https://via.placeholder.com/300x200/F7DC6F/000000?text=Teddy", seller: "TradeBlazer" },
    { id: 4, name: "Flower Bouquet", price: "500", category: "Gifts", image: "https://via.placeholder.com/300x200/85C1E9/FFFFFF?text=Flowers", seller: "TradeBlazer" },
    { id: 5, name: "Chocolate Box", price: "400", category: "Gifts", image: "https://via.placeholder.com/300x200/A569BD/FFFFFF?text=Choco", seller: "TradeBlazer" },
  ];

  const hardcodedProducts = [
    { id: 6, name: "Hair Clamps", price: "25", category: "Fashion", image: "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Hair", seller: "TradeBlazer" },
    { id: 7, name: "Socks", price: "50", category: "Fashion", image: "https://via.placeholder.com/300x200/F9CA24/000000?text=Socks", seller: "TradeBlazer" },
    { id: 8, name: "Phone Case", price: "150", category: "Electronics", image: "https://via.placeholder.com/300x200/E74C3C/FFFFFF?text=Phone", seller: "TradeBlazer" },
    { id: 9, name: "Hand Bag", price: "30", category: "Gifts", image: "https://via.placeholder.com/300x200/2ECC71/FFFFFF?text=Bag", seller: "TradeBlazer" },
    { id: 10, name: "Wallet", price: "200", category: "Fashion", image: "https://via.placeholder.com/300x200/3498DB/FFFFFF?text=Wallet", seller: "TradeBlazer" },
    { id: 11, name: "Backpack", price: "500", category: "Fashion", image: "https://via.placeholder.com/300x200/9B59B6/FFFFFF?text=Backpack", seller: "TradeBlazer" },
    { id: 12, name: "Sunglasses", price: "300", category: "Fashion", image: "https://via.placeholder.com/300x200/E67E22/FFFFFF?text=Sunglasses", seller: "TradeBlazer" },
  ];

  const allProducts = [...hardcodedProducts];

  const filteredProducts = selectedCategory === "Recommended" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const renderProductRow = () => (
    <FlatList
      data={bestSelling}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MobileProductCard product={item} onPress={() => handleViewDetails(item)} />
      )}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
    />
  );

  const renderProductGrid = () => (
    <FlatList
      data={filteredProducts}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MobileProductCard 
          product={item} 
          onPress={() => handleViewDetails(item)} 
          style={{ marginRight: filteredProducts.length % 2 === 0 ? 0 : 4 }} 
        />
      )}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      ListEmptyComponent={<Text style={homeStyles.noProducts}>No products available in this category.</Text>}
    />
  );

  const renderCategoryRow = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={homeStyles.categoryRow}
    >
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

  return (
    <View style={homeStyles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Announcement */}
        <View style={homeStyles.announcement}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/350x100/34495E/ECF0F1?text=BANNER' }} 
            style={homeStyles.announcementImage}
            resizeMode="contain"
          />
        </View>

        {/* Best Selling */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Top 5 Best Selling</Text>
          {renderProductRow()}
        </View>

        {/* Categories */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Categories</Text>
          {renderCategoryRow()}
        </View>

        {/* Products */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Products</Text>
          {renderProductGrid()}
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


import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MobileCategoryBox from '../../components/ui/MobileCategoryBox';
import MobileProductCard from '../../components/ui/MobileProductCard';
import MobileProductDetails from './MobileProductDetails';
import { homeStyles } from '../../styles/pages/dashboard/MobileHomeStyles';
import SearchBar from '../../components/ui/SearchBar';
import { useFavorites } from '../../context/MobileFavoritesContext';
import { API_URL } from '../../services/api';
import { getItem } from '../../utils/storage';

// Local images
import banner from '../../assets/images/banner.gif';

const MobileHome = () => {
  const [selectedCategory, setSelectedCategory] = useState('Recommended');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [categories, setCategories] = useState(['Recommended']);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('MobileSearchResults', { query: searchQuery.trim() });
    }
  };

  // Normalize API post to match MobileProductCard shape
  const normalize = (item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    category: item.category_name || item.category?.name || item.category,
    image: item.image ? { uri: item.image } : null,
    seller: item.seller?.username || item.seller_name || item.seller,
    description: item.description,
    created_at: item.created_at, // ✅ keep for sorting
  });

  // Sort latest first
  const sortLatest = (arr) =>
    [...arr].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Fetch all data
  const fetchData = useCallback(async () => {
    try {
      const token = await getItem('accessToken');
      const headers = { Authorization: `Bearer ${token}` };

      const [postsRes, categoriesRes, bestSellingRes] = await Promise.all([
        fetch(`${API_URL}posts/`, { headers }),
        fetch(`${API_URL}categories/`),
        fetch(`${API_URL}posts/best-selling/`, { headers }),
      ]);

      const postsData = await postsRes.json();
      const categoriesData = await categoriesRes.json();
      const bestSellingData = await bestSellingRes.json();

      // ✅ Sort latest first
      setPosts(
        Array.isArray(postsData)
          ? sortLatest(postsData.map(normalize))
          : []
      );
      setBestSelling(
        Array.isArray(bestSellingData)
          ? bestSellingData.map(normalize)
          : []
      );

      // Build category list from API
      const categoryNames = [
        'Recommended',
        ...categoriesData.map((c) => c.name),
      ];
      setCategories(categoryNames);
    } catch (err) {
      console.log('Failed to fetch home data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Filter by selected category
  const filteredProducts =
    selectedCategory === 'Recommended'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

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

  if (loading) {
    return (
      <View
        style={[
          homeStyles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#355E3B" />
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#355E3B']}
          />
        }
      >
        {/* Banner */}
        <Image
          source={banner}
          style={homeStyles.bannerImage}
          resizeMode="cover"
        />

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
          {bestSelling.length === 0 ? (
            <Text style={{ color: '#aaa', paddingHorizontal: 16 }}>
              No listings yet.
            </Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
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
          )}
        </View>

        {/* Categories */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Categories</Text>
          {renderCategoryRow()}
        </View>

        {/* Products */}
        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Products</Text>
          {filteredProducts.length === 0 ? (
            <Text style={{ color: '#aaa', paddingHorizontal: 16 }}>
              No products in this category yet.
            </Text>
          ) : (
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
          )}
        </View>
      </ScrollView>

      <MobileProductDetails
        product={selectedProduct}
        isVisible={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        isOwner={false}
      />
    </View>
  );
};

export default MobileHome;
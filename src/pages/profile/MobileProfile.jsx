import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import MobileAddPost from '../post/MobileAddPost';
import MobileProductDetails from '../dashboard/MobileProductDetails';
import MobileProductCard from '../../components/ui/MobileProductCard';
import { profileStyles } from '../../styles/pages/profile/MobileProfile';
import { getItem } from '../../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../../context/MobileFavoritesContext';
import { API_URL } from '../../services/api';

const MobileProfile = () => {
  const [profile, setProfile] = useState(null);
  const [showAddPost, setShowAddPost] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigation = useNavigation();
  const { toggleFavorite, isFavorite } = useFavorites();

  // Normalize post to match MobileProductCard shape (same as dashboard)
  const normalize = (item) => ({
    id: item.id,
    name: item.title,
    price: item.price,
    category: item.category_name || item.category?.name || item.category,
    image: item.image ? { uri: typeof item.image === 'string' ? item.image : item.image?.url ?? item.image?.uri } : null,
    seller: item.seller?.username || item.seller_name || item.seller,
    description: item.description,
    created_at: item.created_at,
  });

  // Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      const userData = await getItem('userData');
      if (userData) {
        setProfile({
          name: userData.username || 'User',
          studentId: userData.student_id || 'N/A',
          department: userData.department || 'N/A',
          email: userData.email || 'N/A',
          number: userData.phone_number || 'N/A',
          address: userData.address || 'N/A',
          profilePicture: userData.profile_image || '',
        });
      }
    };
    loadUser();
  }, []);

  // Fetch user's own posts
  const fetchMyPosts = useCallback(async () => {
    setLoadingPosts(true);
    try {
      const token = await getItem('accessToken');
      const res = await fetch(`${API_URL}posts/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const userData = await getItem('userData');

      const myOwn = data
        .filter((post) => {
          if (userData?.id && post.seller_id) {
            return post.seller_id === userData.id;
          }
          return (
            post.seller === userData?.username ||
            post.seller_name === userData?.username ||
            post.seller?.username === userData?.username
          );
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map(normalize);

      setMyPosts(myOwn);
    } catch (err) {
      console.log('Failed to fetch posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handlePostSuccess = () => {
    fetchMyPosts();
    setShowAddPost(false);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  if (!profile) {
    return (
      <View style={profileStyles.container}>
        <ActivityIndicator color="#355E3B" />
      </View>
    );
  }

  return (
    <ScrollView style={profileStyles.container}>
      {/* PROFILE SECTION */}
      <View style={profileStyles.profileLeft}>
        <View style={profileStyles.profileHeader}>
          <TouchableOpacity
            style={profileStyles.editBtn}
            onPress={() => navigation.navigate('MobileEditProfile')}
          >
            <Text style={profileStyles.editText}>Edit</Text>
          </TouchableOpacity>

          <View style={profileStyles.profilePicture}>
            {profile.profilePicture ? (
              <Image
                source={{ uri: profile.profilePicture }}
                style={profileStyles.image}
              />
            ) : (
              <Text>No Image</Text>
            )}
          </View>

          <Text style={profileStyles.name}>{profile.name}</Text>
        </View>

        <View style={profileStyles.infoBox}>
          <Text>ID: {profile.studentId}</Text>
          <Text>Department: {profile.department}</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Number: {profile.number}</Text>
          <Text>Address: {profile.address}</Text>
        </View>

        <TouchableOpacity
          style={postStyles.addBtn}
          onPress={() => setShowAddPost(true)}
        >
          <Text style={postStyles.addBtnText}>+ Add Post</Text>
        </TouchableOpacity>
      </View>

      {/* MY LISTINGS SECTION */}
      <View style={postStyles.listingsSection}>
        <Text style={postStyles.sectionTitle}>My Listings</Text>

        {loadingPosts ? (
          <ActivityIndicator color="#355E3B" style={{ marginTop: 20 }} />
        ) : myPosts.length === 0 ? (
          <Text style={postStyles.emptyText}>
            No listings yet. Tap "+ Add Post" to sell something!
          </Text>
        ) : (
          <View style={postStyles.grid}>
            {myPosts.map((post) => (
              <MobileProductCard
                key={post.id}
                product={post}
                onPress={() => handleViewDetails(post)}
                isLiked={isFavorite(post.id)}
                toggleFavorite={toggleFavorite}
                style={postStyles.card}
              />
            ))}
          </View>
        )}
      </View>

      {/* ADD POST MODAL */}
      <MobileAddPost
        visible={showAddPost}
        onClose={() => setShowAddPost(false)}
        onSuccess={handlePostSuccess}
      />

      {/* PRODUCT DETAILS MODAL */}
      <MobileProductDetails
        product={selectedProduct}
        isVisible={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </ScrollView>
  );
};

const postStyles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#355E3B',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  listingsSection: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 12,
  },
});

export default MobileProfile;
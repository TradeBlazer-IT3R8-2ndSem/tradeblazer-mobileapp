import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/MobileAuthContext';

import { appRoutesStyles } from '../styles/components/layout/AppRoutesStyles';

// Screens
import MobileLogin from '../pages/auth/MobileLogin';
import MobileRegister from '../pages/auth/MobileRegister';
import MobileHome from '../pages/dashboard/MobileHome';
import MobileProfile from '../pages/profile/MobileProfile';
import MobileSearch from '../pages/search/MobileSearch';
import MobileChat from '../pages/chat/MobileChat';
import MobileFavorites from '../pages/favorites/MobileFavorites';
import MobileNotifications from '../pages/notifications/MobileNotifications';
import MobileAddPost from '../pages/post/MobileAddPost';
import MobileCategory from '../pages/dashboard/MobileCategory';
import MobileSupport from '../pages/support/MobileSupport';
import MobileProductDetails from '../pages/dashboard/MobileProductDetails';
import MobileSearchResults from '../pages/dashboard/MobileSearchResults';
import MobileEditProductCard from '../pages/dashboard/MobileEditProductCard';
import MobileEditProfile from '../pages/profile/MobileEditProfile';
import MobileChatPanel from '../pages/chat/MobileChatPanel';

// Layout
import MobileHeader from '../components/layout/MobileHeader';
import MobileFooter from '../components/layout/MobileFooter';

const Stack = createNativeStackNavigator();

const SplashScreen = () => <></>;

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={MobileLogin} />
    <Stack.Screen name="Register" component={MobileRegister} />
  </Stack.Navigator>
);

const MainStack = () => (
  <View style={appRoutesStyles.container}>
    <MobileHeader />

    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={MobileHome} />
      <Stack.Screen name="Profile" component={MobileProfile} />
      <Stack.Screen name="Search" component={MobileSearch} />
      <Stack.Screen name="Chat" component={MobileChat} />
      <Stack.Screen name="Favorites" component={MobileFavorites} />
      <Stack.Screen name="Notifications" component={MobileNotifications} />
      <Stack.Screen name="AddPost" component={MobileAddPost} />
      <Stack.Screen name="Category" component={MobileCategory} />
      <Stack.Screen name="Support" component={MobileSupport} />
      <Stack.Screen name="ProductDetails" component={MobileProductDetails} />
      <Stack.Screen name="SearchResults" component={MobileSearchResults} />
      <Stack.Screen name="EditProduct" component={MobileEditProductCard} />
      <Stack.Screen name="EditProfile" component={MobileEditProfile} />
      <Stack.Screen name="ChatPanel" component={MobileChatPanel} />
    </Stack.Navigator>

    <MobileFooter />
  </View>
);

const AppRoutes = () => {
  const { loading, isLoggedIn } = useAuth();

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppRoutes;

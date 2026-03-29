import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/MobileAuthContext';
import { FavoritesProvider } from '../context/MobileFavoritesContext';


// Screens
import MobileLogin from '../pages/auth/MobileLogin';
import MobileRegister from '../pages/auth/MobileRegister';
import MobileHome from '../pages/dashboard/MobileHome';
import MobileProfile from '../pages/profile/MobileProfile';
import MobileChat from '../pages/chat/MobileChat';
import MobileNotifications from '../pages/notifications/MobileNotifications';
<<<<<<< HEAD
import MobileFavorites from '../pages/favorites/MobileFavorites';
import MobileSearchResults from '../pages/dashboard/MobileSearchResults';
=======
import MobileEditProfile from '../pages/profile/MobileEditProfile';
>>>>>>> profilepages

 // Layout
import MobileHeader from '../components/layout/MobileHeader';
import MobileFooter from '../components/layout/MobileFooter';

const Stack = createNativeStackNavigator();

// Empty splash screen while checking auth
const SplashScreen = () => <View style={{ flex: 1, backgroundColor: '#fff' }} />;

// Auth stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={MobileLogin} />
    <Stack.Screen name="Register" component={MobileRegister} />
  </Stack.Navigator>
);

// Main app stack with custom tabs
const HomeStack = ({ currentTab, setCurrentTab }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MobileHome" component={MobileHome} />
      <Stack.Screen name="MobileSearchResults" component={MobileSearchResults} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const [currentTab, setCurrentTab] = useState('home');

<<<<<<< HEAD
  const renderTabScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeStack currentTab={currentTab} setCurrentTab={setCurrentTab} />;
      case 'profile':
        return <MobileProfile />;
      case 'chat':
        return <MobileChat />;
      case 'notifications':
        return <MobileNotifications />;
      case 'favorites':
        return <MobileFavorites />;
      default:
        return <HomeStack currentTab={currentTab} setCurrentTab={setCurrentTab} />;
    }
  };

=======
>>>>>>> profilepages
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* MAIN SCREEN */}
      <Stack.Screen name="Main">
        {({ navigation }) => {
          const renderTabScreen = () => {
            switch (currentTab) {
              case 'home':
                return <MobileHome />;
              case 'profile':
                return <MobileProfile navigation={navigation} />; // ✅ pass navigation
              case 'chat':
                return <MobileChat />;
              case 'notifications':
                return <MobileNotifications />;
              default:
                return <MobileHome />;
            }
          };

          return (
            <View style={styles.container}>
              <MobileHeader />
              <View style={styles.screenContainer}>
                {renderTabScreen()}
              </View>
              <MobileFooter currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </View>
          );
        }}
      </Stack.Screen>

      {/* EDIT PROFILE SCREEN */}
      <Stack.Screen
        name="MobileEditProfile"
        component={MobileEditProfile}
      />

    </Stack.Navigator>
  );
};


const AppRoutes = () => {
  const { loading, isLoggedIn } = useAuth();

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <FavoritesProvider>
        {isLoggedIn ? <MainStack /> : <AuthStack />}
      </FavoritesProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});

export default AppRoutes;
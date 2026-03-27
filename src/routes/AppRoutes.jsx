import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/MobileAuthContext';

import { appRoutesStyles } from '../styles/components/layout/AppRoutesStyles';

// Auth Screens
import MobileLogin from '../pages/auth/MobileLogin';
import MobileRegister from '../pages/auth/MobileRegister';

// Main Screens
import MobileHome from '../pages/dashboard/MobileHome';
import MobileProfile from '../pages/profile/MobileProfile';
import MobileChat from '../pages/chat/MobileChat';
import MobileNotifications from '../pages/notifications/MobileNotifications';

// Layout
import MobileHeader from '../components/layout/MobileHeader';
import MobileFooter from '../components/layout/MobileFooter';

const Stack = createNativeStackNavigator();
const SplashScreen = () => <></>;

// AUTH STACK
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={MobileLogin} />
    <Stack.Screen name="Register" component={MobileRegister} />
  </Stack.Navigator>
);

const MainStack = () => {
  const [currentTab, setCurrentTab] = useState('home');

  // map tabs to screens
  const tabScreens = {
    home: MobileHome,
    profile: MobileProfile,
    chat: MobileChat,
    notifications: MobileNotifications,
  };

  return (
    <View style={appRoutesStyles.container}>
      <MobileHeader />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* dynamically render only the current tab screen */}
        <Stack.Screen
          name={currentTab}
          component={tabScreens[currentTab]}
        />
      </Stack.Navigator>

      {/* Here is the updated MobileFooter usage */}
      <MobileFooter
        currentTab={currentTab}
        setCurrentTab={setCurrentTab} // <- pass the setter here
      />
    </View>
  );
};

// APP ROUTES
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
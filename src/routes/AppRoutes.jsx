import React, { useState } from 'react';
import { View } from 'react-native';
import { appRoutesStyles } from '../styles/components/layout/AppRoutesStyles';
import MobileHome from '../pages/dashboard/MobileHome';
import MobileNotifications from '../pages/notifications/MobileNotifications';
import MobileFavorites from '../pages/favorites/MobileFavorites';
import MobileChat from '../pages/chat/MobileChat';
import MobileProfile from '../pages/profile/MobileProfile';
import MobileHeader from '../components/layout/MobileHeader';
import MobileFooter from '../components/layout/MobileFooter';

const AppRoutes = () => {
  const [currentTab, setCurrentTab] = useState('home');

  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return <MobileHome />;
      case 'notifications':
        return <MobileNotifications />;
      case 'favorites':
        return <MobileFavorites />;
      case 'chat':
        return <MobileChat />;
      case 'profile':
        return <MobileProfile />;
      default:
        return <MobileHome />;
    }
  };

  return (
    <View style={appRoutesStyles.container}>
      <MobileHeader />
      {renderPage()}
      <MobileFooter currentTab={currentTab} onTabChange={setCurrentTab} />
    </View>
  );

};

export default AppRoutes;


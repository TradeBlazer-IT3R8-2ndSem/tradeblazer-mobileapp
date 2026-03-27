import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { footerStyles } from '../../styles/components/layout/MobileFooterStyles';

const MobileFooter = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'notifications', label: 'Notif', icon: '🔔' },
    { id: 'favorites', label: 'Fav', icon: '❤️' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <SafeAreaView style={footerStyles.footer}>
      <View style={footerStyles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              footerStyles.tabButton,
              currentTab === tab.id && footerStyles.activeTabButton
            ]}
            onPress={() => onTabChange(tab.id)}
          >
            <Text style={[
              footerStyles.tabIcon,
              currentTab === tab.id && footerStyles.activeTabIcon
            ]}>
              {tab.icon}
            </Text>
            <Text style={[
              footerStyles.tabLabel,
              currentTab === tab.id && footerStyles.activeTabLabel
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MobileFooter;


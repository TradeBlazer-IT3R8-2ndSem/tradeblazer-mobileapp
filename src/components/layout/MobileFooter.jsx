import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { footerStyles } from '../../styles/components/layout/MobileFooterStyles';

const MobileFooter = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation();

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠', route: 'home' },
    { id: 'notifications', label: 'Notif', icon: '🔔', route: 'notifications' },
    { id: 'chat', label: 'Chat', icon: '💬', route: 'chat' },
    { id: 'profile', label: 'Profile', icon: '👤', route: 'profile' },
  ];

  return (
    <View style={footerStyles.footer}>
      <View style={footerStyles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              footerStyles.tabButton,
              currentTab === tab.id && footerStyles.activeTabButton
            ]}
            onPress={() => setCurrentTab(tab.route)}
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
    </View>
  );
};

export default MobileFooter;
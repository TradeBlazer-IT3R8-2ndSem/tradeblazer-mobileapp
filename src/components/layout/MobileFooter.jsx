import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { footerStyles } from '../../styles/components/layout/MobileFooterStyles';

const MobileFooter = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'notifications', label: 'Notif', icon: '🔔' },
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={footerStyles.footer}>
      <View style={footerStyles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              footerStyles.tabButton,
              currentTab === tab.id && footerStyles.activeTabButton, // ✅ now compares correctly
            ]}
            onPress={() => setCurrentTab(tab.id)} // ✅ set currentTab to tab.id
          >
            <Text
              style={[
                footerStyles.tabIcon,
                currentTab === tab.id && footerStyles.activeTabIcon,
              ]}
            >
              {tab.icon}
            </Text>
            <Text
              style={[
                footerStyles.tabLabel,
                currentTab === tab.id && footerStyles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MobileFooter;
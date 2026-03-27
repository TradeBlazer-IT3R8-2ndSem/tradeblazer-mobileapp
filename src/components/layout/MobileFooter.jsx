import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { footerStyles } from '../../styles/components/layout/MobileFooterStyles';

const MobileFooter = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'notifications', label: 'Notification', icon: 'bell' },
    { id: 'favorites', label: 'Favorites', icon: 'heart' },
    { id: 'chat', label: 'Chat', icon: 'comments' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];

  return (
    <View style={footerStyles.footer}>
      <View style={footerStyles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              footerStyles.tabButton,
              currentTab === tab.id && footerStyles.activeTabButton, 
            ]}
            onPress={() => setCurrentTab(tab.id)} 
          >
            <Icon
              name={tab.icon}
              size={24}
              style={[
                footerStyles.tabIcon,
                currentTab === tab.id && footerStyles.activeTabIcon,
              ]}
            />
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
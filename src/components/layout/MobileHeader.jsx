import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/MobileAuthContext';
import { headerStyles } from '../../styles/components/layout/MobileHeaderStyles';

const MobileHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const { logoutUser } = useAuth(); // ✅ get logoutUser from context

  const menuItems = [
    { label: 'Account Setting', onPress: () => navigation.navigate('Profile') },
    { label: 'Help', onPress: () => console.log('Help') },
    { label: 'Logout', onPress: () => logoutUser() }, // ✅ functional logout
  ];

  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.title}>TradeBlazer</Text>

      <TouchableOpacity onPress={() => setDropdownVisible(true)} style={headerStyles.hamburger}>
        <Text style={{ fontSize: 24, color: '#000' }}>☰</Text>
      </TouchableOpacity>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={headerStyles.modal}>
            <View style={headerStyles.dropdown}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={headerStyles.dropdownItem}
                  onPress={() => {
                    item.onPress();
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={headerStyles.dropdownText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MobileHeader;
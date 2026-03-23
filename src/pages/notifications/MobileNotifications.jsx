import React from 'react';
import { View, Text } from 'react-native';
import { pageStyles } from '../../styles/pages/shared/PageStyles';

const MobileNotifications = () => {
  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.title}>Notifications</Text>
      <Text>Your notifications content goes here.</Text>
    </View>
  );
};

export default MobileNotifications;


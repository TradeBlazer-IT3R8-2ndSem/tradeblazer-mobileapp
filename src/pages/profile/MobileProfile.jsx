import React from 'react';
import { View, Text } from 'react-native';
import { pageStyles } from '../../styles/pages/shared/PageStyles';

const MobileProfile = () => {
  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.title}>Profile</Text>
      <Text>Your profile content goes here.</Text>
    </View>
  );
};

export default MobileProfile;


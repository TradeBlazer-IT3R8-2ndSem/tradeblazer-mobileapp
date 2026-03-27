import React from 'react';
import { View, Text } from 'react-native';
import { pageStyles } from '../../styles/pages/shared/PageStyles';

const MobileFavorites = () => {
  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.title}>Favorites</Text>
      <Text>Your favorites content goes here.</Text>
    </View>
  );
};

export default MobileFavorites;


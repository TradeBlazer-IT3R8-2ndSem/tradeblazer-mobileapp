import React from 'react';
import { View, Text } from 'react-native';
import { pageStyles } from '../../styles/pages/shared/PageStyles';

const MobileChat = () => {
  return (
    <View style={pageStyles.container}>
      <Text style={pageStyles.title}>Chat</Text>
      <Text>Your chat content goes here.</Text>
    </View>
  );
};

export default MobileChat;


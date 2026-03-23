import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { categoryBoxStyles } from '../../styles/components/ui/MobileCategoryBoxStyles';

const MobileCategoryBox = ({ name, onClick, isActive }) => {
  return (
    <TouchableOpacity onPress={onClick} style={[
      categoryBoxStyles.container,
      isActive && categoryBoxStyles.active
    ]}>
      <Text style={[categoryBoxStyles.text, isActive && categoryBoxStyles.activeText]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default MobileCategoryBox;


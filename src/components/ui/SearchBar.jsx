import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { mobileSearchStyles as styles } from '../../styles/pages/search/MobileSearch';

const SearchBar = ({ placeholder, value = '', onChangeText, onSubmitEditing }) => {
  return (
    <View style={styles.container}>
      <Icon 
        name="search" 
        size={16} 
        color="#2B4A2F" 
        style={styles.icon}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

export default SearchBar;
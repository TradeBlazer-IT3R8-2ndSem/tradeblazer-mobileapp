import { StyleSheet } from 'react-native';

export const mobileSearchStyles = StyleSheet.create({
  container: {
  position: 'relative',
  justifyContent: 'center',
},

icon: {
  position: 'absolute',
  left: 15,
  zIndex: 10, 
},

input: {
  backgroundColor: '#fff',
  padding: 10,
  paddingLeft: 38, 
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#ccc',
},
});
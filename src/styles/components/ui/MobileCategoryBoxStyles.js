import { StyleSheet } from 'react-native';

export const categoryBoxStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  active: {
    backgroundColor: '#335c38',
    borderColor: '#2B4A2F',
  },
  text: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
});


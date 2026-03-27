import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  header: {
    height: 90,
    backgroundColor: '#2B4A2F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  hamburger: {
    padding: 5,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown: {
    position: 'absolute',
    top: 110,
    right: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
});


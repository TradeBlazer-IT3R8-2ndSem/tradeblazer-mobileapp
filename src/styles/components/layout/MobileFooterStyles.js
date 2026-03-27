import { StyleSheet } from 'react-native';

export const footerStyles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    backgroundColor: '#f0f8ff',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    color: '#2b4d30',
  },
  activeTabIcon: {
    color: '#0e6c21',
  },
  tabLabel: {
    fontSize: 10,
    color: '#666',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});


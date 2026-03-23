import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  authPage: {
    flex: 1,
    backgroundColor: '#ECFAE5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  authCard: {
    width: '90%',
    maxWidth: 380,
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 25,
    color: '#333',
    textAlign: 'center',
  },

  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 14,
  },

  inputFocused: {
    borderColor: '#355E3B',
    shadowColor: '#355E3B',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },

  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
  },

  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#355E3B',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },

  authLink: {
    marginTop: 15,
    color: '#355E3B',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  authMessage: {
    marginTop: 15,
    fontSize: 14,
    color: '#e63946',
    textAlign: 'center',
  },
});

export default styles;

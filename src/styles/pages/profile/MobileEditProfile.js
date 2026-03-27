import { StyleSheet } from 'react-native';

export const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 60, // only for Edit Profile, below status bar
  },

  /* LEFT */
  profileLeft: {
    marginBottom: 20,
  },

  profileHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },

  editBtn: {
    backgroundColor: '#355e3b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'flex-end', // push it to the right
    marginBottom: 20,      // add space below
    shadowColor: '#355e3b',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    gap: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fdfdfd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },

  /* RIGHT */
  profileRight: {
    gap: 15,
  },

  addContainer: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'flex-end',
  },

  addBtn: {
    backgroundColor: '#355e3b',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  addText: {
    color: '#fff',
  },

  postsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    minHeight: 200,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  saveBtn: {
    backgroundColor: '#355e3b',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15, // space below last input
    shadowColor: '#355e3b',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

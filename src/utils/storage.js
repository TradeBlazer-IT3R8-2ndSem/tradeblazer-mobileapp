import AsyncStorage from '@react-native-async-storage/async-storage';

// Save an item to AsyncStorage
export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error setting ${key}:`, e);
  }
};

// Get an item from AsyncStorage
export const getItem = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Error getting ${key}:`, e);
    return null;
  }
};

// Check if a user is logged in
export const isUserLoggedIn = async () => {
  try {
    const user = await getItem('userData');
    return user != null;
  } catch (e) {
    console.error('Error checking login:', e);
    return false;
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const users = (await getItem('users')) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      await setItem('userData', user); // Save logged-in user
      return user;
    }
    return null;
  } catch (e) {
    console.error('Login error:', e);
    return null;
  }
};

// Register user
export const registerUser = async (newUser) => {
  try {
    const users = (await getItem('users')) || [];

    // Check if email already exists
    const emailExists = users.some((u) => u.email === newUser.email);
    if (emailExists) throw new Error('Email already registered');

    // Ensure all fields exist
    const fullUser = {
      id: newUser.id || Date.now(),
      username: newUser.username || newUser.name || '',
      email: newUser.email || '',
      password: newUser.password || '',
      student_id: newUser.student_id || newUser.studentId || '',
      department: newUser.department || '',
      phone_number: newUser.phone_number || newUser.number || '',
      address: newUser.address || '',
      profile_image: newUser.profile_image || '',
    };

    users.push(fullUser);

    await setItem('users', users);      // Save all users
    await setItem('userData', fullUser); // Save current logged-in user

    return fullUser;
  } catch (e) {
    console.error('Register error:', e);
    throw e;
  }
};

// Logout user
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (e) {
    console.error('Logout error:', e);
  }
};

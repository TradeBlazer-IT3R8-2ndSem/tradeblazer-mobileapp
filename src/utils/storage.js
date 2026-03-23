import AsyncStorage from '@react-native-async-storage/async-storage';

// Save an item
export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error setting ${key}:`, e);
  }
};

// Get an item
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
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      await setItem('userData', user);
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
    const emailExists = users.some((u) => u.email === newUser.email);
    if (emailExists) throw new Error('Email already registered');
    users.push(newUser);
    await setItem('users', users);
    await setItem('userData', newUser);
    return newUser;
  } catch (e) {
    console.error('Register error:', e);
    throw e;
  }
};

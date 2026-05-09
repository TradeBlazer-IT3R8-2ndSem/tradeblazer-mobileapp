import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, removeItem, setItem } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const checkLogin = async () => {
      const storedUser = await getItem('userData');
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };
    checkLogin();
  }, []);

  // Login function
  const loginUser = async (userData) => {
    setUser(userData);
    await setItem('userData', userData);
  };

  // Logout function
  const logoutUser = async () => {
    setUser(null);
    await removeItem('userData');
    await removeItem('accessToken');
    await removeItem('refreshToken');
    // No navigation here — AppRoutes will handle redirect automatically
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        loading,
        isLoggedIn: !!user && !loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const storedUser = await getItem('userData');
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };
    checkLogin();
  }, []);

  const loginUser = async (userData) => {
    setUser(userData);
    await setItem('userData', userData);
  };

  const logoutUser = async () => {
    setUser(null);
    await setItem('userData', null);
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

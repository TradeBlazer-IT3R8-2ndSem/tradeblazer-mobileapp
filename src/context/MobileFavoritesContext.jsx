import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistence

// No static images in context to avoid require path issues - use IDs only, resolve in components if needed
const initialProducts = [];


// Reducer for favorites
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const isFavorited = state.favorites.some(fav => fav.id === action.product.id);
      if (isFavorited) {
        return {
          ...state,
          favorites: state.favorites.filter(fav => fav.id !== action.product.id)
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.product]
        };
      }
    default:
      return state;
  }
};

// Context
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [], products: initialProducts });

  // Persistence
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem('favorites');
        if (saved) {
          dispatch({ type: 'LOAD_FAVORITES', favorites: JSON.parse(saved) });
        }
      } catch (e) {
        console.error('Failed to load favorites');
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      } catch (e) {
        console.error('Failed to save favorites');
      }
    };
    saveFavorites();
  }, [state.favorites]);

  const toggleFavorite = (product) => {
    dispatch({ type: 'TOGGLE_FAVORITE', product });
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites: state.favorites, 
      products: state.products,
      toggleFavorite,
      isFavorite: (id) => state.favorites.some(fav => fav.id === id)
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};


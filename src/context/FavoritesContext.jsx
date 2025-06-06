import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial render
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites(prevFavorites => {
      // Check if movie already exists in favorites
      if (prevFavorites.some(fav => fav.imdbID === movie.imdbID)) {
        return prevFavorites; // Don't add if already exists
      }
      return [...prevFavorites, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(movie => movie.imdbID !== movieId)
    );
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.imdbID === movieId);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 
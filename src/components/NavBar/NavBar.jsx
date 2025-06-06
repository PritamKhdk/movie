import React, { useState } from 'react';
import './NavBar.css';
import { useFavorites } from '../../context/FavoritesContext';
import { SearchMovies } from '../../services/api';

export const NavBar = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { favorites } = useFavorites();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const result = await SearchMovies(query);
      if (result.success) {
        window.dispatchEvent(
          new CustomEvent('movieSearch', {
            detail: {
              searchTerm: query,
              movies: result.data
            }
          })
        );
      } else {
        console.error('Search failed:', result.error);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }

  function onFavouriteOnly() {
    window.dispatchEvent(new CustomEvent('toggleFavorites'));
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">🎬 Movie Search App</div>

      <form className="navbar-search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <button type="submit" disabled={isSearching || !query.trim()}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      <button className="navbar-filter-btn" onClick={onFavouriteOnly}>
        Favorites ({favorites.length})
      </button>
    </nav>
  );
};

import React, { useState } from 'react';
import { SearchMovies } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchTerm) => {
    try {
      const result = await SearchMovies(searchTerm);
      if (result.success) {
        window.dispatchEvent(
          new CustomEvent('movieSearch', {
            detail: {
              searchTerm: searchTerm,
              movies: result.data
            }
          })
        );
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    await handleSearch(searchTerm);
    setIsSearching(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Movie Explorer</h1>
      </div>
      <form onSubmit={onSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </nav>
  );
};

export default Navbar;

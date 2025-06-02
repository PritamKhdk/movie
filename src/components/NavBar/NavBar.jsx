import React, { useState } from 'react';
import './NavBar.css';

export const NavBar = () => {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Search submitted:", query);
    // You can trigger a parent callback here
  }

  function onFavouriteOnly() {
    console.log("Favourite Movies Only clicked");
    // You can trigger a parent callback here
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
        />
        <button type="submit">Search</button>
      </form>

      <button className="navbar-filter-btn" onClick={onFavouriteOnly}>
        Favourite Movies Only
      </button>
    </nav>
  );
};

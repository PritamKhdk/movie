import { SearchMovies } from "../services/api";
import { useEffect, useReducer, useState } from "react";
import { movieReducer } from "../reducers/movieReducer";
import { initialState } from "../reducers/movieinitailstate";
import { useFavorites } from "../context/FavoritesContext";
import "./MovieCard.css";

const SEARCH_TERMS = [
  "love", "war", "hero", "life", "time", 
  "world", "game", "day", "man", "night"
];

const MovieCard = () => {
  const [state, dispatch] = useReducer(movieReducer, {
    ...initialState,
    movieSections: []
  });
  const [searchResults, setSearchResults] = useState(null);
  const [apiConfigured, setApiConfigured] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    console.log('MovieCard useEffect running');

    const fetchMovies = async () => {
      try {
        const testResult = await SearchMovies("test");
        console.log('API test result:', testResult);

        if (!testResult.success && testResult.error.includes('API key')) {
          setApiConfigured(false);
          return;
        }

        const selectedTerms = [...SEARCH_TERMS]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        console.log('Selected terms:', selectedTerms);

        const results = await Promise.all(
          selectedTerms.map(async (term) => {
            const result = await SearchMovies(term);
            return {
              term,
              movies: result.success ? result.data : []
            };
          })
        );

        console.log('Initial movie results:', results);

        dispatch({
          type: "INITIALIZE_MOVIES",
          payload: {
            movieSections: results
          }
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
        dispatch({ 
          type: "SEARCH_MOVIES_FAILURE", 
          payload: "An error occurred while fetching movies" 
        });
      }
    };

    if (!showFavorites) {
      fetchMovies();
    }

    const handleSearchEvent = (event) => {
      console.log('Search event received:', event.detail);
      setSearchResults({
        term: event.detail.searchTerm,
        movies: event.detail.movies
      });
      setShowFavorites(false);
    };

    const handleFavoritesToggle = (event) => {
      setShowFavorites(prev => !prev);
      setSearchResults(null);
    };

    window.addEventListener('movieSearch', handleSearchEvent);
    window.addEventListener('toggleFavorites', handleFavoritesToggle);

    return () => {
      window.removeEventListener('movieSearch', handleSearchEvent);
      window.removeEventListener('toggleFavorites', handleFavoritesToggle);
    };
  }, [showFavorites]);

  const handleFavoriteClick = (movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  const MovieSection = ({ title, movies }) => (
    <div className="movie-section">
      <h2>{title}</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img 
              src={movie.Poster} 
              alt={movie.Title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
              }}
            />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <button 
                className={`favorite-button ${isFavorite(movie.imdbID) ? 'favorited' : ''}`}
                onClick={() => handleFavoriteClick(movie)}
              >
                {isFavorite(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!apiConfigured) {
    return (
      <div className="api-error">
        <h2>API Configuration Required</h2>
        <p>Please configure the OMDB API key in your .env file:</p>
        <ol>
          <li>Create a file named .env in your project root</li>
          <li>Add the following line:</li>
          <code>VITE_OMDB_API_KEY=your_api_key_here</code>
          <li>Replace "your_api_key_here" with your OMDB API key</li>
          <li>Restart your development server</li>
        </ol>
        <p>You can get an API key from: <a href="http://www.omdbapi.com/apikey.aspx" target="_blank" rel="noopener noreferrer">OMDB API Key</a></p>
      </div>
    );
  }

  if (state.loading) {
    return <div className="loading">Loading...</div>;
  }

  if (state.error) {
    return <div className="error">{state.error}</div>;
  }

  if (showFavorites) {
    return (
      <div className="movie-container">
        <div className="search-header">
          <h2>My Favorite Movies</h2>
          <button 
            className="back-button"
            onClick={() => setShowFavorites(false)}
          >
            Back to Discover
          </button>
        </div>
        <div className="movie-list">
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <div className="movie-card" key={movie.imdbID}>
                <img 
                  src={movie.Poster} 
                  alt={movie.Title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <button 
                    className="favorite-button favorited"
                    onClick={() => handleFavoriteClick(movie)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No favorite movies yet</div>
          )}
        </div>
      </div>
    );
  }

  if (searchResults) {
    return (
      <div className="movie-container">
        <div className="search-header">
          <h2>Search Results for "{searchResults.term}"</h2>
          <button 
            className="back-button"
            onClick={() => setSearchResults(null)}
          >
            Back to Discover
          </button>
        </div>
        <div className="movie-list">
          {searchResults.movies.length > 0 ? (
            searchResults.movies.map((movie) => (
              <div className="movie-card" key={movie.imdbID}>
                <img 
                  src={movie.Poster} 
                  alt={movie.Title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                <div className="movie-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <button 
                    className={`favorite-button ${isFavorite(movie.imdbID) ? 'favorited' : ''}`}
                    onClick={() => handleFavoriteClick(movie)}
                  >
                    {isFavorite(movie.imdbID) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No movies found for "{searchResults.term}"</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="movie-container">
      {state.movieSections.map(section => (
        <MovieSection 
          key={section.term} 
          title={`Movies about "${section.term}"`} 
          movies={section.movies} 
        />
      ))}
    </div>
  );
};

export default MovieCard;

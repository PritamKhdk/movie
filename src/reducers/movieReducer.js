export const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
        error: null,
      };
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'INITIALIZE_MOVIES':
      return {
        ...state,
        loading: false,
        error: null,
        movieSections: action.payload.movieSections,
      };
    default:
      return state;
  }
}; 
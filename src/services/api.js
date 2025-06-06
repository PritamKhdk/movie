import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
  console.error('OMDB API key is missing. Please add VITE_OMDB_API_KEY to your .env file');
}

export const SearchMovies = async (query) => {
  try {
    if (!API_KEY) {
      return { 
        success: false, 
        error: 'API key is not configured. Please add VITE_OMDB_API_KEY to your .env file' 
      };
    }

    console.log('Searching for:', query); 
    
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        type: 'movie' 
      }
    });

    const data = response.data;
    console.log('API Response:', data); 

    if (data.Response === 'True') {
      return { success: true, data: data.Search };
    } else {
      console.log('API Error:', data.Error); 
      return { success: false, error: data.Error };
    }
  } catch (error) {
    console.error('API Call Error:', error); 
    return { 
      success: false, 
      error: 'Failed to fetch movies. Please try again.' 
    };
  }
};

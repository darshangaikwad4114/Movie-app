import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = "https://www.omdbapi.com/";

export const useMovies = () => {
  const [movies, setMovies] = useState({
    avengers: [],
    transformers: [],
    toyStory: [],
    harryPotter: [],
    fastAndFurious: [],
    piratesOfCaribbean: [],
    searchResults: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (searchValue, category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          s: searchValue,
          apikey: process.env.REACT_APP_OMDB_API_KEY
        }
      });
      
      if (response.data.Search) {
        setMovies(prev => ({
          ...prev,
          [category]: response.data.Search
        }));
      }
    } catch (error) {
      setError(`Failed to fetch ${category} movies: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, fetchMovies };
};

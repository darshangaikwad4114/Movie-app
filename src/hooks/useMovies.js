import { useState, useCallback } from 'react';
import axios from 'axios';

export const useMovies = () => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (searchValue, category) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.REACT_APP_OMDB_API_KEY;
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=${apiKey}`);
      const data = response.data;

      if (data.Response === "True") {
        setMovies(prevMovies => ({
          ...prevMovies,
          [category]: data.Search
        }));
      } else {
        setMovies(prevMovies => ({
          ...prevMovies,
          [category]: []
        }));
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, fetchMovies };
};

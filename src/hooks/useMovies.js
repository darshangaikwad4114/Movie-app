import { useState, useCallback, useMemo } from 'react';
import { useApi } from './useApi';

export const useMovies = () => {
  const [movies, setMovies] = useState({});
  const { loading, error, fetchData } = useApi();

  const fetchMovies = useCallback(async (searchValue, category) => {
    const data = await fetchData('/', { s: searchValue });
    
    if (data?.Search) {
      setMovies(prevMovies => ({
        ...prevMovies,
        [category]: data.Search
      }));
    }
  }, [fetchData]);

  const sortedMovies = useMemo(() => {
    return Object.entries(movies).reduce((acc, [category, movieList]) => {
      acc[category] = movieList.sort((a, b) => a.Title.localeCompare(b.Title));
      return acc;
    }, {});
  }, [movies]);

  return { 
    movies: sortedMovies, 
    loading, 
    error, 
    fetchMovies 
  };
};

import { useCallback } from 'react';
import axios from 'axios';
import { useCache } from './useCache';

const API_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "e04fd151";

export const useApi = () => {
  const { getCached, setCached } = useCache();

  const fetchData = useCallback(async (endpoint, params = {}) => {
    const cacheKey = JSON.stringify({ endpoint, params });
    const cachedData = getCached(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        params: {
          ...params,
          apikey: API_KEY
        }
      });

      if (response.data.Response === "False") {
        throw new Error(response.data.Error);
      }

      setCached(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.message}`);
    }
  }, [getCached, setCached]);

  return { fetchData };
};

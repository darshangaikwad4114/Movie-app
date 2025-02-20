import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../constants/config';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_CONFIG.baseUrl}${endpoint}`, {
        params: {
          ...params,
          apikey: API_CONFIG.apiKey
        }
      });

      if (response.data.Response === "True") {
        return response.data;
      } else {
        throw new Error(response.data.Error);
      }
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchData };
};

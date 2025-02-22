import { useCallback, useRef } from 'react';
import { useCache } from './useCache';
import { API_CONFIG } from '../config/constants';
import axios from 'axios';

export const useOptimizedApi = () => {
  const { getCached, setCached } = useCache();
  const abortControllerRef = useRef(null);

  const apiClient = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0',
    }
  });

  // Add request/response interceptors
  apiClient.interceptors.request.use(config => {
    // Cancel previous requests for same endpoint
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    config.signal = abortControllerRef.current.signal;
    return config;
  });

  apiClient.interceptors.response.use(
    response => response,
    error => {
      if (axios.isCancel(error)) {
        return Promise.reject(new Error('Request cancelled'));
      }
      return Promise.reject(error);
    }
  );

  const fetchWithRetry = useCallback(async (endpoint, params, retries = 0) => {
    try {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      const response = await apiClient.get(endpoint, {
        params: { ...params, apikey: API_CONFIG.apiKey },
        signal: abortControllerRef.current.signal,
      });

      return response.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        return null;
      }

      if (retries < API_CONFIG.retryCount) {
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.retryDelay * (retries + 1))
        );
        return fetchWithRetry(endpoint, params, retries + 1);
      }

      throw new Error(`API Error: ${error.message}`);
    }
  }, [apiClient]);

  const fetchData = useCallback(async (endpoint, params = {}) => {
    const cacheKey = JSON.stringify({ endpoint, params });
    const cachedData = getCached(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const data = await fetchWithRetry(endpoint, params);
    if (data) {
      setCached(cacheKey, data);
    }
    return data;
  }, [getCached, setCached, fetchWithRetry]);

  return { fetchData };
};

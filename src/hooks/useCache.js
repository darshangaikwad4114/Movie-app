import { useState, useCallback } from 'react';

const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export const useCache = () => {
  const [cache, setCache] = useState(new Map());

  const getCached = useCallback((key) => {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > CACHE_DURATION) {
      cache.delete(key);
      return null;
    }
    
    return item.data;
  }, [cache]);

  const setCached = useCallback((key, data) => {
    setCache(prev => new Map(prev).set(key, {
      data,
      timestamp: Date.now()
    }));
  }, []);

  return { getCached, setCached };
};

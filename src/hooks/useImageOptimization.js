import { useCallback, useMemo } from 'react';

export const useImageOptimization = () => {
  const supportsWebP = useMemo(() => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }, []);

  const supportsAVIF = useMemo(() => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }, []);

  const getOptimizedImageUrl = useCallback((url, options = {}) => {
    if (!url || url === 'N/A') return '/placeholder.jpg';

    const { width, quality = 80 } = options;
    const params = new URLSearchParams();

    if (width) params.append('w', width);
    params.append('q', quality);
    params.append('fmt', supportsAVIF ? 'avif' : supportsWebP ? 'webp' : 'jpg');

    try {
      const imageUrl = new URL(url);
      imageUrl.search = params.toString();
      return imageUrl.toString();
    } catch {
      return url;
    }
  }, [supportsWebP, supportsAVIF]);

  return { getOptimizedImageUrl };
};

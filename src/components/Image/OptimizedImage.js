import React, { useState, memo } from 'react';
import styles from './OptimizedImage.module.css';

const OptimizedImage = memo(({ src, alt, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <div className={`${styles.placeholder} ${className}`} {...props}>
        <span>Image not available</span>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${className}`} {...props}>
      {isLoading && (
        <div className={styles.skeleton} />
      )}
      <picture>
        <source
          type="image/webp"
          srcSet={`${src}?format=webp`}
        />
        <img
          src={src}
          alt={alt}
          className={styles.image}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{ opacity: isLoading ? 0 : 1 }}
        />
      </picture>
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;

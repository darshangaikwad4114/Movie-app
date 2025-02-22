import React, { memo, useCallback, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import OptimizedImage from '../Image/OptimizedImage';
import styles from './MovieCard.module.css';

const MovieCard = memo(({ movie, onFavoriteClick, isFavorite }) => {
  const [isFocused, setIsFocused] = useState(false);
  const buttonRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleFavoriteClick = useCallback((e) => {
    e.stopPropagation();
    onFavoriteClick(movie, isFavorite);
  }, [movie, isFavorite, onFavoriteClick]);

  const handleCardKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      buttonRef.current?.focus();
    }
    if (e.key === 'Escape') {
      e.target.blur();
    }
  }, []);

  return (
    <article 
      ref={ref}
      className={styles.card} 
      role="article"
      tabIndex={0}
      onKeyDown={handleCardKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      data-focused={isFocused}
      aria-label={`${movie.Title} (${movie.Year})`}
      style={{
        opacity: inView ? 1 : 0,
        transform: `translateY(${inView ? 0 : '20px'})`
      }}
    >
      <OptimizedImage
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
        alt={`Movie poster for ${movie.Title}`}
        className={styles.poster}
      />
      <div className={styles.content} role="group" aria-label="Movie details">
        <h3 className={styles.title} id={`movie-title-${movie.imdbID}`}>
          {movie.Title}
        </h3>
        <p className={styles.year} aria-label="Release year">
          {movie.Year}
        </p>
        <div className={styles.actions}>
          <button 
            ref={buttonRef}
            className={`${styles.button} ${styles.primary}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? `Remove ${movie.Title} from favorites` : `Add ${movie.Title} to favorites`}
            aria-pressed={isFavorite}
          >
            <span aria-hidden="true">{isFavorite ? 'Remove' : 'Save'}</span>
          </button>
          <button 
            className={styles.button}
            aria-label={`View details for ${movie.Title}`}
            aria-describedby={`movie-title-${movie.imdbID}`}
          >
            <span aria-hidden="true">More Info</span>
          </button>
        </div>
      </div>
    </article>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;

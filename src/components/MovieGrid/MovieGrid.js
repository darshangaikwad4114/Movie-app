import React, { memo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieGrid.module.css';

const MovieGrid = memo(({ movies, onFavoriteClick, favorites }) => {
  const parentRef = React.useRef();

  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(movies.length / 5),
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 5
  });

  return (
    <section 
      className={styles.grid}
      ref={parentRef}
      role="feed"
      aria-label="Movie grid"
      aria-busy={!movies.length}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const start = virtualRow.index * 5;
          const end = Math.min(start + 5, movies.length);
          
          return (
            <div
              key={virtualRow.index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className={styles.row}
            >
              {movies.slice(start, end).map(movie => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onFavoriteClick={onFavoriteClick}
                  isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
                />
              ))}
            </div>
          );
        })}
      </div>
      {!movies.length && (
        <div 
          className={styles.empty}
          role="status"
          aria-label="No movies found"
        >
          No movies found
        </div>
      )}
    </section>
  );
});

MovieGrid.displayName = 'MovieGrid';

export default MovieGrid;

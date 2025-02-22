import React, { memo, useMemo, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieGrid.module.css';
import { BREAKPOINTS } from '../../config/constants';

const INITIAL_ITEMS = 15;

const MovieGrid = memo(({ movies, onFavoriteClick, favorites }) => {
  const parentRef = React.useRef();
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const visibleMovies = useMemo(() => 
    inView ? movies : movies.slice(0, INITIAL_ITEMS),
    [movies, inView]
  );

  // Calculate optimal columns based on viewport
  const getColumnCount = useCallback(() => {
    const width = window.innerWidth;
    if (width >= BREAKPOINTS.xxl) return 6;
    if (width >= BREAKPOINTS.xl) return 5;
    if (width >= BREAKPOINTS.lg) return 4;
    if (width >= BREAKPOINTS.md) return 3;
    return 2;
  }, []);

  const columnCount = useMemo(() => getColumnCount(), [getColumnCount]);
  
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(visibleMovies.length / columnCount),
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => {
      const width = window.innerWidth;
      return width < BREAKPOINTS.md ? 200 : 300;
    }, []),
    overscan: 3,
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
          const start = virtualRow.index * columnCount;
          const end = Math.min(start + columnCount, visibleMovies.length);
          
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
              {visibleMovies.slice(start, end).map(movie => (
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
      <div ref={loadMoreRef} />
    </section>
  );
});

MovieGrid.displayName = 'MovieGrid';

export default MovieGrid;

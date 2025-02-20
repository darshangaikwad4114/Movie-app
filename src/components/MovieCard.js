import React, { memo } from 'react';

const MovieCard = memo(({ movie, onFavoriteClick, FavoriteComponent, isFavorite }) => {
  return (
    <div 
      className="image-container"
      role="listitem"
      aria-label={movie.Title}
    >
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} 
        alt={movie.Title}
        loading="lazy"
      />
      <div
        className="overlay"
        onClick={() => onFavoriteClick(movie, isFavorite)}
        onKeyPress={(e) => e.key === 'Enter' && onFavoriteClick(movie, isFavorite)}
        role="button"
        tabIndex={0}
        aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
      >
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="favorite-btn">
          <FavoriteComponent />
        </div>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;

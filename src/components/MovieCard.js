import React, { memo } from 'react';

const MovieCard = memo(({ movie, onFavoriteClick, FavoriteComponent, isFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking button
    onFavoriteClick(movie, isFavorite);
  };

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
      <div className="overlay">
        <h3 className="movie-title">{movie.Title}</h3>
        <button
          className="favorite-btn"
          onClick={handleFavoriteClick}
          aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
        >
          <FavoriteComponent />
        </button>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;

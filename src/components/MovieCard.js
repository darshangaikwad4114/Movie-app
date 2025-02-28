import React, { memo } from 'react';
import PropTypes from 'prop-types';

const MovieCard = memo(({ movie, onFavoriteClick, FavoriteComponent, isFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteClick(movie, isFavorite);
  };

  return (
    <div className="movie-card" role="article">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
        alt={movie.Title}
        className="movie-poster"
        loading="lazy"
        decoding="async"
      />
      <div className="movie-content">
        <h3 className="movie-title">{movie.Title}</h3>
        <div className="button-group">
          <button 
            className="action-btn"
            onClick={handleFavoriteClick}
            aria-label={`${isFavorite ? 'Remove from' : 'Add to'} favorites`}
          >
            <i className="bi bi-heart-fill"></i>
            <span>{isFavorite ? 'Remove' : 'Save'}</span>
          </button>
          <button 
            className="action-btn"
            aria-label="View details"
          >
            <i className="bi bi-info-circle"></i>
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
});

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Title: PropTypes.string,
  }).isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  FavoriteComponent: PropTypes.elementType.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

MovieCard.displayName = 'MovieCard';

export default MovieCard;

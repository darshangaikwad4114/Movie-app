import React, { memo } from 'react';

const MovieList = memo(({ movies, handleFavouritesClick, favouriteComponent: FavouriteComponent, favourites }) => {
  const isFavourite = (movie) => favourites.some(fav => fav.imdbID === movie.imdbID);

  return (
    <div className="row justify-content-center" role="list">
      {movies.map((movie) => (
        <div 
          className="image-container"
          key={movie.imdbID}
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
            onClick={() => handleFavouritesClick(movie, isFavourite(movie))}
            onKeyPress={(e) => e.key === 'Enter' && handleFavouritesClick(movie, isFavourite(movie))}
            role="button"
            tabIndex={0}
            aria-label={`${isFavourite(movie) ? 'Remove from' : 'Add to'} favorites`}
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </div>
  );
});

MovieList.displayName = 'MovieList';

export default MovieList;

import React, { memo } from 'react';
import MovieCard from './MovieCard';

const MovieList = memo(({ movies, handleFavouritesClick, favouriteComponent, favourites }) => {
  const isFavourite = (movie) => favourites.some(fav => fav.imdbID === movie.imdbID);

  if (!movies?.length) {
    return null;
  }

  return (
    <div className="movie-grid" role="list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onFavoriteClick={handleFavouritesClick}
          FavoriteComponent={favouriteComponent}
          isFavorite={isFavourite(movie)}
        />
      ))}
    </div>
  );
});

MovieList.displayName = 'MovieList';

export default MovieList;

import React, { Suspense, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import MovieListHeading from "./components/MovieListHeading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const { movies, loading, error, fetchMovies } = useMovies();
  const [favourites, setFavourites] = useLocalStorage('favourites', []);
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');

  // Add effect to fetch initial movies
  useEffect(() => {
    const initializeMovies = async () => {
      const categories = [
        ["Avengers", "AVENGERS"],
        ["Transformers", "TRANSFORMERS"],
        ["Toy Story", "TOY STORY"],
        ["Harry Potter", "HARRY POTTER"],
        ["Fast Furious", "FAST AND FURIOUS"],
        ["Pirates Caribbean", "PIRATES OF CARIBBEAN"]
      ];

      await Promise.all(
        categories.map(([search, category]) => fetchMovies(search, category))
      );
    };

    initializeMovies();
  }, [fetchMovies]);

  // Fetch search results when searchValue changes
  useEffect(() => {
    if (searchValue) {
      fetchMovies(searchValue, "searchResults");
    }
  }, [searchValue, fetchMovies]);

  const handleFavoriteClick = useCallback((movie, isFavorite) => {
    setFavourites(prev => 
      isFavorite 
        ? prev.filter(fav => fav.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  }, [setFavourites]);

  if (error) {
    return <ErrorBoundary error={error} />;
  }

  return (
    <div className="movie-app d-flex flex-column min-vh-100">
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <main className="content-wrapper">
            {loading && <LoadingSpinner />}

            {searchValue && (
              <div className="movie-section searchResults">
                <MovieListHeading heading="Search Results" />
                <MovieList
                  movies={movies.searchResults}
                  handleFavouritesClick={handleFavoriteClick}
                  favouriteComponent={AddFavourites}
                  favourites={favourites}
                />
              </div>
            )}

            {Object.entries(movies)
              .filter(([category]) => category !== "searchResults")
              .map(
                ([category, movieList]) =>
                  movieList.length > 0 && (
                    <div
                      key={category}
                      className={`movie-section ${category}`}
                    >
                      <MovieListHeading heading={category} />
                      <MovieList
                        movies={movieList}
                        handleFavouritesClick={handleFavoriteClick}
                        favouriteComponent={AddFavourites}
                        favourites={favourites}
                      />
                    </div>
                  )
              )}

            {favourites.length > 0 && (
              <div className="movie-section favourites">
                <MovieListHeading heading="FAVOURITES MOVIES" />
                <MovieList
                  movies={favourites}
                  handleFavouritesClick={handleFavoriteClick}
                  favouriteComponent={RemoveFavourites}
                  favourites={favourites}
                />
              </div>
            )}
          </main>
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </div>
  );
};

export default App;

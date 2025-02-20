import React, { useState, useEffect, useCallback, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import MovieListHeading from "./components/MovieListHeading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useMovies } from "./hooks/useMovies";

const App = () => {
  const { movies, loading, error, fetchMovies } = useMovies();
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const initializeMovies = async () => {
      const categories = [
        ["Avengers", "avengers"],
        ["Transformers", "transformers"],
        ["Toy Story", "toyStory"],
        ["Harry Potter", "harryPotter"],
        ["Fast Furious", "fastAndFurious"],
        ["Pirates Caribbean", "piratesOfCaribbean"]
      ];

      await Promise.all(
        categories.map(([search, category]) => fetchMovies(search, category))
      );
    };

    initializeMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (searchValue) {
      const timeoutId = setTimeout(() => {
        fetchMovies(searchValue, "searchResults");
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchValue, fetchMovies]);

  const handleFavoriteClick = useCallback((movie, isFavorite) => {
    setFavourites(prev => 
      isFavorite 
        ? prev.filter(fav => fav.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  }, []);

  if (error) {
    return <div className="alert alert-danger m-3" role="alert">{error}</div>;
  }

  return (
    <div className="movie-app d-flex flex-column min-vh-100">
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <div className="content-wrapper">
          {loading && <div className="text-center mt-5">Loading...</div>}

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

          {!searchValue && (
            <>
              {Object.entries(movies)
                .filter(([category]) => category !== 'searchResults')
                .map(([category, movieList]) => (
                  movieList.length > 0 && (
                    <div key={category} className={`movie-section ${category}`}>
                      <MovieListHeading heading={category} />
                      <MovieList
                        movies={movieList}
                        handleFavouritesClick={handleFavoriteClick}
                        favouriteComponent={AddFavourites}
                        favourites={favourites}
                      />
                    </div>
                  )
              ))}
            </>
          )}

          {favourites.length > 0 && (
            <div className="movie-section favourites">
              <MovieListHeading heading="Favourites" />
              <MovieList
                movies={favourites}
                handleFavouritesClick={handleFavoriteClick}
                favouriteComponent={RemoveFavourites}
                favourites={favourites}
              />
            </div>
          )}
        </div>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;

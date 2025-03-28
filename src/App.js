import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import MovieListHeading from "./components/MovieListHeading";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from './components/LoadingSpinner';

const API_URL = "https://www.omdbapi.com/";

const App = () => {
  const [movies, setMovies] = useState({
    avengers: [],
    transformers: [],
    toyStory: [],
    harryPotter: [],
    fastAndFurious: [],
    piratesOfCaribbean: [],
    searchResults: []
  });
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);

  // Add loading states for different sections
  const [sectionLoading, setSectionLoading] = useState({
    initial: true,
    search: false
  });

  const getMovieRequest = useCallback(async (searchValue, category) => {
    const isSearch = category === 'searchResults';
    if (isSearch) {
      setSectionLoading(prev => ({ ...prev, search: true }));
    }

    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: {
          s: searchValue,
          apikey: process.env.REACT_APP_OMDB_API_KEY || "e04fd151"
        }
      });
      
      if (response.data.Search) {
        setMovies(prev => ({
          ...prev,
          [category]: response.data.Search
        }));
      }
    } catch (error) {
      setError(`Failed to fetch ${category} movies: ${error.message}`);
    } finally {
      if (isSearch) {
        setSectionLoading(prev => ({ ...prev, search: false }));
      } else {
        setSectionLoading(prev => ({ ...prev, initial: false }));
      }
    }
  }, []);

  useEffect(() => {
    const initializeMovies = async () => {
      await Promise.all([
        getMovieRequest("Avengers", "AVENGERS"),
        getMovieRequest("Transformers", "TRANSFORMERS"),
        getMovieRequest("Toy Story", "TOY STORY"),
        getMovieRequest("Harry Potter", "HARRY POTTER"),
        getMovieRequest("Fast Furious", "FAST FURIOUS"),
        getMovieRequest("Pirates Caribbean", "PIRATES CARIBBEAN")
      ]);
    };
    initializeMovies();
  }, [getMovieRequest]);

  useEffect(() => {
    if (searchValue) {
      const timeoutId = setTimeout(() => {
        getMovieRequest(searchValue, "searchResults");
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [searchValue, getMovieRequest]);

  const handleFavoriteClick = useCallback((movie, isFavorite) => {
    setFavourites(prev => 
      isFavorite 
        ? prev.filter(fav => fav.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  }, []);

  // Add empty state handling
  const renderEmptyState = (message) => (
    <div className="empty-state">
      <i className="bi bi-film"></i>
      <p>{message}</p>
    </div>
  );

  if (error) {
    return <div className="alert alert-danger m-3" role="alert">{error}</div>;
  }

  return (
    <div className="movie-app d-flex flex-column min-vh-100">
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      
      <div className="content-wrapper">
        {sectionLoading.initial && <LoadingSpinner />}

        <div className="container">
          {searchValue && (
            <>
              <MovieListHeading heading="Search Results" />
              {sectionLoading.search ? (
                <LoadingSpinner />
              ) : movies.searchResults.length === 0 ? (
                renderEmptyState('No movies found. Try a different search term.')
              ) : (
                <MovieList
                  movies={movies.searchResults}
                  handleFavouritesClick={handleFavoriteClick}
                  favouriteComponent={AddFavourites}
                  favourites={favourites}
                />
              )}
            </>
          )}

          {Object.entries(movies)
            .filter(([category]) => category !== 'searchResults')
            .map(([category, movieList]) => (
              movieList.length > 0 && (
                <div className={`movie-section ${category}`} key={category}>
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

          {favourites.length > 0 && (
            <div className="movie-section favourites">
              <MovieListHeading heading="FAVOURITES" />
              <MovieList
                movies={favourites}
                handleFavouritesClick={handleFavoriteClick}
                favouriteComponent={RemoveFavourites}
                favourites={favourites}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;

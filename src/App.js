import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import PropTypes from "prop-types";

const API_KEY = "e04fd151"; // OMDB API key

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading local storage", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting local storage", error);
    }
  };

  return [storedValue, setValue];
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useLocalStorage("react-movie-app-favourites", []);
  const [searchValue, setSearchValue] = useState("Avengers");

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.Search) {
        setMovies(response.data.Search);
      }
    } catch (error) {
      console.error("Error fetching data from OMDB API", error);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          className="col-12 col-md-6 mb-4"
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourite Movies" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
          className="col-12 col-md-6 mb-4"
        />
      </div>
    </div>
  );
};

App.propTypes = {
  movies: PropTypes.array,
  favourites: PropTypes.array,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
  addFavouriteMovie: PropTypes.func,
  removeFavouriteMovie: PropTypes.func,
};

export default App;

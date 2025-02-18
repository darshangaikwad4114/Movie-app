import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import MovieListHeading from "./components/MovieListHeading";

const API_KEY = "e04fd151"; // OMDB API key

const App = () => {
  const [avengersMovies, setAvengersMovies] = useState([]);
  const [transformersMovies, setTransformersMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue, setMovies) => {
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
    getMovieRequest("Avengers", setAvengersMovies);
    getMovieRequest("Transformers", setTransformersMovies);
    getMovieRequest("Toy Story", setRandomMovies);
  }, []);

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
        <MovieListHeading heading="Avengers Movies" />
      </div>
      <div className="row justify-content-center">
        <MovieList
          movies={avengersMovies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Transformers Movies" />
      </div>
      <div className="row justify-content-center">
        <MovieList
          movies={transformersMovies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Toy Story Movies" />
      </div>
      <div className="row justify-content-center">
        <MovieList
          movies={randomMovies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourite Movies" />
      </div>
      <div className="row justify-content-center">
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;

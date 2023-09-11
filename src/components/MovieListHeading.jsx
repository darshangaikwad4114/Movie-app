import React from "react";

const MovieListHeading = (props) => {
  return (
    <span className="col mx-3">
      <h1>{props.heading}</h1>
    </span>
  );
};

export default MovieListHeading;

import React from 'react';

const MovieList = (props) => {
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3 col-12 col-sm-6 col-md-4 col-lg-3' key={index}>
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<props.favouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;

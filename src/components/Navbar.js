import React from 'react';
import Logo from './Logo';

const Navbar = ({ searchValue, setSearchValue }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" data-bs-theme="dark">
			<div className="container-fluid justify-content-between">
				<a className="navbar-brand" href="/" style={{ fontSize: '1.5rem' }}>
					<Logo /> FilmFinder
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<form className="d-flex ms-auto" role="search">
						<input
							className="form-control me-2"
							type="search"
							placeholder="Search movies"
							aria-label="Search"
							value={searchValue}
							onChange={(event) => setSearchValue(event.target.value)}
						/>
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

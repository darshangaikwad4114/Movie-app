import React from 'react';
import Logo from './Logo';

const Navbar = ({ searchValue, setSearchValue }) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" data-bs-theme="dark">
			<div className="container-fluid py-0">
				<a className="navbar-brand d-flex align-items-center" href="/">
					<Logo /> <span className="ms-2">FilmFinder</span>
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<form className="d-flex ms-auto search-form py-1" role="search">
						<input
							className="form-control search-input"
							type="search"
							placeholder="Search movies"
							aria-label="Search"
							value={searchValue}
							onChange={(event) => setSearchValue(event.target.value)}
						/>
						<button className="btn btn-outline-success search-button" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

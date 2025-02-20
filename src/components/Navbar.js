import React from 'react';
import logo from '../assets/logo.svg';

const Navbar = ({ searchValue, setSearchValue }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="FilmFinder Logo" className="navbar-logo me-2" />
          FilmFinder
        </a>
        
        <div className="search-container ms-auto">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search for movies..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

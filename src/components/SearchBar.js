import React, { component } from 'react';
import PropTypes from 'prop-types';
import MovieCollection from './MovieCollection';

const SearchBar = (props) => {
  const { searchMovie, searchChangeCallback } = props;
  return (
    <section>
      <div>
        <label className="search-bar--label" htmlFor="searchBar">Search</label>
      </div>
      <input
        onChange={(event) => { searchChangeCallback(event.target.value) }}
        value={searchMovie}
        name="searchBar"
        id="searchBar"
        className="search-bar"
        />
        
        <MovieCollection movies={props.movies}/>
    </section>
  );
};

SearchBar.propTypes = {
  searchChangeCallback: PropTypes.func.isRequired,
  searchMovie: PropTypes.string.isRequired,
};

export default SearchBar;

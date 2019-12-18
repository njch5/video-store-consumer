import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieCollection from './MovieCollection';
import axios from 'axios';

class SearchBar extends Component {
  componentDidMount () {};
  selectMovie = (movieId) => {
    const movieCollection = this.props.movies;

    const currentMovie = movieCollection.find((movie) => {
      return movie.external_id === movieId;
    });
    console.log(currentMovie)
    this.addMovie(currentMovie)
  }

  addMovie = (movieToAdd) => {
    axios.post('http://localhost:3000/movies', movieToAdd)

      .then((response) => {
        // console.log(movieToAdd);
        // console.log(response.data)
        this.setState({ error: ''})
        // const { movieResults } = this.state;
        // movieResults.push(response.data)
        // this.setState({
        //   movieResults,
        //   error: undefined,
        // });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }
  render(){
  const { searchMovie, searchChangeCallback } = this.props;
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
        
        <MovieCollection movies={this.props.movies} selectMovieCallback={this.selectMovie}/>
    </section>
  );}
};

SearchBar.propTypes = {
<<<<<<< Updated upstream
  searchChangeCallback: PropTypes.func,
  searchMovie: PropTypes.string.isRequired,
=======
  searchChangeCallback: PropTypes.func.isRequired,
  searchMovie: PropTypes.string,
>>>>>>> Stashed changes
};

export default SearchBar;

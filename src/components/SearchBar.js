import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieCollection from './MovieCollection';
import axios from 'axios';
import videostore from '/Users/samcoll/ADA/week20/video-store-consumer/src/_DSC2759.jpg'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/SearchBar.css';

class SearchBar extends Component {
  componentDidMount () {};
  selectMovie = (movieId) => {
    const movieCollection = this.props.movies;

    const currentMovie = movieCollection.find((movie) => {
      return movie.external_id === movieId;
    });
    // console.log(currentMovie)
    this.addMovie(currentMovie)
  }

  addMovie = (movieToAdd) => {
    // if (!this.props.movies.find(movie => movie.external_id === movieToAdd.external_id)) {
    axios.post('http://localhost:3000/movies', movieToAdd)

      .then((response) => {
        this.setState({ error: ''})
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
    }
  
  render(){
  const { searchMovie, searchChangeCallback } = this.props;
  return (
    <section>  
      <div className= "search-movie-card">
      
      <div>
        <h5><strong><label className="search-bar--label" htmlFor="searchBar">Search Movie</label></strong></h5>
      </div>
      
      <input
        onChange={(event) => { searchChangeCallback(event.target.value) }}
        value={searchMovie}
        name="searchBar"
        id="searchBar"
        className="search-bar"
        />
      </div>

      <div className="cearch-movie-card">
        <MovieCollection movies={this.props.movies} selectMovieCallback={this.selectMovie}/>
      </div>

      <div>
        <img src={videostore} className="video_store_image" alt="logo" />
      </div>
    </section>
  );}
};

SearchBar.propTypes = {
  searchChangeCallback: PropTypes.func,
  searchMovie: PropTypes.string,
};

export default SearchBar;

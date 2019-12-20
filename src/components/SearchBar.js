import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieCollection from './MovieCollection';
import axios from 'axios';
import videostore from '/Users/nickychoi/Documents/ada-weekly-workspaces/week-twenty/video-store-consumer/src/_DSC2759.jpg'
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/SearchBar.css';

class SearchBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      alertText: '',
      alertVariant: '',
    };
  }
  componentDidMount () {
    axios.get('http://localhost:3000/movies')
      .then((response) => {
        console.log("SUCCESS")
        // console.log(response.data)
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.log("FAILED")
        this.setState({ error: error.message });
      });
  };
  selectMovie = (movieId) => {
    const movieCollection = this.props.movies;

    const currentMovie = movieCollection.find((movie) => {
      return movie.external_id === movieId;
    });
    // console.log(currentMovie)
    this.addMovie(currentMovie)
  }

  addMovie = (movieToAdd) => {
    if (!this.state.movies.find(movie => movie.external_id === movieToAdd.external_id)) {

    axios.post('http://localhost:3000/movies', movieToAdd)
      // console.log(this.state.movies)
      .then((error) => {
        this.setState({ 
          alertText: "Failed to add movie",
          alertVariant: "danger"  
        })
      })
      .catch((response) => {
        this.setState({
          alertText: "Added movie to library!",
          alertVariant: "success"
        });
      });
  } else {
    this.setState({
      alertText: "This movie has already been added to the library",
      alertVariant: "danger"
    });
  }
}
  
  render(){
  const { searchMovie, searchChangeCallback } = this.props;
  return (

    <section> 
      <Alert 
      variant={this.state.alertVariant}
      onClose={() => this.setState({alertText: undefined, alertVariant: undefined})} 
      dismissible
    > 
      {this.state.alertText} 
      </Alert> 
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

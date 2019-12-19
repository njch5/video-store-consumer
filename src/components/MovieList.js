import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Movie from './Movie';
import axios from 'axios';
import MovieCollection from './MovieCollection';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/MovieList.css';

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }
  // getMovies = (movies, selectMovieCallback, addMovieCallback) => {
  //     return movies.map((movie) => {
  //       return <Movie
  //         key={movie.id}
  //         {...movie}
  //         selectMovieCallback={selectMovieCallback}
  //         addMovieCallback={addMovieCallback}
  //       />
  //     });
  //   }

  movieSelected = (movieId) => {
    this.props.selectMovieCallback(this.state.movies, movieId);
    
  }
  
  componentDidMount() {
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
  }

  render () {
    // console.log(this.props.selectMovieCallback)
    // console.log("**********************")
    return (
    <div className="card-group">
    {/* {this.getMovies(this.state.movies, this.selectMovieCallback, this.addMovieCallback)} */}
    <MovieCollection movies={this.state.movies} selectMovieCallback={this.movieSelected}/>
    </div>
    )
  }
}

MovieList.propTypes = {
  movies: PropTypes.array,
  selectMovieCallback: PropTypes.func,
  addMovieCallback: PropTypes.func,
};

export default MovieList;

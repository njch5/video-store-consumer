import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
// import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/MovieCollection.css';


const getMovies = (movies, selectMovieCallback, addMovieCallback) => {
  return movies.map((movie) => {
    return <Movie
      key={movie.id}
      {...movie}
      selectMovieCallback={selectMovieCallback}
      addMovieCallback={addMovieCallback}
    />
  });
}

const MovieCollection = ({ movies, selectMovieCallback, addMovieCallback}) => {
  console.log(addMovieCallback);
  
  return (
    <div className="card-group">
      {getMovies(movies, selectMovieCallback, addMovieCallback)}
    </div>
  )
}

MovieCollection.propTypes = {
  movies: PropTypes.array.isRequired,
  selectMovieCallback: PropTypes.func,
  addMovieCallback: PropTypes.func,
};

export default MovieCollection;

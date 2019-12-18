import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/MovieCollection.css';

const getMovies = (movies, selectMovieCallback) => {
  return movies.map((movie) => {
    return <Movie
      key={movie.id}
      {...movie}
      selectMovieCallback={selectMovieCallback}
    />
  });
}

const MovieCollection = ({ movies, selectMovieCallback}) => {
  return (
    <div className="card-group">
      {getMovies(movies, selectMovieCallback)}
    </div>
  )
}

MovieCollection.propTypes = {
  movies: PropTypes.array.isRequired,
  selectMovieCallback: PropTypes.func
};

export default MovieCollection;

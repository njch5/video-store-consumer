import React from 'react';
import PropTypes from 'prop-types';

const Movie = (props) => {
  const { id, title, overview, releaseDate, inventory, selectMovieCallback } = props;

  return(
    <div className="movie">
      <p>{title}</p>
      <p>{overview}</p>
      <p>{releaseDate}</p>
      <p>{inventory}</p>

      <section className="movie--header">
        <button
          className="btn btn-primary movie--select-movie-btn"
          onClick={() => { selectMovieCallback(id) }}
        >
          Select Movie
        </button>
      </section>
    </div>
  );
};

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.instanceOf(Date),
  inventory: PropTypes.number.isRequired,
  selectMovieCallback: PropTypes.func,
}

export default Movie;
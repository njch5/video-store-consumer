import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';

const Movie = (props) => {
  const { id, title, overview, release_date, image_url, external_id, selectMovieCallback, addMovieCallback } = props;

  return(
    <div className="movie-card">
      <p>{title}</p>
      <p>overview: {overview}</p>
      <p>release date: {release_date}</p>
      <p>external ID: {external_id}</p>

      <img src={image_url} alt="film poster" />

      <section className="movie--header">
        <button
          className="btn btn-primary movie--select-movie-btn"
          onClick={() => { selectMovieCallback(id) }}
        >
          Select Movie
        </button>

        <button
          className="btn btn-primary movie--add-movie-btn"
          onClick={() => { addMovieCallback(external_id) }}
        >
          Add Movie to Library
        </button>
      </section>
    </div>
  );
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number, 
  selectMovieCallback: PropTypes.func,
  addMovieCallback: PropTypes.func,
}

export default Movie;
import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Movie.css';

const Movie = (props) => {
  const { title, overview, release_date, image_url, external_id, selectMovieCallback } = props;

  return(
    <section className="movie-card">
      <h5><strong>{title}</strong></h5>
      <p>{overview}</p>
      <p>Release date: {release_date}</p>
      {/* <p>external ID: {external_id}</p> */}

      <img src={image_url} alt="film poster" />
      
      <section className="button">
        <button
          className="btn btn-primary movie--select-movie-btn"
          onClick={() => { selectMovieCallback(external_id) }}
        >
          Select Movie
        </button>
        </section>
    </section>
  );
};

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number, 
  selectMovieCallback: PropTypes.func,
  addMovieCallback: PropTypes.func,
}

export default Movie;

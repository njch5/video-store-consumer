import React from 'react';
import PropTypes from 'prop-types';

const RentalDetails = (props) => {
  const { name } = props.currentCustomer;
  const { title } = props.currentMovie;
  const { addRentalCallback } = props;

  return (
    <section className="rental-details">
      <p className="rentaldetails--customer">{ name ? `Selected Customer: ${name}` : ''}</p>
      <p className="rentaldetails--movie">{ title ? `Selected Movie: ${title}` : ''}</p>

    {name && title ? <button
      className="btn btn-primary rental"
      onClick={() => {addRentalCallback(props.currentMovie, props.currentCustomer)}}>
        Rent this Movie
    </button> : ''}
    
    </section>
  )
}

RentalDetails.propTypes = {
  currentCustomer: PropTypes.shape({
    name: PropTypes.string,
  }),
  currentMovie: PropTypes.shape({
    title: PropTypes.string,
  }),
  addRentalCallback: PropTypes.func,
}

export default RentalDetails;

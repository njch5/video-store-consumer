import React from 'react';
import PropTypes from 'prop-types';

const RentalDetails = (props) => {
  const { name } = props.currentCustomer;
  const { title } = props.currentMovie;

  // console.log(name)
  // console.log(props.currentCustomer)
  const { addRentalCallback } = props;
  return (
    <section className="rental-details">
      <p className="rentaldetails--customer">Customer: {name}</p>
      <p className="rentaldetails--movie">Movie: {title}</p>

    <button
      className="btn btn-primary rental"
      onClick={() => {addRentalCallback(props.currentMovie, props.currentCustomer)}}>
        Rent this Movie
    </button>
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
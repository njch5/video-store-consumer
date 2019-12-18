import React from 'react';
import PropTypes from 'prop-types';

const RentalDetails = (props) => {
  const { name } = props.currentCustomer;
  const { title } = props.currentMovie;
  return (
    <section className="rental-details">
      <h2 className="rentaldetails--customer">{name}</h2>
      <h3 className="rentaldetails--movie">{title}</h3>
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
}

export default RentalDetails;
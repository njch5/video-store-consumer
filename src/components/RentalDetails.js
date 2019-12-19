import React from 'react';
import PropTypes from 'prop-types';

const RentalDetails = (props) => {
  const { name } = props.currentCustomer;
  const { title } = props.currentMovie;

  // console.log(name)
  // console.log(props.currentCustomer)
  const { addRentalCallback } = props;

  return (
    // this.state.alertText ? videoAlert() : ""
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

  // if (props.currentCustomer !== ''){
  //   return (
  //     <section className="rental-details">
  //       <p className="rentaldetails--customer">CURRENT CUSTOMER: {name}</p>
  //       <p className="rentaldetails--movie">SELECTED MOVIE: {title}</p>

  //     <button
  //       className="btn btn-primary rental"
  //       onClick={() => {addRentalCallback(props.currentMovie, props.currentCustomer)}}>
  //         Rent this Movie
  //     </button>
  //     </section>
  //   )
  // } else {
  //   return (
  //     ''
  //   )
  // }

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

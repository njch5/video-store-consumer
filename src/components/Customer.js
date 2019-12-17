import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
  const { id, name, registered_at, address, city, state, postalCode, phone, accountCredit, selectCustomerCallback } = props;
  
  return(
    <div className="customer-item">

      <section className="customer--header">
        <p>{name}</p>
        <p>{registered_at}</p>
        <p>{address}</p>
        <p>{city}</p>
        <p>{state}</p>
        <p>{postalCode}</p>
        <p>{phone}</p>
        <p>{accountCredit}</p>

        <button
          className="btn btn-primary customer"
          onClick={() => {selectCustomerCallback(id)}}>
            Customer
        </button>
      </section>
    </div>
  );
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  registered_at: PropTypes.number,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postalCode: PropTypes.number,
  phone: PropTypes.number,
  accountCredit = PropTypes.number,
  selectCustomerCallback: PropTypes.func,
}

export default Customer;

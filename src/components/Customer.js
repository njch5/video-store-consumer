import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Customer.css';

const Customer = (props) => {
  const { id, name, registered_at, address, city, state, postal_code, phone, account_credit, selectCustomerCallback } = props;
  
  return(
    <div className="customer-card">

      <section className="customer--header">
        <p><strong>{name}</strong></p>
        <p>{registered_at}</p>
        <p>{address}</p>
        <p>{city}</p>
        <p>{state}</p>
        <p>{postal_code}</p>
        <p>{phone}</p>
        {/* <p>{account_credit}</p> */}

        <button
          className="btn btn-primary customer"
          onClick={() => {selectCustomerCallback(id)}}>
            Select Customer
        </button>
      </section>
    </div>
  );
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  registered_at: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postal_code: PropTypes.string,
  phone: PropTypes.string,
  account_credit: PropTypes.number,
  selectCustomerCallback: PropTypes.func,
}

export default Customer;

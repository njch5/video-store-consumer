import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';

const getCustomers = (customers, selectCustomerCallBack) => {
  return customers.map((customer) => {
    return <Customer
      key={customer.id}
      {...customer}
      selectCustomerCallback={selectCustomerCallBack}
    />
  });
}

const CustomerCollection = ({ customers, selectPetCallback }) => {
  return (
    <div className="customer-group">
      {getCustomers(customers, selectPetCallback)}
    </div>
  )
}

CustomerCollection.propTypes = {
  customers: PropTypes.array.isRequired,
  selectCustomerCallback: PropTypes.func,
};

export default CustomerCollection;

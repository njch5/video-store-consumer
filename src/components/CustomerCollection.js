import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';

import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerCollection = ({ customers, selectCustomerCallback }) => {
  return (
    <div className="customer-group">
      {getCustomers(customers, selectCustomerCallback)}
    </div>
  )
}

const getCustomers = (customers, selectCustomerCallBack) => {
  return customers.map((customer) => {
    return <Customer
      key={customer.id}
      {...customer}
      selectCustomerCallback={selectCustomerCallBack}
    />
  });
}

CustomerCollection.propTypes = {
  customers: PropTypes.array,
  selectCustomerCallback: PropTypes.func,
};

export default CustomerCollection;


// class CustomerCollection extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       customers: props.customers,
//     }
//   }

//   makeCollection() {
//     const customerCollection = this.state.customers.map((customer, i ) => {
//       return <Customer
//       id={customer.id}
//       name={customer.name}
//       registered_at={customer.registered_at}
//       address= {customer.address}
//       city={customer.city}
//       state={customer.state}
//       postal_code={customer.postat_code}
//       account_credit={customer.account_credit}
//       key={i}
//       />;
//     }
//     );

//     return customerCollection
//   }

//   render () {
//     return (
//       <div className="customer-group">
//         {this.makeCollection()}
//       </div>
//     )
//   }
// };

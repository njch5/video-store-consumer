import axios from 'axios';
import React, { Component } from 'react';
import MovieCollection from './components/MovieCollection';
import CustomerCollection from './components/CustomerCollection';
// import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieCollection: [],
      customerCollection: [],
      error: '',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState({ movieCollection: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

  selectMovie = (movieId) => {
    const { movieCollection } = this.state;

    const currentMovie = movieCollection.find((movie) => {
      return movie.id === movieId;
    });
    this.setState({ currentMovie, });
  }

  componentDidMount() {
    axios.get('http://localhost:3000/customers')
    .then((response) => {
      this.setState({ customerCollection: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

  selectCustomer = (customerId) => {
    const { customerCollection } = this.state;

    const currentCustomer = customerCollection.find((customer) => {
      return customer.id === customerId;
    });
    this.setState({ currentCustomer, });
  }

  render() {
    return (
      
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">About</Link>
            </li>
            <li>
              <Link to="/library">Library</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
          </ul>
        </nav>

    <section className="movie-list-wrapper">
      <MovieCollection
        movies={this.state.movieCollection}
        selectMovieCallback={this.selectMovie}
      />
    </section>

    <section className="customer-list-wrapper">
      <CustomerCollection
        customers={this.state.customerCollection}
        selectCustomerCallback={this.selectCustomer}
      />
    </section>

    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            {/* <About /> */}
          </Route>
          <Route path="/users">
            {/* <Users /> */}
          </Route>
          <Route path="/">
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
}

export default App;

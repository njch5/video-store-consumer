import axios from 'axios';
import React, { Component } from 'react';
import CustomerCollection from './components/CustomerCollection';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import RentalDetails from './components/RentalDetails';
import Homepage from './components/Homepage';
import Alert from 'react-bootstrap/Alert';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieCollection: [],
      customerCollection: [],
      currentMovie: '',
      currentCustomer: '',
      searchMovie: undefined,
      movieResults: [],
      rentals: [],
      alertText: '',
      alertVariant: '',
    };
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

  selectMovie = (movieList, movieId) => {

    const currentMovie = movieList.find((movie) => {
      return movie.external_id === movieId;
    });
    
    this.setState({ currentMovie, });
  }

  selectCustomer = (customerId) => {
    const { customerCollection } = this.state;

    const currentCustomer = customerCollection.find((customer) => {
      return customer.id === customerId;
    });
    this.setState({ currentCustomer, });
  }

  filterMovies = (searchMovie) => {
    this.setState({
      searchMovie,
    });

    if (searchMovie !== ''){
        axios.get(`http://localhost:3000/movies?query=${searchMovie}`)
      
      .then((response) => {
        if (searchMovie === this.state.searchMovie) {
          this.setState({ movieResults: response.data });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });

    } else {
      this.setState({ movieResults: [] })
    }
  }

  addRental = (movie, customer) => {
    let tenDaysLater = new Date(
      new Date().getTime() + 10 * 24 * 60 * 60 * 1000
    );

    const queryParams = {
      customer_id: customer.id,
      due_date: tenDaysLater
    };

    axios
      .post(
        `http://localhost:3000/rentals/${movie.title}/check-out`,
        queryParams
      )
      .then(response => {
        console.log("Success!")
        this.setState({ 
          alertText: "Rental successfully created!",
          alertVariant: "success" 
        });
      })
      .catch(error => {
        console.log("FAILED!")
        this.setState({ 
          error: error.message,
          alertText: `An error occurred: ${error.message}`,
          alertVariant: "danger" 
        });
      });

    const newState = { currentCustomer: "", currentMovie: "" };
    this.setState(newState);
  };

  render() {
    const videoAlert = () => {
      return(
        <Alert 
          variant={this.state.alertVariant}
          onClose={() => this.setState({alertText: undefined, alertVariant: undefined})} 
          dismissible
        > 
          {this.state.alertText} 
        </Alert>
      )
    }
    // Returns the entire state
    // console.log(this.state);
    return (
      
    <main className="app">
      <header className="app-header">
        <h1>Cool Video Store</h1>
      </header>

      <section className="rental-details">
      <RentalDetails 
        currentCustomer={this.state.currentCustomer}
        currentMovie={this.state.currentMovie}
        addRentalCallback={this.addRental}
        />
      </section>

      <Router>
      {this.state.alertText ? videoAlert() : "" }
        <div>
          <section>
          <nav className="app-nav">
              <h5><strong><Link to="/">Home</Link></strong></h5>
              <h5><strong><Link to="/customers">Customers</Link></strong></h5>
              <h5><strong><Link to="/library">Library</Link></strong></h5>
              <h5><strong><Link to="/search">Search</Link></strong></h5>
          </nav>
          </section>

        <div className="main-routes">
        
        <Switch>
          
        <Route
          path="/search">
          <SearchBar
            movies={this.state.movieResults}
            searchChangeCallback={this.filterMovies}
            searchMovie={this.state.searchMovie}
          />
        </Route>
        <Route 
          path="/library">           
          <MovieList 

            selectMovieCallback={this.selectMovie}
          />
        </Route>
        <Route 
          path="/customers">
          <CustomerCollection
            customers={this.state.customerCollection}
            selectCustomerCallback={this.selectCustomer}
          />
        </Route>
        <Route
          path="/">
            <Homepage/>
        </Route>
        </Switch>
        </div>
      </div>
    </Router>
    </main>
  );
}
}

export default App;

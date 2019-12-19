import axios from 'axios';
import React, { Component } from 'react';
// import MovieCollection from './components/MovieCollection';
import CustomerCollection from './components/CustomerCollection';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Alert from 'react-bootstrap/Alert';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import RentalDetails from './components/RentalDetails';

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
    // axios.get('http://localhost:3000/movies')
    //   .then((response) => {
    //     this.setState({ movieCollection: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: error.message });
    //   });

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
        // this.componentDidMount();
      })
      .catch(error => {
        console.log("FAILED!")
        // console.log(error)
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

      <section>
      <RentalDetails 
        currentCustomer={this.state.currentCustomer}
        currentMovie={this.state.currentMovie}
        addRentalCallback={this.addRental}
        />
      </section>

      <Router>
      {this.state.alertText ? videoAlert() : "" }
        <div>
          <section className="app-nav">
          <nav>
              <p><Link to="/">Home</Link></p>
              <p><Link to="/search">Search</Link></p>
              <p><Link to="/library">Library</Link></p>
              <p><Link to="/customers">Customers</Link></p>
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
            // movies={this.state.movieCollection}

            selectMovieCallback={this.selectMovie}
            // addMovieCallback={this.addMovie}
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

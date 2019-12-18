import axios from 'axios';
import React, { Component } from 'react';
import MovieCollection from './components/MovieCollection';
import CustomerCollection from './components/CustomerCollection';
import SearchBar from './components/SearchBar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
// To add boostrap to it...
// import './custom.scss';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieCollection: [],
      customerCollection: [],
      selectMovie: '',
      selectCustomer: '',
      searchMovie: undefined,
      movieResults: [],
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

    axios.get('http://localhost:3000/customers')
      .then((response) => {
        this.setState({ customerCollection: response.data });
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

  addMovie = (movieToAdd) => {
    axios.post('http://localhost:3000/search', movieToAdd)

      .then((response) => {
        console.log(movieToAdd);
        console.log(response.data)

        const { movieResults } = this.state;
        movieResults.push(response.data)
        this.setState({
          movieResults,
          error: undefined,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    return (
    <main className="app">
      <header className="app-header">
        <h1>Cool Video Store</h1>
      </header>

      <Router>
        <div>
          <section className="app-nav">
          <nav>
              <p><Link to="/">Home</Link></p>
              <p><Link to="/search">Search</Link></p>
              <p><Link to="/library">Library</Link></p>
              <p><Link to="/customers">Customers</Link></p>
          </nav>
          </section>
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
          <MovieCollection 
            movies={this.state.movieCollection}
            selectMovieCallback={this.selectMovie}
            addMovieCallback={this.addMovie}
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
          {/* <About /> */}
        </Route>
        </Switch>
      </div>
    </Router>
    </main>
  );
}
}

export default App;

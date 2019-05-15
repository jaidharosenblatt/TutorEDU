import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Collection from './collection'
import BaseRouter from './routes';
import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar />
          <Collection>
            <BaseRouter />
          </Collection>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

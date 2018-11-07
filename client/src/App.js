import React, { Component } from 'react';

import LandingPage from './components/LandingPage';
import Paginator from './components/Paginator';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">  
       <LandingPage />
      </div>
    );
  }
}

export default App;

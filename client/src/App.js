import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './components/LandingPage';


import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">  
       <LandingPage />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

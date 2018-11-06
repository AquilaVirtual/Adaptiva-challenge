import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import '../css/LandingPage.css';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
         } 
    }    
   
     componentDidMount = () => {
         axios.get('https://picsum.photos/list')
         .then(response => {
             console.log("Getting some", response);
             this.setState({
                 photos: response.data[0]
             })
         })
         .catch(err => {
             console.log(err)
         })
     } 
    render() {
        return (
            <div className="landing-container">
            
        </div>)
    }
}

export default withRouter(LandingPage);

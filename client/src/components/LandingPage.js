import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import '../css/LandingPage.css';

const clientId = 'bfe7bd0e821b04117b1092ac6b6aca9f522330b06f367bebe2aa9b2b1514480d';

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
             const data = response.data.filter((element) => {
            return element.author === 'Alejandro Escamilla';
             })
             console.log("Getting some", response);
             this.setState({
                 photos: data
             })
             console.log("State here", this.state.photos);
         })
         .catch(err => {
             console.log(err)
         })
     } 
    render() {
        return (
            <div className="landing-container">
            {this.state.photos.map((element, i) => {
            return (
            <div key={i}>{element.author}</div>
            )
            })}
           
           My text
        </div>)
    }
}

export default withRouter(LandingPage);

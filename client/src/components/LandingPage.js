import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Modal from './Modal';

import '../css/LandingPage.css';

const clientId = 'bfe7bd0e821b04117b1092ac6b6aca9f522330b06f367bebe2aa9b2b1514480d';
const endpoint = 'https://api.unsplash.com/users/AlejandroEscamilla/photos/?client_id=';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            isModalOpen: false,
            index: 0,
         } 
    }   

    enlarge = () => {

    }   
     componentDidMount = () => {
         axios.get('https://picsum.photos/list')
         .then(response => {
             var data = [];
             var photos = [];
             data = response.data.filter((element) => {
            return element.author === 'Alejandro Escamilla';
              })        
        console.log("State here", data);
        axios.get(`${endpoint}${clientId}`)
            .then(response => {
                console.log("Dumb", response)
                this.setState({
                    photos: response.data
                })           
             })

             console.log("Getting some", response);
             this.setState({
                //  photos: data
             })
         })
         .catch(err => {
             console.log(err)
         })
     } 

     openModal() {
        this.setState({ isModalOpen: true })
      }
    
      closeModal() {
        this.setState({ isModalOpen: false })
      }
    
    render() {
        return (
            <div className="landing-container">
             
            {this.state.photos.map((element, i) => {
            return (
                <div key={i}>         
          {}
          <Modal 
      
           noBackdrop={true} 
           isOpen={this.state.isModalOpen} 
           onClose={() => this.closeModal()}
          >
          <img alt="" src={`${element.urls.full}`} height="700" width="1000" />
          </Modal>
          <div className="cards"key={i} onClick={() => this.openModal()}>{<img alt="" src={element.urls.full} height="250" width="300"/>}</div>
          </div>
            )
            })}           
      
        </div>)
    }    
}

export default withRouter(LandingPage);

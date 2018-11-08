import React, { Component } from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import PropTypes from 'prop-types';
import axios from 'axios';

import Modal from './Modal';

import '../css/LandingPage.css';
//ClientId is left public intentionally
const clientId = 'bfe7bd0e821b04117b1092ac6b6aca9f522330b06f367bebe2aa9b2b1514480d';
const endpoint = 'https://api.unsplash.com/users/AlejandroEscamilla/photos/?client_id=';

class LandingPage extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            isModalOpen: false,
            index: 0,
            currentPhoto: 1,
            src: '',
            currentImg: '',
              } 
             }   
        handlePageChange = page => {
            this.setState({
                currentPhoto: page
            });
        };         
       componentDidMount = () => {
         axios.get('https://picsum.photos/list') //For future use when app is properly working
         .then(response => {
             var data = [];          
             data = response.data.filter((element) => {
            return element.author === 'Alejandro Escamilla';
              })        
        console.log("State here", data);
        axios.get(`${endpoint}${clientId}`)
            .then(response => {
                console.log("Dumbi", response)
                this.setState({
                    photos: response.data
                })           
             })
             console.log("Getting some", response);
             this.setState({           
                })
               })
            .catch(err => {
                console.log(err)
               })        
            }         
    handleOpen = img => {
        this.setState({ isModalOpen: true, currentImg: img });
        console.log("Hi")
      };
      closeModal() {
        this.setState({ isModalOpen: false })
      }
      render() {
        let imageListContent;
        const { photos } = this.state;
        if(photos) {
            imageListContent = (
            <GridList cols={3}> 
             {photos.map((img,i) => (                 
             <GridTile  key={i}
             onClick={() => this.handleOpen(img.urls.full)}
            > 
            <img src={img.urls.full} alt="" /> 
            </GridTile>              
                      
            ))}          
       </GridList>
        );
       } else {
        imageListContent = null;
         }          
        return (
          <div className="landing-container">  
          {/* <Carousel photos={this.state.photos}/> */}
        {imageListContent}   
   
      <Modal photos={this.state.photos}          
         noBackdrop={true} 
        isOpen={this.state.isModalOpen} 
        onClose={() => this.closeModal()}  >
        <img alt=""  src={this.state.currentImg} height="700" width="1000" />
       </Modal>
        </div>
        );
      }    
    }
    LandingPage.propTypes = {
        images: PropTypes.array.isRequired
    };
    export default LandingPage;

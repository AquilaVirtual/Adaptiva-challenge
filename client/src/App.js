
import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from 'axios';
import './css/App.css'
//ClientId is left public intentionally
const clientId = 'bfe7bd0e821b04117b1092ac6b6aca9f522330b06f367bebe2aa9b2b1514480d';
const endpoint = 'https://api.unsplash.com/users/AlejandroEscamilla/photos/?client_id=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrls: [],
       currentIndex: null
       };
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
  }
  componentDidMount = () => {
    axios.get('https://picsum.photos/list') //For future use when app is properly working
    .then(response => {
        var data = [];          
        data = response.data.filter((element) => {
       return element.author === 'Alejandro Escamilla';
         })        
   console.log("State here", data);
   let temp = [];
   axios.get(`${endpoint}${clientId}`)
       .then(response => {
           console.log("Dumbi", response.data)
           console.log("What's on state", this.state.imgUrls)
           response.data.forEach(item => {
             temp.push(item.urls.full);
           })
           this.setState({
            imgUrls: temp
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
  renderImageContent(src, index) {
    return (
      <div onClick={(e) => this.openModal(e, index)}>
        <img src={src} alt="" key={src} />
      </div>
    ) 
  }
  openModal(e, index) {
    this.setState ({ currentIndex: index });
  }
  closeModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState ({ currentIndex: null });
  }
  findPrev(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex -1
    }));
  }
  findNext(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }
  render() {
    return (
      <div className="gallery-container"> 
      <div className="gallery-header">Adaptiva Challenge</div>    
        <div className="gallery-grid">
          {this.state.imgUrls.map(this.renderImageContent)}
        </div>
        <Modal 
          closeModal={this.closeModal} 
          findPrev={this.findPrev} 
          findNext={this.findNext} 
          hasPrev={this.state.currentIndex > 0} 
          hasNext={this.state.currentIndex + 1 < this.state.imgUrls.length} 
          src={this.state.imgUrls[this.state.currentIndex]} 
        />
      </div>
    )
  }
}
export default App;

import React, { Component } from 'react';
import Swipeable from 'react-swipeable';
import '../css/Modal.css';

const IMG_1 = `https://unsplash.it/342/249`;
const IMG_2 = `https://unsplash.it/342/250`;
const IMG_3 = `https://unsplash.it/342/251`;
const IMG_4 = `https://unsplash.it/342/252`;
const IMG_5 = `https://unsplash.it/342/253`;
const IMAGES = [IMG_1, IMG_2, IMG_3, IMG_4, IMG_5];

const IMG_WIDTH = "342px";
const IMG_HEIGHT = "703px";


const RIGHT = '-1';
const LEFT = '+1';

const buttonStylesLeft = {
  height: IMG_HEIGHT,
  fontSize: "2.3em",
  position: "absolute",
  background: "transparent",
  border: "none",
  color: "white"
 
};
const buttonStylesRight = {
    marginleft: "105px",
    float: "right",
    fontSize: "2.3em",
    border: "none",
    height: IMG_HEIGHT,
    background: "transparent",
    color: "white"     
   };

class Modal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { 
            imageIdx: 0,
            photos: [],
        };
      }
       componentDidMount = () => {
          console.log("Trying to set state")
          this.setState({
              photos: this.props.photos
          })
       }

    onSwiped(direction) {    
        const change = direction === RIGHT ? RIGHT : LEFT;
        console.log("which", change);
        const adjustedIdx = this.state.imageIdx + Number(change);
        let newIdx;
        if (adjustedIdx >= this.props.photos.length) {
          newIdx = 0;
        } else if (adjustedIdx < 0) {
          newIdx = this.props.photos.length - 1
        } else {
          newIdx = adjustedIdx;
        }
        this.setState({ imageIdx: newIdx });
        let im = this.props.photos[0].urls.small;
         console.log("All of them", this.props.photos)
      }

    render() {
        const { imageIdx = 0 } = this.state;
        const imageStyles = {
          width: IMG_WIDTH,
          height: IMG_HEIGHT, 
          backgroundImage: `url(${IMAGES[imageIdx]})`
        };
      if (this.props.isOpen === false)
        return null
  
      let modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '9999%',
        background: '#fff',
        border: '1px solid gray',
        boxShadow: '4px 4px 25px 1px #888888',
        borderRadius: '2px'
      }
      
      let modalHeaderStyle = {
        width: '100%',
        height: 40,
      
        position: 'absolute',      
        top: 0,
        cursor: 'move',
        color: 'white',
        marginright: 40,       
       
      }
      
      let modalFooterStyle = {
        width: '100%',
        height: 40,        
        position: 'absolute',
        bottom: 0,
        textAlign: 'right'
      }
      
      let modalBodyStyle = {   
        background: '#242424',
        height: '80%',
        color: 'white'
      }      

      if (this.props.width && this.props.height) {
        modalStyle.width = this.props.width + 'px'
        modalStyle.height = this.props.height + 'px'    
         modalStyle.transform = null
      }
  
      if (this.props.style) {
        for (let key in this.props.style) {
          modalStyle[key] = this.props.style[key]
        }
      }
  
      let backdropStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        left: '0px',
        zIndex: '9998',
        background: 'rgba(0, 0, 0, 0.1)'
      }
  
      if (this.props.backdropStyle) {
        for (let key in this.props.backdropStyle) {
          backdropStyle[key] = this.props.backdropStyle[key]
        }
      }
  
      return ( 
          <div className="mother">        
        <Swipeable 
          className="swipe"
          trackMouse
          style={{ touchAction: 'none' }}
          preventDefaultTouchmoveEvent
          onSwipedLeft={()=>this.onSwiped(LEFT)}
          onSwipedRight={()=>this.onSwiped(RIGHT)}
        >
          <div style={imageStyles} >           
          </div>
        </Swipeable>  
        


        <div className={this.props.containerClassName}>        
          <div className={this.props.className} style={modalStyle}>
          {/* Left button here */}
          <button
              onClick={()=>this.onSwiped(LEFT)}     
              style={buttonStylesLeft} >⇦</button>          
            <div className={"modalHeader"} style={modalHeaderStyle}>
              <div onClick={e => this.close(e)}  className={"close-thin"}></div>              
            </div>
            <div className={"modalHeader"} style={modalHeaderStyle}>
            {/* Right button here */}
            <button
              onClick={()=>this.onSwiped(RIGHT)}     
              style={buttonStylesRight}>⇨</button> 
            </div>
            <div className={"modalBody"} style={modalBodyStyle}>
            {this.props.children}
            </div>           
            <div  style={modalFooterStyle}>
               <div onClick={(e) => this.close(e)} ></div>        
            </div>
            
            <div className={"modalFooter"} style={modalFooterStyle}>
               <div onClick={(e) => this.close(e)} className='mm-close'>Close</div>
            </div>
          </div>
          {!this.props.noBackdrop &&
              <div className={this.props.backdropClassName} style={backdropStyle}
                onClick={e => this.close(e)}/>}                   
        </div>        
        </div>        
      )
    }
  
    close(e) {
      e.preventDefault();  
      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }

  export default Modal;
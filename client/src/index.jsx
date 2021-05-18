import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery';
import _ from 'lodash'
import Carousel from './components/carousel.jsx';
import Modal from './components/modal.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  tonight () {
    //nothing
  }

  render() {
    return (
    <div>
      <h1>Photogallery</h1>
      {/* <Carousel /> */}
      <div style={{position: 'relative', overflow: 'hidden'}}>
      <div className='images' style={{maxWidth: '98%', maxHeight: '20%', overflow: 'hidden'}}>
      <img className='1' src="https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg" onClick={() => this.showModal()} width="400" height="250" style={{float: 'left', paddingRight: '8px'}}/>
      <img src="https://annebonny.s3-us-west-1.amazonaws.com/photo-1486915309851-b0cc1f8a0084.jpeg" onClick={() => this.showModal()} width="400" height="250" style={{float: 'left', paddingRight: '8px'}}/>
      <img src="https://annebonny.s3-us-west-1.amazonaws.com/photo-1478131143081-80f7f84ca84d.jpeg" onClick={() => this.showModal()} width="400" height="250" style={{float: 'left', paddingRight: '8px', position: 'absolute', display: 'inline'}}/>
     </div>
    </div>
      <Modal show={this.state.show} onClose={() => this.showModal()}/>
    </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
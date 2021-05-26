import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery';
import _ from 'lodash'
import Carousel from './components/carousel.jsx';
import Modal from './components/modal.jsx';
import Images from './components/images.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: '',
      firstThreeImages: ''
    }
    this.showModal = this.showModal.bind(this);
  }

  getData() {
    axios.get('/photogallery', {
      params: {
        campId: 5
      }
    })
      .then((response) => {
        this.setState({
          data: response.data,
          firstThreeImages: [response.data[0].imageUrl[0], response.data[1].imageUrl[0], response.data[2].imageUrl[0]]
        })
      })
      // .then((results) => {
      //   console.log(this.state.data)
      // })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getData()
  }




  showModal() {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  render() {
    return (
      <div>
        <h1>HipCamp</h1>
        {/* <Carousel /> */}
        {/* <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div className='images' style={{ maxWidth: '98%', maxHeight: '20%', overflow: 'hidden' }}>
            <img className='1' src={this.state.data[0]} onClick={() => this.showModal()} width="400" height="250" style={{ float: 'left', paddingRight: '8px' }} />
            <img src={this.state.data[1]} onClick={() => this.showModal()} width="400" height="250" style={{ float: 'left', paddingRight: '8px' }} />
            <img src={this.state.data[2]} onClick={() => this.showModal()} width="400" height="250" style={{ float: 'left', paddingRight: '8px', position: 'absolute', display: 'inline' }} />
          </div>
        </div> */}
        {this.state.data.length > 0 &&
        <Images data={this.state.data} showModal={this.showModal}/>
        }
        {this.state.data.length > 0 &&
        <Modal show={this.state.show} data={this.state.data} onClose={() => this.showModal()} />
        }
      </div>
    )
  }

}

ReactDOM.render(<App />, document.getElementById('photogallery'));
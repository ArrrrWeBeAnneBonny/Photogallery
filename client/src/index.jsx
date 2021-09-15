import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery';
import _ from 'lodash'
import Carousel from './components/carousel.jsx';
import Modal from './components/modal.jsx';
import Images from './components/images.jsx';
import axios from 'axios';
import css from '/Users/michaelgallien/HackReactor/FEC/photogallery/client/dist/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: '',
      location: {name: 'Pirate Bay, CA', address: '1234 Get Outta Here ln'},
      images: '',
      startingImageIndex: ''
    }
    this.showModal = this.showModal.bind(this);
  }
  // for Docker
  // 'http://ec2-54-183-90-91.us-west-1.compute.amazonaws.com/photogallery'
  // For Local
  // '/photogallery'
  getData(campSite) {
    axios.get('/photogallery', {
      params: {
        campId: campSite
      }
    })
      .then((response) => {
        let imgArray = [];
        for (var i = 0; i < response.data.length; i++) {
          for (var j = 0; j < response.data[i].imageUrl.length; j++) {
            imgArray.push(response.data[i].imageUrl[j]);
          }
        }
        this.setState({
          data: response.data,
          images: imgArray
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // For Docker
  // http://ec2-35-163-3-32.us-west-2.compute.amazonaws.com/overview/location'
  // For Local
  // 'http://127.0.0.1:3003/overview/location'
  getLocation(campSite) {
    axios.get('http://127.0.0.1:3003/overview/location', {
      params: {
        campId: campSite
      }
    })
      .then((response) => {
        this.setState({
          location: response.data
          // location: 'Pirate Bay, CA'
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const campSite = urlParams.get('campId');
    this.getData(campSite)
    // this.getLocation(campSite);
  }

  showStatingImage(e) {
    console.log(this.state.startingImageIndex)
    this.setState(({
      startingImageIndex: Number(e.target.name)
    }));
  }

  showModal() {
    console.log(this.state.show)
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  bothFunctions(e) {
    this.showStatingImage(e);
    this.showModal()
  }

  // showModal={(e) => {this.showStatingImage(e); this.showModal}
  // onClose={(e) => {this.showStatingImage(e); this.showModal}}
  render() {
    return (
      <div>
        {this.state.data.length > 0 &&
        <Images data={this.state.images} showModal={(e) => {this.bothFunctions(e)}}/>
        }
        {this.state.data.length > 0 &&
        <Modal show={this.state.show} data={this.state.data} location={this.state.location} onClose={(e) => {this.bothFunctions(e)}} image={this.state.startingImageIndex} />
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('photogallery'));
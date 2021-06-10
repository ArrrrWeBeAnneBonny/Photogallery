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
      location: '',
      images: '',
      startingImageIndex: ''
    }
    this.showModal = this.showModal.bind(this);
  }
  // for Docker
  // 'http://ec2-54-183-90-91.us-west-1.compute.amazonaws.com/photogallery'
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
      // .then((results) => {

      // })
      .catch(function (error) {
        console.log(error);
      })
  }

  // 'http://127.0.0.1:3003/overview/location'
  getLocation(campSite) {
    axios.get('http://ec2-35-163-3-32.us-west-2.compute.amazonaws.com/overview/location', {
      params: {
        campId: campSite
      }
    })
      .then((response) => {
        this.setState({
          location: response.data
        })
      })
      // .then((results) => {
      //   console.log(this.state.location)
      // })
      .catch(function (error) {
        console.log(error);
      })
  }
  popImages() {
    let imgArray = [];
    for (var i = 0; i < this.props.data.length; i++) {
      for (var j = 0; j < this.props.data[i].imageUrl.length; j++) {
        imgArray.push(this.props.data[i].imageUrl[j]);
      }
    }
    this.setState({
      images: imgArray
    })
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const campSite = urlParams.get('campId');
    this.getData(campSite)
    this.getLocation(campSite);
  }

  showModal(e) {
    this.setState(prevState => ({
      show: !prevState.show,
      startingImageIndex: Number(e.target.name)
    }));
    console.log(e.target.name)
  }

  render() {
    return (
      <div>
        {this.state.data.length > 0 &&
        <Images data={this.state.images} showModal={(e) => {this.showModal(e)}}/>
        }
        {this.state.data.length > 0 &&
        <Modal show={this.state.show} data={this.state.data} location={this.state.location} onClose={(e) => this.showModal(e)} image={this.state.startingImageIndex} />
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('photogallery'));
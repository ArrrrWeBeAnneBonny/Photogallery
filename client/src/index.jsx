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
      images: ''
    }
    this.showModal = this.showModal.bind(this);
  }

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

  getLocation(campSite) {
    axios.get('http://127.0.0.1:3003/overview/location', {
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

  showModal() {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  render() {
    return (
      <div>
        <h1>HipCamp</h1>
        {this.state.data.length > 0 &&
        <Images data={this.state.images} showModal={this.showModal}/>
        }
        {this.state.data.length > 0 &&
        <Modal show={this.state.show} data={this.state.data} location={this.state.location} onClose={() => this.showModal()} />
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('photogallery'));
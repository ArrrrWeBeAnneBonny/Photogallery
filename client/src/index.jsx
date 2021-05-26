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
        this.setState({
          data: response.data
        })
      })
      .then((results) => {
        console.log(this.state.data)
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
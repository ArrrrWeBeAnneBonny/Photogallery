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
<<<<<<< Updated upstream
=======
      data: '',
      location: '',
      images: ''
>>>>>>> Stashed changes
    }
    this.showModal = this.showModal.bind(this);
  }

<<<<<<< Updated upstream
=======
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

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
      <div>
        <h1>HipCamp</h1>
        {this.state.data.length > 0 &&
        <Images data={this.state.images} showModal={this.showModal}/>
        }
        {this.state.data.length > 0 &&
        <Modal show={this.state.show} data={this.state.data} location={this.state.location} onClose={() => this.showModal()} />
        }
      </div>
>>>>>>> Stashed changes
    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
import React from 'react';
import $ from 'jquery';
import Modal2 from './modal2.jsx';


const Arrow = ({ direction, clickFunction, glyph }) => (
	<div
		className={`slide-arrow ${direction}`}
		onClick={clickFunction}>
		{ glyph}
	</div>
);

const ImageSlide = (url) => {
	const styles = {
		backgroundImage: `url(${url})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	};

	return (
		<div className="image-slide" style={styles}></div>
	);
}

class Carousel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentImageIndex: props.image,
			images: null,
			location: props.location,
			show2: false
		};

		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
		this.showModal2 = this.showModal2.bind(this);
	}
	previousSlide() {
		// console.log(this.state.currentImageIndex)
		const lastIndex = this.state.images.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

		this.setState({
			currentImageIndex: index
		});
	}

	nextSlide() {
		// console.log(this.state.currentImageIndex)
		const lastIndex = this.state.images.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index = shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
	}

	popImages() {
		let imgArray = [];
		for (var i = 0; i < this.props.data.length; i++) {
			for (var j = 0; j < this.props.data[i].imageUrl.length; j++) {
				imgArray.push([this.props.data[i].imageUrl[j], this.props.data[i].userName, this.props.data[i].userImg, this.props.data[i].created, this.props.data[i].helpfulness[j], this.props.data[i].caption[j]]);
			}
		}
		this.setState({
			images: imgArray
		})
	}

	addLikes(j) {
		// this.setState(prevState => {
		// 	return {images: prevState.images[currentImageIndex][4] + 1}
		//  })
		//  this.setState(state => {
		// 	const list = state.list.map((item, j) => {
		// 	  if (j === i) {
		// 		return item + 1;
		// 	  } else {
		// 		return item;
		// 	  }
		// 	});
	   
		// 	return {
		// 	  list,
		// 	};
		//   });

		var newValue = this.state.images[this.state.currentImageIndex][4] + 1;
		console.log(newValue);
	}

	showModal2() {
		this.setState(prevState => ({
		  show2: !prevState.show2,
		}));
	  }

	bothLeft(e) {
		this.previousSlide()
		e.stopPropagation()
	}

	bothRight(e) {
		this.nextSlide()
		e.stopPropagation()
	}

	componentWillMount() {
		this.popImages();
	}

	render() {
		// console.log(this.state.images)
		return (
			<div className="carousel" onClick={this.props.onClick}>
				<div className='modal-header' onClick={e => e.stopPropagation()} style={{marginTop: '20px !important', paddingBottom: '15px', position: 'relative', top: '5%', left: '23%'}}>
					<img src={this.state.images[this.state.currentImageIndex][2]} className='avatar-gallery' width='30px' height='30px' style={{ borderRadius: '50%' }}></img>
					<div style={{ display: 'inline-block'}}>
						<div className='userName' style={{ paddingLeft: '3px', paddingBottom: '-10 !important', marginTop: '0 !important', fontSize: '1em', fontWeight: '400', color: 'white' }}>{this.state.images[this.state.currentImageIndex][1]}</div>
						<div style={{ paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '-10 !important', fontSize: '9px', color: '#5c5c5c' }}>{this.state.images[this.state.currentImageIndex][3]}</div>
					</div>
					<div>
					<button id="button" style={{display: 'inline', position: 'absolute', top: '15%', right:'50%', textAlign:'right'}} onClick={this.showModal2}>
                    	<i className={"far fa-thumbs-up"} style={{display: 'inline', position: 'absolute', top: '30%', right:'41px'}}></i> Helpful {this.state.images[this.state.currentImageIndex][4]}
                    </button>
					<a href="https://www.pinterest.com/" target="_blank"><i className="fab fa-pinterest" style={{display: 'inline', position: 'absolute', top: '55%', right:'55%', textAlign:'right', color: 'white', fontSize: '10px'}}></i></a>
					<a href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook" style={{display: 'inline', position: 'absolute', top: '55%', right:'53.5%', textAlign:'right', color: 'white', fontSize: '10px'}}></i></a>
					<a href="https://twitter.com/" target="_blank"><i className="fab fa-twitter" style={{display: 'inline', position: 'absolute', top: '55%', right:'52%', textAlign:'right', color: 'white', fontSize: '10px'}}></i></a>
					<a href="https://hipcamp.com" target="_blank"><i className="fas fa-link" style={{display: 'inline', position: 'absolute', top: '55%', right:'50.5%', textAlign:'right', color: 'white', fontSize: '10px'}}></i></a>
					</div>
					<div style={{ paddingLeft: '3px', fontSize: '9px', paddingBottom: '5px', marginTop: '0 !important',color: 'white' }}><div className="material-icons" style={{fontSize: '10px'}}>place</div>{this.state.location.name}, {this.state.location.address}</div>
				</div>
				{/* <Arrow direction="left" clickFunction={this.previousSlide} glyph="&#9664;" /> */}
				<i className={"fas fa-chevron-left hvr-grow"} onClick={(e)=> {this.bothLeft(e)}} style={{zIndex:'100px', fontSize: '20px', color: 'white', position: 'absolute', left: '0px', top: '50%'}}></i>
				{/* <button><i className={"fas fa-chevron-left"}></i></button> */}
				<Modal2 show2={this.state.show2}  onClose2={this.showModal2} />
				<img onClick={e => e.stopPropagation()} src={this.state.images[this.state.currentImageIndex][0]} align='center' style={{marginBottom: '0 !important', objectFit: 'contain', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '60%', height: '400px'}}></img>
				{/* <Arrow direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />  */}
				<i className={"fas fa-chevron-right hvr-grow"} onClick={(e)=> {this.bothRight(e)}} style={{fontSize: '20px', color: 'white', fontWeight: 'bold', position: 'absolute', right: '0px', top: '50%'}}></i>
				<div className='modal-footer' onClick={e => e.stopPropagation()} style={{}}>
					<p style={{ fontSize: '15px', textAlign: 'center', color: 'white', marginTop: '0 !important' }}>{this.state.images[this.state.currentImageIndex][5]}</p>
				</div>
			</div>
		);
	}
}

export default Carousel;
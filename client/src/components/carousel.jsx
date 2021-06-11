import React from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/fontawesome-free-solid';


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
			location: props.location
		};

		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
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



	componentWillMount() {
		this.popImages();
	}

	render() {
		return (
			<div className="carousel">
				<div className='modal-header' style={{marginTop: '0 !important', paddingBottom: '15px', position: 'relative'}}>
					<img src={this.state.images[this.state.currentImageIndex][2]} className='avatar-gallery' width='30px' height='30px' style={{ borderRadius: '50%' }}></img>
					<div style={{ display: 'inline-block' }}>
						<div className='userName' style={{ paddingLeft: '3px', paddingBottom: '-10 !important', marginTop: '0 !important', fontSize: '1.6em', fontWeight: '400', color: 'white' }}>{this.state.images[this.state.currentImageIndex][1]}</div>
						<div style={{ paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '-10 !important', fontSize: '9px', color: '#5c5c5c' }}>{this.state.images[this.state.currentImageIndex][3]}</div>
					</div>
					<button id="button">
                    	<i className={"far fa-thumbs-up"} style={{display: 'inline'}}></i> Helpful {this.state.images[this.state.currentImageIndex][4]}
                    </button>
					<div style={{ paddingLeft: '3px', fontSize: '9px', paddingBottom: '5px', marginTop: '0 !important',color: 'white' }}><div className="material-icons" style={{fontSize: '10px'}}>place</div>{this.state.location.name}</div>
				</div>
				{/* <Arrow direction="left" clickFunction={this.previousSlide} glyph="&#9664;" /> */}
				<i className={"fas fa-chevron-left hvr-grow"} onClick={this.previousSlide} style={{fontSize: '20px', color: 'white', position: 'absolute', left: '0px', top: '50%'}}></i>
				{/* <button><i className={"fas fa-chevron-left"}></i></button> */}
				<img src={this.state.images[this.state.currentImageIndex][0]} height='400px' widght='300px' align='center' style={{ marginBottom: '0 !important', objectFit: 'cover'}}></img>
				{/* <Arrow direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />  */}
				<i className={"fas fa-chevron-right hvr-grow"} onClick={this.nextSlide} style={{fontSize: '20px', color: 'white', fontWeight: 'bold', position: 'absolute', right: '0px', top: '50%'}}></i>
				<div className='modal-footer'>
					<p style={{ fontSize: '15px', textAlign: 'center', color: 'white', marginTop: '0 !important' }}>{this.state.images[this.state.currentImageIndex][5]}</p>
				</div>
			</div>
		);
	}
}

export default Carousel;
import React from 'react';
import $ from 'jquery';

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
				<span className='modal-header' style={{marginTop: '0 !important', paddingBottom: '15px', position: 'relative'}}>
					<img src={this.state.images[this.state.currentImageIndex][2]} className='avatar-gallery' width='30px' height='30px' style={{ borderRadius: '50%' }}></img>
					<div style={{ display: 'inline-block' }}>
						<div className='userName' style={{ paddingLeft: '3px', paddingBottom: '-10 !important', marginTop: '0 !important', fontSize: '1.6em', color: 'white' }}>{this.state.images[this.state.currentImageIndex][1]}</div>
						<div style={{ paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '-10 !important', fontSize: '9px', color: '#5c5c5c' }}>{this.state.images[this.state.currentImageIndex][3]}</div>
					</div>
					<div style={{ paddingLeft: '3px', fontSize: '9px', paddingBottom: '5px', marginTop: '0 !important',color: 'white' }}><div className="material-icons">place</div>{this.state.location.name}</div>
				</span>
				<Arrow direction="left" clickFunction={this.previousSlide} glyph="&#9664;" />
				<img src={this.state.images[this.state.currentImageIndex][0]} height='350px' widght='250px' align="center" style={{ marginBottom: '0 !important', objectFit: 'cover' }}></img>
				<Arrow direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />
				<div className='modal-footer'>
					<p align="center" style={{ fontSize: '10px', textAlign: 'center', color: 'white', marginTop: '0 !important' }}>{this.state.images[this.state.currentImageIndex][5]}</p>
				</div>
			</div>
		);
	}
}

export default Carousel;
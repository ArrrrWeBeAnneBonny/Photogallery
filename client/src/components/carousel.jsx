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
			currentImageIndex: 0,
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
		console.log('image state: ' + this.state.images)
		return (
			<div className="carousel">
				<div className='modal-header'>
					<img src={this.state.images[this.state.currentImageIndex][2]} className='avatar' width='30px' height='30px' style={{ borderRadius: '50%' }}></img>
					<div style={{ display: 'inline-block' }}>
						<h4 className='userName' style={{ paddingLeft: '3px', paddingBottom: '-10 !important', marginTop: '0 !important', fontSize: '1.6em', color: 'white' }}>{this.state.images[this.state.currentImageIndex][1]}</h4>
						<h5 style={{ paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '-10 !important', fontSize: '9px', color: '#5c5c5c' }}>{this.state.images[this.state.currentImageIndex][3]}</h5>
					</div>
					<h5 style={{ paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '0 !important', fontSize: '9px', color: 'white' }}><i className="material-icons">place</i>{this.state.location.name}</h5>
				</div>
				<Arrow direction="left" clickFunction={this.previousSlide} glyph="&#9664;" />
				<img src={this.state.images[this.state.currentImageIndex][0]} height='350px' widght='250px' align="center" style={{ marginBottom: '0 !important' }}></img>
				<Arrow direction="right" clickFunction={this.nextSlide} glyph="&#9654;" />
				<div className='modal-footer'>
					<p style={{ fontSize: '10px', textAlign: 'center', color: 'white', marginTop: '0 !important' }}>{this.state.images[this.state.currentImageIndex][5]}</p>
				</div>
			</div>
		);
	}
}

export default Carousel;
import React from 'react';
import $ from 'jquery';

const imgUrls = [
	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg", 
	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1486915309851-b0cc1f8a0084.jpeg",
    'https://annebonny.s3-us-west-1.amazonaws.com/photo-1478131143081-80f7f84ca84d.jpeg',
	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1532339142463-fd0a8979791a.jpeg",
	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1517824806704-9040b037703b.jpeg",
	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1523987355523-c7b5b0dd90a7.jpeg"
];

const Arrow = ({ direction, clickFunction, glyph }) => (
	<div 
		className={ `slide-arrow ${direction}` } 
		onClick={ clickFunction }>
		{ glyph } 
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
	constructor (props) {
		super(props);
		
		this.state = {
<<<<<<< Updated upstream
			currentImageIndex: 0
=======
			currentImageIndex: 0,
			images: null,
			location: props.location
>>>>>>> Stashed changes
		};
		
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
	}
<<<<<<< Updated upstream
	
	previousSlide () {
        console.log(this.state.currentImageIndex)
		const lastIndex = imgUrls.length - 1;
=======

	previousSlide() {
		// console.log(this.state.currentImageIndex)
		const lastIndex = this.state.images.length - 1;
>>>>>>> Stashed changes
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
		
		this.setState({
			currentImageIndex: index
		});
	}
<<<<<<< Updated upstream
	
	nextSlide () {
        console.log(this.state.currentImageIndex)
		const lastIndex = imgUrls.length - 1;
=======

	nextSlide() {
		// console.log(this.state.currentImageIndex)
		const lastIndex = this.state.images.length - 1;
>>>>>>> Stashed changes
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
	}
<<<<<<< Updated upstream
	
	render () {
		return (
			<div className="carousel">
				<Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
				{/* <ImageSlide url={ imgUrls[0] } /> */}
                {/* <div style={{backgroundImage:"https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg"}}></div> */}
                <img src={imgUrls[this.state.currentImageIndex]} height='400px' widght='300px' class="center" style={{marginBottom: '0 !important'}}></img>
				<Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
=======

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
		// console.log(imgArray);
		// return imgArray;
	}

	componentWillMount() {
		// let test = this.popImages()
		// this.setState({
		// 	images: test
		// })
		// console.log(this.props.data)
		this.popImages();
	}

	render() {
		// console.log(this.state.images)
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
>>>>>>> Stashed changes
			</div>
		);
	}
}

export default Carousel;
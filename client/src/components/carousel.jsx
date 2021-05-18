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
			currentImageIndex: 0
		};
		
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
	}
	
	previousSlide () {
        console.log(this.state.currentImageIndex)
		const lastIndex = imgUrls.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
		
		this.setState({
			currentImageIndex: index
		});
	}
	
	nextSlide () {
        console.log(this.state.currentImageIndex)
		const lastIndex = imgUrls.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
	}
	
	render () {
		return (
			<div className="carousel">
				<Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
				{/* <ImageSlide url={ imgUrls[0] } /> */}
                {/* <div style={{backgroundImage:"https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg"}}></div> */}
                <img src={imgUrls[this.state.currentImageIndex]} height='400px' widght='300px' class="center" style={{marginBottom: '0 !important'}}></img>
				<Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
			</div>
		);
	}
}

export default Carousel;
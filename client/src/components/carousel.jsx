import React from 'react';
import $ from 'jquery';

// const imgUrls = [
// 	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg", 
// 	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1486915309851-b0cc1f8a0084.jpeg",
//     'https://annebonny.s3-us-west-1.amazonaws.com/photo-1478131143081-80f7f84ca84d.jpeg',
// 	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1532339142463-fd0a8979791a.jpeg",
// 	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1517824806704-9040b037703b.jpeg",
// 	"https://annebonny.s3-us-west-1.amazonaws.com/photo-1523987355523-c7b5b0dd90a7.jpeg"
// ];


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
			currentImageIndex: 0,
			images: props.images
		};
		
		this.nextSlide = this.nextSlide.bind(this);
		this.previousSlide = this.previousSlide.bind(this);
	}
	
	previousSlide () {
		// imgUrls.length <--- instead of state.images
        // console.log(this.state.currentImageIndex)
		const lastIndex = this.props.data.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === 0;
		const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
		
		this.setState({
			currentImageIndex: index
		});
	}
	
	nextSlide () {
        // console.log(this.state.currentImageIndex)
		const lastIndex = this.props.data.length - 1;
		const { currentImageIndex } = this.state;
		const shouldResetIndex = currentImageIndex === lastIndex;
		const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

		this.setState({
			currentImageIndex: index
		});
	}

	componentDidMount() {
		// console.log(this.props)
	}
	
	render () {
		return (
			
			<div className="carousel">
				<div className='modal-header'>
                    <img src="https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg" className='avatar' width='30px' height='30px' style={{borderRadius:'50%'}}></img>
                    <div style={{display: 'inline-block'}}>
                    <h4 style={{paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '0 !important', color: 'white'}}>{this.props.data[this.state.currentImageIndex].userName}</h4>
                    <h5 style={{paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '0 !important', fontSize: '9px', color: 'white'}}>{this.props.data[this.state.currentImageIndex].created}</h5>
                    </div>
                    <h5 style={{paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '0 !important', fontSize: '9px', color: 'white'}}>Location Goes Here</h5>
                </div>
                {/* <div className='modal-body' style={{margin: 'auto', width: '80%'}} width='60%' height='50%'></div> */}
				<Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
				{/* <ImageSlide url={ imgUrls[0] } /> */}
                {/* <div style={{backgroundImage:"https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg"}}></div> */}
                <img src={this.props.data[this.state.currentImageIndex].imageUrl} height='350px' widght='250px' align="center" style={{marginBottom: '0 !important'}}></img>
				<Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
				<div className='modal-footer'>
                    <p style={{fontSize: '10px', textAlign: 'center', color: 'white', marginTop: '0 !important'}}>{this.props.data[this.state.currentImageIndex].caption}</p>
                </div>
			</div>
			
		);
	}
}

export default Carousel;
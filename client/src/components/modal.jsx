import React from 'react';
import Carousel from './carousel.jsx';


const Modal = props => {
    if (props.show === false) {
        return null;
    } else {
        return (
            <div className='modal'  onClick={props.onClose}>
                <div className='modal-content' onClick={props.onClose}>
                    <Carousel data={props.data} location={props.location} image={props.image} onClick={props.onClose} />
                </div>
            </div>
        )
    }
}

// style={color='#333333'}

export default Modal


// onClick={e => e.stopPropagation()}
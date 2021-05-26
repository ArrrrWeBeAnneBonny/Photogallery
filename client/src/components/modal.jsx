import React from 'react';
import Carousel from './carousel.jsx';


const Modal = props => {
    if (props.show === false) {
        return null;
    } else {
        return (
            <div className='modal' onClick={props.onClose}>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    <Carousel data={props.data} />
                </div>
            </div>
        )
    }ß
}

export default Modal
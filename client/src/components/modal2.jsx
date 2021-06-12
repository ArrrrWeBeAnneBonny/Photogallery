import React from 'react';
import Carousel from './carousel.jsx';


const Modal2 = props => {
    if (props.show2 === false) {
        return null;
    } else {
        return (
            <div className='modal2'  onClick={props.onClose2}>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    <h1>Please Login To Proceed</h1>
                </div>
            </div>
        )
    }
}

export default Modal2
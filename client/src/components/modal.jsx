import React from 'react';
import Carousel from './carousel.jsx';


const Modal = props => {
    if (props.show === false) {
        return null;
    } else {

    return (
        <div className='modal' onClick={props.onClose}>
            <div className='modal-content' onClick={ e => e.stopPropagation()}>
                <div className='modal-header'>
                    <img src="https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg" classname='avatar' width='30px' height='30px' style={{borderRadius:'50%'}}></img>
                    <div style={{display: 'inline-block'}}>
                    <h4 style={{paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '0 !important', color: 'white'}}>Name Goes Here</h4>
                    <h5 style={{paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '0 !important', fontSize: '9px', color: 'white'}}>Posted Date Goes Here</h5>
                    </div>
                    <h5 style={{paddingLeft: '3px', paddingBottom: '0 !important', marginTop: '0 !important', fontSize: '9px', color: 'white'}}>Location Goes Here</h5>
                </div>
                <div className='modal-body' style={{margin: 'auto', width: '80%'}} width='60%' height='50%'>
                <Carousel />
                {/* <img src="https://annebonny.s3-us-west-1.amazonaws.com/photo-1504280390367-361c6d9f38f4.jpeg" width='60%' height='50%'></img> */}
                </div>
                <div className='modal-footer'>
                    <p style={{fontSize: '10px', textAlign: 'center', color: 'white', marginTop: '0 !important'}}>Caption goes Here</p>
                </div>
            </div>
        </div>
    )

    }
}

export default Modal
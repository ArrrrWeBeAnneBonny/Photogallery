import React from 'react';

  const Images = props => {
    return (
      <div style={{ position: 'relative', overflow: 'hidden', display: 'block', boarderTop: '500px'}}>
        <div className='images' style={{ maxWidth: '98%', maxHeight: '20%', overflow: 'hidden', display: 'block' }}>
          <img className='image' name='0' src={props.data[0]} onClick={(e) => {props.showModal(e)}} style={{}} />
          <img className='image' name='1' src={props.data[1]} onClick={(e) => {props.showModal(e)}} style={{}} />
          <img className='image' name='2' src={props.data[2]} onClick={(e) => {props.showModal(e)}} style={{position: 'absolute', display: 'inline', overflowY: 'hidden'}} />
        </div>
      </div>
    );


    // float: 'left', paddingRight: '8px' 
}

export default Images;
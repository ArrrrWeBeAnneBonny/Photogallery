import React from 'react';

  const Images = props => {

    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div className='images' style={{ maxWidth: '98%', maxHeight: '20%', overflow: 'hidden' }}>
          <img className='1' src={props.data[0].imageUrl} onClick={props.showModal} width="400" height="250" style={{ float: 'left', paddingRight: '8px' }} />
          <img src={props.data[1].imageUrl} onClick={props.showModal} width="400" height="250" style={{ float: 'left', paddingRight: '8px' }} />
          <img src={props.data[2].imageUrl} onClick={props.showModal} width="400" height="250" style={{ float: 'left', paddingRight: '8px', position: 'absolute', display: 'inline' }} />
        </div>
      </div>
    );

}

export default Images;
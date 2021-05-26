import React from 'react';

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div className='images' style={{ maxWidth: '98%', maxHeight: '20%', overflow: 'hidden' }}>
          <img className='1' src={this.props.data[0].imageUrl} onClick={this.props.showModal} width="400" height="250" style={{ float: 'left', paddingRight: '8px' }} />
          <img src={this.props.data[1].imageUrl} onClick={this.props.showModal} width="400" height="250" style={{ float: 'left', paddingRight: '8px' }} />
          <img src={this.props.data[2].imageUrl} onClick={this.props.showModal} width="400" height="250" style={{ float: 'left', paddingRight: '8px', position: 'absolute', display: 'inline' }} />
        </div>
      </div>
    );
  }

}

export default Images;
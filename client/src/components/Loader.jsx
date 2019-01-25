import React from 'react';

const loaderStyle = {
    height: '100px',
    width:'100px',
    display:'block',
    opacity: '0.6',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '100px'
}

const textStyle = {
  textAlign: 'center',
  color: 'grey'
}

const Loader = (props) => (
  <div>
    <img style={loaderStyle} src= './loader.gif' />
    <div style={textStyle}>Github treasure hunting...</div>
  </div>
)

export default Loader
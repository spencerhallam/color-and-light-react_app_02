import React from 'react';

function Colorinfo(props) {

    return (
    <div className="color-values">
        <h5>{props.colortitle}</h5>
        <span style={{color : props.colordata}}>&#9608; </span>
        <span>{props.colordata}</span>
    </div>
    );
  }
export default Colorinfo
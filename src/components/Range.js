import React from 'react';

function Range(props) {
    return (
    <div className="range-container">
        <label>{props.rangeLabel}</label>
        <input type="range" min={props.rangemin} max={props.rangemax} onChange={props.onChange} value={props.myvalue} className="colorInput" name={"cube-" + props.rangeFor}  id={"range-" + props.rangeFor} />
    <span>{props.myvalue}</span>
    </div>
    );
  }
export default Range
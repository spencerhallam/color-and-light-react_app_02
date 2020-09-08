import React from 'react';
import PropTypes from 'prop-types';

Range.propTypes = {
  rangeLabel: PropTypes.string.isRequired,
  rangemin: PropTypes.number.isRequired,
  rangemax: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  rangeFor: PropTypes.string.isRequired,
  myvalue: PropTypes.string.isRequired,
}

function Range({rangeLabel, rangemin, rangemax, onChange, rangeFor, myvalue}) {
    return (
    <div className="range-container">
        <label>{rangeLabel}</label>
        <input 
          type="range" 
          min={rangemin} 
          max={rangemax} 
          onChange={onChange} 
          value={myvalue} 
          className="colorInput" 
          name={"cube-" + rangeFor}  
          id={"range-" + rangeFor} 
        />
    <span>{myvalue}</span>
    </div>
    );
  }
export default Range
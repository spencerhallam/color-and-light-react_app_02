import React from 'react';
import PropTypes from 'prop-types';

Preset.propTypes = {
    loadPreset: PropTypes.func.isRequired,
    buttonName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }

function Preset ({loadPreset, buttonName, id}) {
    return (
        <div className="preset">
            <button onClick={loadPreset} id={id}>{buttonName}</button>
        </div>
    )
}

export default Preset;
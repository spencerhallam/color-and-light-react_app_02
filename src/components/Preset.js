import React from 'react';
import PropTypes from 'prop-types';

Preset.propTypes = {
    loadPreset: PropTypes.func.isRequired,
    buttonName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }

function Preset ({loadPreset, buttonName, id}) {
    return (
        <div className="preset">
            <button onClick={_e => loadPreset(_e, id)} id={id}>{buttonName}</button>
        </div>
    )
}

export default Preset;
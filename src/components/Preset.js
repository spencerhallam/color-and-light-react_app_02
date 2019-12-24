import React from 'react';

function Preset (props) {
    return (
        <div className="preset">
            <button onClick={props.loadPreset} id={props.id}>{props.buttonName}</button>
        </div>
    )
}

export default Preset;
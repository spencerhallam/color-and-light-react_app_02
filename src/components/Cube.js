import React from 'react';

function Cube(props) {
    return (
    <div className="cube">
        <svg id="cubeSpace" height="500" width="1200">
            <defs>
                <linearGradient id="grad1" x1="60%" y1="100%" x2="0%" y2="0%">
        {/* <stop offset="0%" id="gradA" style="stop-color:rgb(255,255,0);stop-opacity:1" />
        <stop offset="100%" id="gradB" style="stop-color:rgb(255,0,0);stop-opacity:1" /> */}
                    <stop offset="0%" id="gradA"  />
                    <stop offset="100%" id="gradB" />
                </linearGradient>
            </defs>
            <polygon id="bkgrd" points="0,0 1200,0 1200,220 0,220" />
            <polygon id="ground" points="0,220 1200,220 1200,600 0,600" />
            <polygon id="shadow" points="450,320 550,320 700,350 550,410 450,412 300,352"  />
            <polygon id="ltside" points="300,190 450,150 600,190 450,230" />
            <polygon id="midtone" points="300,190 450,230 450,410 300,350"  />
            <polygon id="darkside" points="450,230 600,190 600,350 450,410" fill="url(#grad1)"  />
            <polygon id="dkmidtone" points="451,229 450,233 600,192 599,189" />
            <polygon id="dkstmidtone" points="448,229 451,233 451,410 448,410" />  
            <polygon id="hilite" points="300,191 303,189 453,230 450,233"  />
        </svg>
    </div>
    );
  }
export default Cube
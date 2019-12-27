import React from 'react';

function Artboard(props) {
  
    return (
    <div className="art-container">
        <svg viewBox="0 0 800 600" id="cubeSpace"  width="100%">
            <defs>
                <linearGradient id="grad1" x1="60%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" id="gradA" style={{stopColor : props.initColor.reflt}}  />
                    <stop offset="100%" id="gradB" style={{stopColor : props.initColor.dk}} />
                </linearGradient>
            </defs>
            <polygon id="bkgrd" points="0,0 1200,0 1200,220 0,220" style={{fill : props.initColor.sky}} />
            <polygon id="ground" points="0,220 1200,220 1200,610 0,610" style={{fill : props.initColor.gdlt}}/>
            <polygon id="shadow" points="450,320 550,320 700,350 550,410 450,412 300,352" style={{fill : props.initColor.shad}} />
            <polygon id="ltside" points="300,190 450,150 600,190 450,230" style={{fill : props.initColor.lt}}/>
            <polygon id="midtone" points="300,190 450,230 450,410 300,350"  style={{fill : props.initColor.mt}}/>
            <polygon id="darkside" points="450,230 600,190 600,350 450,410" style={{fill : "url(#grad1)" }}  />
            <polygon id="dkmidtone" points="451,229 450,233 600,192 599,189" style={{fill : props.initColor.mtTwo}}/>
            <polygon id="dkstmidtone" points="448,229 451,233 451,410 448,410" style={{fill : props.initColor.mtThree}}/>  
            <polygon id="hilite" points="300,191 303,189 453,230 450,233" style={{fill : props.initColor.hi}} />
        </svg>
    </div>
    );
  }
export default Artboard
export function hslObject(hue, sat, val){
    return { h: hue, s: sat, v: val }
}


export function makeHSL(hue, sat, val){
  return "hsl(" + hue + ", " + sat + "%, " + val + "%)"
}

//this should be objects set by "hslObject"
export function setColors(rangeStrt, initCube, initTemp, initGrd, initSky, initLight){
// export function setColors(rangeStrt, initCube, initTemp, initGrd){
    //Cube Values
    const hueStart = rangeStrt;//60
    const hueMidPt = hueStart + 180;
    const hueEnd = hueStart + 360;
    const hueAVal = parseInt(initCube.h);
    const satAVal = parseInt(initCube.s);
    const valAVal = parseInt(initCube.v);
    
    //Ground Values
    const gdHue = parseInt(initGrd.h);
    const gdSat = parseInt(initGrd.s);
    const gdVal = parseInt(initGrd.v);
    let grdHueAdd = gdHue;
    let grdSatAdd = gdSat;
    //let grdValAdd = gdVal;
    

    //Sky Values
    const skyHue = parseInt(initSky.h);
    const skySat = parseInt(initSky.s);
    const skyVal = parseInt(initSky.v);
    let skyHueAdd = skyHue;
    //let skySatAdd = skySat

    const ltIntens = parseInt(initLight)*.01;
    console.log('ltIntens', ltIntens);

    //Set RGB vlues from Temperature Slider
    
    const sourceR = initTemp;// should be 0 - 255
    const sourceG = 90 + ((75/255)*initTemp);
    const sourceB = 255 - initTemp;
    
    let tempAdd = hueAVal;
    let tempSat = satAVal;
    
    
    //Get HSL values returned as and object
    const temperature = RGBToHSL(sourceR, sourceG, sourceB);
    
    //SET CUBE HUE BASED ON COLOR TEMPERATURE:
    
    //Set new hue based on light source if orginal hue has blue/green harmony 
    if( hueAVal <= hueMidPt ){
      
      //If light is Blue
      if (temperature.srcHue === hueMidPt ){
       //set cooler temperature 
       let diffA = hueMidPt - hueAVal
       let tempAddCalc = hueAVal + diffA*(.004*(temperature.srcSat));
       tempAdd = parseInt(tempAddCalc);
       
       //Neutralize the complimentary color
       let neutralize = (diffA/180)*(temperature.srcSat);
       tempSat = parseInt(satAVal - neutralize);
      }
      //If light is Yellow
      if (temperature.srcHue === hueStart ){
       //set warmer temperature
       let diffB = hueAVal - hueStart
       let tempAddCalc = hueAVal - diffB*(.004*(temperature.srcSat));
       tempAdd = parseInt(tempAddCalc);
       
       //Neutralize the complimentary color
       let neutralize = (diffB/180)*(temperature.srcSat);
       tempSat = parseInt(satAVal - neutralize);
      }
      
    }
    
    //Set new hue based on light source if orginal hue has violet/magenta/red harmony
    if( hueAVal >= hueMidPt ){
      
      //If light is blue
      if (temperature.srcHue === hueMidPt ){
        let diffC = hueAVal - hueMidPt
        let tempAddCalc = hueAVal - diffC*(.004*(temperature.srcSat));
        tempAdd = parseInt(tempAddCalc); 
       
        //Neutralize the complimentary color
       let neutralize = (diffC/180)*(temperature.srcSat);
       tempSat = parseInt(satAVal - neutralize);
      }
  
      //If light is Yellow
      if (temperature.srcHue === hueStart ){
        let diffD = hueEnd - hueAVal
        let tempAddCalc = hueAVal + diffD*(.004*(temperature.srcSat));
        tempAdd = parseInt(tempAddCalc); 
  
        //Neutralize the complimentary color
       let neutralize = (diffD/180)*(temperature.srcSat);
       tempSat = parseInt(satAVal - neutralize);
      }
      
    }
    
    //SET GROUND HUE BASED ON COLOR TEMPERATURE:
    
    //Set new hue based on light source if orginal hue has blue/green harmony 
    if( gdHue <= hueMidPt ){
      
      //If light is Blue
      if (temperature.srcHue === hueMidPt ){
       let diffA = hueMidPt - gdHue
       let grdCalc =  gdHue + diffA*(.004*(temperature.srcSat));
       grdHueAdd = parseInt(grdCalc);
        
       //Neutralize the complimentary color
       let neutralize = (diffA/180)*(temperature.srcSat);
       grdSatAdd = parseInt(gdSat - neutralize); 
      }
  
      //If light is Yellow
      if (temperature.srcHue === hueStart ){
       let diffB = gdHue - hueStart
       let grdCalc =  gdHue - diffB*(.004*(temperature.srcSat));
       grdHueAdd = parseInt(grdCalc);
  
       //Neutralize the complimentary color
       let neutralize = (diffB/180)*(temperature.srcSat);
       grdSatAdd = parseInt(gdSat - neutralize); 
      }
      
    }
    ////Set new hue based on light source if orginal hue has violet/magenta/red harmony
    if( gdHue >= hueMidPt ){
      
      //If light is blue
      if (temperature.srcHue === hueMidPt ){
       let diffC = gdHue - hueMidPt 
       let grdCalc =  gdHue - diffC*(.004*(temperature.srcSat));
       grdHueAdd = parseInt(grdCalc);
  
       //Neutralize the complimentary color
       let neutralize = (diffC/180)*(temperature.srcSat);
       grdSatAdd = parseInt(gdSat - neutralize);
  
      }
      //If light is Yellow 
      if (temperature.srcHue === hueStart ){
       let diffD = hueEnd - gdHue
       let grdCalc =  gdHue + diffD*(.004*(temperature.srcSat));
       grdHueAdd = parseInt(grdCalc);
      
      //Neutralize the complimentary color
       let neutralize = (diffD/180)*(temperature.srcSat);
       grdSatAdd = parseInt(gdSat - neutralize);
  
       }
    }

    if( skyHue !== gdHue ){
        console.log('gdHue X', gdHue );
        console.log('skyHue X', skyHue);
        
        if (skyHue > gdHue){
          let hueDiff = skyHue - gdHue;
          let wSkyChroma = (hueDiff*.8)*(skySat*.01)*(skyVal*.01);
          skyHueAdd = wSkyChroma; 
          console.log('skyHueAdd 1:', skyHueAdd);
        }
        if (skyHue < gdHue){
          let hueDiff = gdHue - skyHue;
          let wSkyChroma = (hueDiff*.8)*(skySat*.01)*(skyVal*.01);
          skyHueAdd = -Math.abs(wSkyChroma); 
          console.log('skyHueAdd 2:', skyHueAdd);
        }
    }


    //Get final "S" Value
    // const finSatOne = 0;
  
    //Get final "L" Value
    const finValOne = parseInt((valAVal*(7/7))*ltIntens)
    const finValTwo = parseInt((valAVal*(6/7))*ltIntens)
    const finValThree = parseInt((valAVal*(5/7))*ltIntens)
    const finValFour = parseInt((valAVal*(4/7))*ltIntens)
    const finValFive = parseInt((valAVal*(3/7))*ltIntens)
    const finValSix = parseInt((valAVal*(2/7))*ltIntens)
    
    const grdValOne = parseInt((gdVal*(6/7))*ltIntens);
    const grdValSix = parseInt((gdVal*(2/7))*ltIntens);
    // const shadowHueOne = parseInt(skyShadow)*ltIntens;
    const skyValOne = skyVal*ltIntens
    const skyHueOne = skyHue //skyHueAdd + grdHueAdd 
    const shadowValOne = grdValOne - ((grdValOne)/2)
    const refLightSatOne = grdSatAdd - (grdSatAdd*.20) 
    console.log('shadowValOne', shadowValOne);

    
    //HSL Colors Saved To Variables
    const hslOne = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValOne + '%)';  
    const hslTwo = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValTwo + '%)';
    const hslThree = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValThree + '%)';
    const hslFour = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFour + '%)';
    const hslFive = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValFive + '%)';
    const hslSix = 'hsl(' + tempAdd + ', ' + tempSat + '%, ' + finValSix + '%)';
    const hslSeven = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValOne + '%)';
    const hslEight = 'hsl(' + grdHueAdd + ', ' + grdSatAdd + '%, ' + grdValSix + '%)';
    const hslShadow = 'hsl(' + skyHueOne + ', ' + 10 + '%, ' + shadowValOne + '%)';
    const refLight = 'hsl(' + grdHueAdd + ', ' + refLightSatOne + '%, ' + parseInt(grdValOne*(3.5/7)) + '%)';
    const hslSky = 'hsl(' + skyHue + ', ' + skySat + '%, ' + skyValOne + '%)';
    
  return {
        hi : hslOne,
        lt : hslTwo,
        mt : hslThree,
        mtTwo : hslFour,
        mtThree : hslFive,
        dk : hslSix,
        gdlt : hslSeven,
        gdsh : hslEight,
        shad : hslShadow,
        reflt : refLight,
        sky : hslSky
  } 
  }
  
  //Convert RGB to HSL
  export function RGBToHSL(r,g,b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
  
    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    
    // Calculate hue
    // No difference
    if (delta === 0)
      h = 0;
    // Red is max
    else if (cmax === r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax === g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    
    // Calculate lightness
    l = (cmax + cmin) / 2;
  
    // Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    
    return { srcHue: h, srcSat: s, srcVal: l}
    //return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  export function mixColors(hueOne, satOne, hueTwo, satTwo, valOne){
    const piDiv = Math.PI/180;
    const xOne = Math.round(satOne*Math.cos(hueOne*piDiv));
    const yOne = Math.round(satOne*Math.sin(hueOne*piDiv));
    const xTwo = Math.round(satTwo*Math.cos(hueTwo*piDiv));
    const yTwo = Math.round(satTwo*Math.sin(hueTwo*piDiv));
    const xAv = (xTwo + xOne)/2;
    const yAv = (yOne + yTwo)/2;
    const hue = Math.round(Math.atan2( yAv, xAv )*( 180/Math.PI ));
    const sat = Math.round(Math.sqrt( xAv**2 + yAv**2 ));
    //const finHSL = `hsl(${hue}, ${sat}%, ${valOne}%)`
    
    return `hsl(${hue}, ${sat}%, ${valOne}%)`
  };
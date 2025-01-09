import React from 'react';
import './App.css';
import Range from './components/Range.js'
import Artboard from './components/Artboard.js'
import Colorinfo from './components/Colorinfo.js'
import Preset from './components/Preset.js'

import { hslObject, setColors } from './helpers/Helpers2.js'
import { presetData } from './helpers/PresetDataArray.js'


class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updatePreset = this.updatePreset.bind(this);
    this.state = presetData?.find(item => item.name === "default").graphicsData;
  }
  //console.log("tag-stateData: ", this.state || "nada")
  handleChange(e){
    console.log("e", e.target.id);
    if(e.target.id === "range-cube-hue"){
      this.setState({cubeOnehue: e.target.value }); 
    }
    if(e.target.id === "range-cube-sat"){
      this.setState({cubeOnesat: e.target.value });
    }
    if(e.target.id === "range-cube-val"){
      this.setState({cubeOneval: e.target.value });
    }
    if(e.target.id === "range-grd-hue"){
      this.setState({groundhue: e.target.value}); 
    }
    if(e.target.id === "range-grd-sat"){
      this.setState({groundsat: e.target.value});
    }
    if(e.target.id === "range-grd-val"){
      this.setState({groundval: e.target.value});
    }
    if(e.target.id === "range-temp"){
      this.setState({tempvalue: e.target.value}); 
    }
    if(e.target.id === "range-sky-hue"){
      this.setState({skyhue: e.target.value});
    }
    if(e.target.id === "range-sky-sat"){
      this.setState({skysat: e.target.value});
    }
    if(e.target.id === "range-sky-val"){
      this.setState({skyval: e.target.value});
    }
    if(e.target.id === "range-light-val"){
      this.setState({lightvalue: e.target.value});
    }
    const {cubeOnehue, cubeOnesat, cubeOneval, groundhue, groundsat, groundval, skyhue, skysat, skyval, initialColor, tempvalue, lightvalue} = this.state;
    const cubeO = hslObject(cubeOnehue, cubeOnesat, cubeOneval);
    const groundO = hslObject(groundhue, groundsat, groundval);
    const skyO = hslObject(skyhue, skysat, skyval);
    console.log('State HSL: ', "hsl(" + cubeOnehue + ", " + cubeOnesat + "%, " + cubeOneval + "%)");
    const allColors = setColors(initialColor, cubeO, tempvalue, groundO, skyO, lightvalue);//need to add args: skyO and light value
    this.setState(allColors);
  }
  updatePreset(e, itemId){
    const itemData = presetData.find(item => item.name === itemId)?.graphicsData;
    this.setState(itemData);
  }
 
  render(){
    const updatePreset = this.updatePreset;
    const handleChange = this.handleChange;
    const {
      initialColor,
      cubeOnehue,
      cubeOnesat,
      cubeOneval,
      groundhue,
      groundsat,
      groundval,
      skyhue,
      skysat, 
      skyval, 
      tempvalue,
      lightvalue,
      hi,
      lt,
      mt,
      mtTwo,
      mtThree,
      dk,
      gdlt,
      shad, 
      reflt,
      sky
    } = this.state;

    return (
      <div className="App">
        <div className="header"><h1>Light &amp; Color Explorer</h1></div>
        <div className="presets-wrap">
          {
            this.state &&
            presetData.map(preset => (
              <Preset loadPreset={updatePreset} buttonName={preset.title} id={preset.name} key={preset.name}  /> 
            ))
          }
        </div>
        <div className="controls">
        <h3><span style={{color : mt}}>&#8226; </span><span>Cube</span></h3>
        <Range onChange={handleChange} myvalue={cubeOnehue} rangemin={39} rangemax={420} rangeFor="cube-hue" rangeLabel="hue"/>
        <Range onChange={handleChange} myvalue={cubeOnesat} rangemin={0} rangemax={100} rangeFor="cube-sat" rangeLabel="sat"/>
        <Range onChange={handleChange} myvalue={cubeOneval} rangemin={0} rangemax={100} rangeFor="cube-val" rangeLabel="val"/>
        <h3><span style={{color : gdlt}}>&#8226; </span>Ground</h3>
        <Range onChange={handleChange} myvalue={groundhue} rangemin={39} rangemax={420} rangeFor="grd-hue" rangeLabel="hue"/>
        <Range onChange={handleChange} myvalue={groundsat} rangemin={0} rangemax={100} rangeFor="grd-sat" rangeLabel="sat"/>
        <Range onChange={handleChange} myvalue={groundval} rangemin={0} rangemax={100} rangeFor="grd-val" rangeLabel="val"/>
        <h3><span style={{color : sky}}>&#8226; </span>Sky</h3>
        <Range onChange={handleChange} myvalue={skyhue} rangemin={39} rangemax={420} rangeFor="sky-hue" rangeLabel="hue"/>
        <Range onChange={handleChange} myvalue={skysat} rangemin={0} rangemax={100} rangeFor="sky-sat" rangeLabel="sat"/>
        <Range onChange={handleChange} myvalue={skyval} rangemin={0} rangemax={100} rangeFor="sky-val" rangeLabel="val"/>
        <h3>Temperature</h3>
        <Range onChange={handleChange} myvalue={tempvalue} rangemin={0} rangemax={255} rangeFor="temp" rangeLabel="C/W"/>
        <h3>Light Level </h3>
        <Range onChange={handleChange} myvalue={lightvalue} rangemin={0} rangemax={100} rangeFor="light-val" rangeLabel="val"/>
        </div>
        <div className="artboard">
          <Artboard initColor={this.state}/>
        </div>
        <div className="color-info">
          <div className="picture-element">
          <h4>Cube:</h4>
          <Colorinfo colortitle="highlight" colordata={hi}/>
          <Colorinfo colortitle="lightside" colordata={lt}/>
          <Colorinfo colortitle="midtone" colordata={mt}/>
          <Colorinfo colortitle="darker midtone" colordata={mtTwo}/>
          <Colorinfo colortitle="darkest midtone" colordata={mtThree}/>
          <Colorinfo colortitle="darkside" colordata={dk}/>
          </div>

          <div className="picture-element">
          <h4>Ground:</h4>
          <Colorinfo colortitle="light" colordata={gdlt}/>
          <Colorinfo colortitle="shadow" colordata={shad}/>
          <Colorinfo colortitle="reflected light" colordata={reflt}/>
          </div>

          <div className="picture-element">
          <h4>Sky:</h4>
          <Colorinfo colortitle="sky" colordata={sky}/>
          </div>

        </div>
        <ul className="state-data">
        
          <li>initialColor: {initialColor},</li>
          <li>cubeOnehue: {cubeOnehue},</li>
          <li>cubeOnesat: {cubeOnesat},</li>
          <li>cubeOneval: {cubeOneval},</li>
          <li>groundhue: {groundhue},</li>
          <li>groundsat: {groundsat},</li>
          <li>groundval: {groundval},</li>
          <li>skyhue: {skyhue},</li>
          <li>skysat: {skysat},</li>
          <li>skyval: {skyval},</li>
          <li>tempvalue: {tempvalue},</li>
          <li>lightvalue: {lightvalue},</li>
          <li>hi: "{hi}",</li>
          <li>lt: "{lt}",</li>
          <li>mt: "{mt}",</li>
          <li>mtTwo: "{mtTwo}",</li>
          <li>mtThree: "{mtThree}",</li>
          <li>dk: "{dk}",</li>
          <li>gdlt: "{gdlt}",</li>
          <li>shad: "{shad}",</li>
          <li>reflt: "{reflt}",</li>
          <li>sky: "{sky}"</li>
          </ul>  
          
        <div className="footer"><a href="https://savvywebdev.com">Application by Spencer Hallam</a></div>
      </div>
    );
  }
  
}

export default App;

import React from 'react';
import './App.css';
import Range from './components/Range.js'
import Artboard from './components/Artboard.js'
import Colorinfo from './components/Colorinfo.js'
import Preset from './components/Preset.js'

import { hslObject, setColors } from './helpers/Helpers2.js'
import { marsOne, grayOne, marsTwo, beach, tenebrism, monet, tiepolo } from './helpers/PresetData.js'


class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updatePreset = this.updatePreset.bind(this);
    this.state = {
        initialColor: 39,
        cubeOnehue: 360,
        cubeOnesat: 100,
        cubeOneval: 50,
        groundhue: 39,
        groundsat: 30,
        groundval: 80,
        skyhue: 200,
        skysat: 70,
        skyval: 70,
        tempvalue: 127,
        lightvalue: 80,
        hi: "hsl(0, 50%, 39%)",
        lt: "hsl(0, 50%, 33%)",
        mt: "hsl(0, 50%, 28%)",
        mtTwo: "hsl(0, 50%, 22%)",
        mtThree: "hsl(0, 50%, 16%)",
        dk: "hsl(0, 50%, 11%)",
        gdlt:  "hsl(40, 15%, 54%)",
        shad: "hsl(-172, 11%, 27%)",
        reflt: "hsl(9, 31%, 22%)",
        sky: "hsl(-160, 35%, 55%)"

    };
  }
  
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
    const cubeO = hslObject(this.state.cubeOnehue, this.state.cubeOnesat, this.state.cubeOneval );
    const groundO = hslObject(this.state.groundhue, this.state.groundsat, this.state.groundval );
    const skyO = hslObject(this.state.skyhue, this.state.skysat, this.state.skyval );
    console.log('State HSL: ', "hsl(" + this.state.cubeOnehue + ", " + this.state.cubeOnesat + "%, " + this.state.cubeOneval + "%)");
    const allColors = setColors(this.state.initialColor, cubeO, this.state.tempvalue, groundO, skyO, this.state.lightvalue);//need to add args: skyO and light value
    this.setState(allColors);
  }

  updatePreset(e){
    //console.log('updatePreset');
    console.log('e.target.id: ', e.target.id);
    if(e.target.id === "mars-01"){
      this.setState(marsOne);
    }
    if(e.target.id === "gray-01"){
      this.setState(grayOne);
    }
    if(e.target.id === "mars-02"){
      this.setState(marsTwo);
    }
    if(e.target.id === "beach"){
      this.setState(beach);
    }
    if(e.target.id === "tenebrism"){
      this.setState(tenebrism);
    }
    if(e.target.id === "monet"){
      this.setState(monet);
    }
    if(e.target.id === "tiepolo"){
      this.setState(tiepolo);
    }
  }
 
 



 

  render(){
    
    return (
      <div className="App">
        <div className="header"><h1>Light &amp; Color Explorer</h1></div>
        <div className="presets-wrap">
        <Preset loadPreset={this.updatePreset} buttonName="Gray Scale" id="gray-01" /> 
        <Preset loadPreset={this.updatePreset} buttonName="Beach" id="beach" /> 
        <Preset loadPreset={this.updatePreset} buttonName="Tenebrism" id="tenebrism" />
        <Preset loadPreset={this.updatePreset} buttonName="Monet" id="monet" /> 
        <Preset loadPreset={this.updatePreset} buttonName="Tiepolo" id="tiepolo" /> 
        <Preset loadPreset={this.updatePreset} buttonName="Mars Daylight" id="mars-01" /> 
        <Preset loadPreset={this.updatePreset} buttonName="Mars Night" id="mars-02" />
        </div>
        <div className="controls">
        <h3>Cube</h3>
        <Range onChange={this.handleChange} myvalue={this.state.cubeOnehue} rangemin={39} rangemax={420} rangeFor="cube-hue" rangeLabel="hue"/>
        <Range onChange={this.handleChange} myvalue={this.state.cubeOnesat} rangemin={0} rangemax={100} rangeFor="cube-sat" rangeLabel="sat"/>
        <Range onChange={this.handleChange} myvalue={this.state.cubeOneval} rangemin={0} rangemax={100} rangeFor="cube-val" rangeLabel="val"/>
        <h3>Ground</h3>
        <Range onChange={this.handleChange} myvalue={this.state.groundhue} rangemin={39} rangemax={420} rangeFor="grd-hue" rangeLabel="hue"/>
        <Range onChange={this.handleChange} myvalue={this.state.groundsat} rangemin={0} rangemax={100} rangeFor="grd-sat" rangeLabel="sat"/>
        <Range onChange={this.handleChange} myvalue={this.state.groundval} rangemin={0} rangemax={100} rangeFor="grd-val" rangeLabel="val"/>
        <h3>Sky</h3>
        <Range onChange={this.handleChange} myvalue={this.state.skyhue} rangemin={39} rangemax={420} rangeFor="sky-hue" rangeLabel="hue"/>
        <Range onChange={this.handleChange} myvalue={this.state.skysat} rangemin={0} rangemax={100} rangeFor="sky-sat" rangeLabel="sat"/>
        <Range onChange={this.handleChange} myvalue={this.state.skyval} rangemin={0} rangemax={100} rangeFor="sky-val" rangeLabel="val"/>
        <h3>Temperature</h3>
        <Range onChange={this.handleChange} myvalue={this.state.tempvalue} rangemin={0} rangemax={255} rangeFor="temp" rangeLabel="C/W"/>
        <h3>Light Level </h3>
        <Range onChange={this.handleChange} myvalue={this.state.lightvalue} rangemin={0} rangemax={100} rangeFor="light-val" rangeLabel="val"/>
        
        </div>
        <div className="artboard">
          <Artboard initColor={this.state}/>
        </div>
        <div className="color-info">
          <div className="picture-element">
          <h4>Cube:</h4>
          <Colorinfo colortitle="highlight" colordata={this.state.hi}/>
          <Colorinfo colortitle="lightside" colordata={this.state.lt}/>
          <Colorinfo colortitle="midtone" colordata={this.state.mt}/>
          <Colorinfo colortitle="darker midtone" colordata={this.state.mtTwo}/>
          <Colorinfo colortitle="darkest midtone" colordata={this.state.mtThree}/>
          <Colorinfo colortitle="darkside" colordata={this.state.dk}/>
          </div>

          <div className="picture-element">
          <h4>Ground:</h4>
          <Colorinfo colortitle="light" colordata={this.state.gdlt}/>
          <Colorinfo colortitle="shadow" colordata={this.state.shad}/>
          <Colorinfo colortitle="reflected light" colordata={this.state.reflt}/>
          </div>

          <div className="picture-element">
          <h4>Sky:</h4>
          <Colorinfo colortitle="sky" colordata={this.state.sky}/>
          </div>

        </div>
        <ul className="state-data">
        
          <li>initialColor: {this.state.initialColor},</li>
          <li>cubeOnehue: {this.state.cubeOnehue},</li>
          <li>cubeOnesat: {this.state.cubeOnesat},</li>
          <li>cubeOneval: {this.state.cubeOneval},</li>
          <li>groundhue: {this.state.groundhue},</li>
          <li>groundsat: {this.state.groundsat},</li>
          <li>groundval: {this.state.groundval},</li>
          <li>skyhue: {this.state.skyhue},</li>
          <li>skysat: {this.state.skysat},</li>
          <li>skyval: {this.state.skyval},</li>
          <li>tempvalue: {this.state.tempvalue},</li>
          <li>lightvalue: {this.state.lightvalue},</li>
          <li>hi: "{this.state.hi}",</li>
          <li>lt: "{this.state.lt}",</li>
          <li>mt: "{this.state.mt}",</li>
          <li>mtTwo: "{this.state.mtTwo}",</li>
          <li>mtThree: "{this.state.mtThree}",</li>
          <li>dk: "{this.state.dk}",</li>
          <li>gdlt: "{this.state.gdlt}",</li>
          <li>shad: "{this.state.shad}",</li>
          <li>reflt: "{this.state.reflt}",</li>
          <li>sky: "{this.state.sky}"</li>
          </ul>  
          
        <div className="footer"><a href="https://savvywebdev.com">Application by Spencer Hallam</a></div>
      </div>
    );
  }
  
}

export default App;

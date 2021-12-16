import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { audioClips, containerOnStyle, containerOffStyle, textOnStyle, textOffStyle } from './global.js';
import DrumPad from './DrumPad.js';

class App extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
          display: "Welcome",
          volume: "0.5",
          power: false,
      };
      this.handleDisplay = this.handleDisplay.bind(this);
      this.handleVolume = this.handleVolume.bind(this);
      this.togglePower = this.togglePower.bind(this);
  };

  handleDisplay(display) {
      this.setState({display});
  };

  togglePower() {
      if (this.state.power) {
          this.setState({power: false});
          this.setState({display: "Welcome"});
          this.setState({volume: "0.5"});
      } else {
          this.setState({power: true});
      };
  };

  handleVolume(e) {
      this.setState({volume: e.target.value});
  };

  render() {
      const containerStyle = this.state.power ? containerOnStyle : containerOffStyle;
      const textStyle = this.state.power ? textOnStyle : textOffStyle;
      
      return (
          <div id="drum-machine" className="container-fluid d-flex flex-column">

              <div id="title-container" className="text-center">
                  <h1>Drum Machine</h1>
              </div>

              <div id="drum-container">
                  <div id="pads-container" className="row justify-content-center">
                      {audioClips.map((clip) => (
                          <DrumPad 
                              key={clip.keyCode}
                              id={clip.id}
                              keyTrigger={clip.keyTrigger}
                              keyCode={clip.keyCode}
                              url={clip.url}
                              handleDisplay={this.handleDisplay}
                              volume={this.state.volume}
                              power={this.state.power}
                          />
                      ))}
                  </div>
                  <div id="controls-container" className="d-flex flex-column text-center">
                      <div id="display" className="text-center" style={containerStyle}>
                          <h2 style={textStyle}>{this.state.display}</h2>
                      </div>
                      <div id="controls" className="d-flex">
                          <div id="power">
                              <h4>Power</h4>
                              <button onClick={this.togglePower}></button>
                          </div>
                          <div id="volume" className="d-flex flex-column">
                              <h4>Volume</h4>
                              <input 
                                  type="range" 
                                  step="0.01" 
                                  value={this.state.volume}
                                  max="1" 
                                  min="0"
                                  onChange={this.handleVolume}
                              />
                          </div>
                      </div>
                  </div>
              </div>

              <div id="footer-container" className="text-center">
                  <p>A freeCodeCamp project by Victor</p>
              </div>

          </div>
      );
  };
};

export default App;
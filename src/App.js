/* eslint-disable */

import React, { Component } from 'react';
import Canvas from './components/canvas';
import './assets/stylesheets/application.scss';
import Interface from './components/interface';
import panzoom from 'panzoom';
let panzoomStart = false;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgLink: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg",
            svgReady: false
        };
    }

    isSvgReady = (ready) => {
      console.log(ready);
      this.setState({
        svgReady: ready
      })
    }

    setSvgLink = (Url) => {
        this.setState({ svgLink: Url })
    }

    startPanzoom = (e) => {
      if (!panzoomStart) {
        const element = document.getElementById('scene');
        const controller = panzoom(element);
        panzoomStart = true;
      }
    }


    render () {
      return (
        <React.Fragment>
          <div id="outer-scene" onMouseEnter={this.startPanzoom}>
            <div id="scene">
              <Canvas svgUrl={this.state.svgLink} onReady={this.isSvgReady}/>
            </div>
          </div>
          <div id="controls-panel" >
            <div id="controls">
              <Interface url={this.setSvgLink} svgReady={this.state.svgReady} />
            </div>
          </div>
        </React.Fragment>
      );
    }
}

export default App;
import React, { Component } from "react";
import { saveSvgAsPng } from 'save-svg-as-png';
let style;
let theSVG;
let svgVbBuffer = {};

// TODO
// Make a function that returns SVG instance
// Bind Viewbox Inputs to SVG instance viewbox
// Deploy again

class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgContext: null,
      multiplier: 1, // Default scale multiplier
      encoderOptions: 10,
      backgroundColor: "",
      inlineCss: "",
      svgViewBox: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.svgReady !== this.props.svgReady) {
      console.log('major changes!');
      theSVG = document.getElementById('mainSVG');
      this.getSvgViewBox();
    }
  }

  setMultiplierAmount = (e) => {
    this.setState({
      multiplier: e.target.value
    });
  };

  setEncoderOptions = (e) => {
    this.setState({
      encoderOptions: (e.target.value)
    });
  };

  setBgFillColor = (e) => {
    this.setState({
      backgroundColor: (e.target.value)
    });
    theSVG.style.backgroundColor = e.target.value;
  };

  getSvgViewBox = () => {
    let svgVb = theSVG.getAttribute('viewBox').split(' ');
    console.log(svgVb);
    this.setState({
      svgViewBox: {
        x: svgVb[0],
        y: svgVb[1],
        w: svgVb[2],
        h: svgVb[3]
      }
    }, () => {
      svgVbBuffer = this.state.svgViewBox;
    });
  }

  setSvgViewBox = (e) => {
    let idx = e.target.name
    svgVbBuffer[idx] = e.target.value;
    //console.log(svgVbBuffer);
    this.setState({
      svgViewBox: svgVbBuffer
    }, () => {
      console.log(this.state.svgViewBox);
      theSVG.setAttribute('viewBox', `0 0 0 0`)
    })

  }

  setInlineCss(e) {
    if (style === undefined) {
      style = document.createElement('style');
      theSVG.appendChild(style);
      style.type = 'text/css';
    }
    style.innerHTML = e.target.value
    // theSVG.setAttribute("style", e.target.value);
  }

  setSvgUrl = (e) => {
    if (typeof e === "object") {
      this.props.url(e.target.value);
    } else if (typeof e === "string") {
      this.props.url(e);
    }
  };

  componentDidMount() {
    console.log(this.props.svgReady);
  }

  getSvgPng = () => {
    let download = document.querySelector("#scene > svg");
    saveSvgAsPng(download, 
      `svg2png_x${this.state.multiplier}.png`, 
      {
        scale: this.state.multiplier,
        encoderOptions: (this.state.encoderOptions / 10),
        backgroundColor: this.state.backgroundColor,
      });
  };

  render() {
    return (
      <React.Fragment>
        <label
         className="uk-form-label"
         htmlFor="url">
          Load SVG from URL or paste markup.
        </label>
        <input
          className="uk-input"
          placeholder="SVG URL / Markup"
          name="url"
          type="text"
          onChange={this.setSvgUrl}
          defaultValue=""
        />

        <label
         className="uk-form-label"
         htmlFor="multiplier">
          Output image scale. <span style={{"fontSize": "10px"}}>(Browser may freeze for a second.)</span>
        </label>
        <input
          className="uk-input"
          placeholder="3x"
          name="multiplier"
          type="number"
          onChange={this.setMultiplierAmount}
          defaultValue="3"
        />

        <label
         className="uk-form-label"
         htmlFor="inlineCss">
          Add inline CSS
        </label>
        <textarea
          className="uk-input"
          placeholder="#element { font-family: 'droid-sans' }"
          name="inlineCss"
          type="text"
          onChange={this.setInlineCss}
        />
        <br/>

        <label
         className="uk-form-label"
         htmlFor="SvgViewBoxInput">
          ViewBox
        </label>
        <div id="SvgViewBoxInput">
          
          <input
            className="uk-input"
            placeholder="X"
            name="x"
            type="number"
            value={this.state.svgViewBox.x}
            onChange={this.setSvgViewBox}
          />
          
          <input
            className="uk-input"
            placeholder="Y"
            name="y"
            type="number"
            value={this.state.svgViewBox.y}
            onChange={this.setSvgViewBox}
          />
          
          <input
            className="uk-input"
            placeholder="W"
            name="w"
            type="number"
            value={this.state.svgViewBox.w}
            onChange={this.setSvgViewBox}
          />
          
          <input
            className="uk-input"
            placeholder="H"
            name="h"
            type="number"
            value={this.state.svgViewBox.h}
            onChange={this.setSvgViewBox}
          />
        </div>

        <br/>
        <label htmlFor="bgFillColor">Background fill color <span style={{"fontSize": "10px"}}>(Default: Transparent)</span></label>
        <input 
          value={this.state.backgroundColor}
          onChange={this.setBgFillColor}
          type="color" 
          id="bgFillColor" 
          name="bgFillColor"
        />

        <br/>

        <label
         className="uk-form-label"
         htmlFor="pngQuality">
          PNG Quality
        </label>
        <input 
          className="uk-range" 
          min="1" 
          max="10" 
          name="pngQuality" 
          type="range" 
          value={this.state.encoderOptions} 
          onChange={this.setEncoderOptions}
        />
        {this.state.encoderOptions}
        <output htmlFor="pngQuality" />



        <button onClick={this.getSvgPng} className="uk-button uk-button-default" style={{ color: 'white' }}>
          Download
        </button>
        
        <a href="https://github.com/x8BitRain/svg-emoji-corrupt"><span className="uk-label label-react">GitHub</span></a>
      </React.Fragment>
    );
  }
}

export default Interface;

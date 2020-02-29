import React, { Component } from "react";
import { saveSvgAsPng } from 'save-svg-as-png';
let theSVG;
let style;

class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiplier: 1, // Default scale multiplier
      encoderOptions: 10,
      backgroundColor: "",
      inlineCss: "",
    };
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
    if (theSVG === undefined) {
      theSVG = document.getElementById('mainSVG');
    }
    theSVG.style.backgroundColor = e.target.value;
  };

  // setSvgViewBox = (e) => {
  //   if (theSVG === undefined) {
  //     theSVG = document.getElementById('mainSVG');
  //   }
  //   SvgViewBox[e.target.name] = e.target.value;
  //   theSVG.viewBox.animValVal = SvgViewBox;
  //   console.log(SvgViewBox);
  // };

  setInlineCss(e) {
    if (theSVG === undefined) {
      theSVG = document.getElementById('mainSVG');
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
            name="X"
            type="text"
            onChange={this.setSvgViewBox}
          />
          
          <input
            className="uk-input"
            placeholder="Y"
            name="Y"
            type="text"
            onChange={this.setSvgViewBox}
          />
          
          <input
            className="uk-input"
            placeholder="W"
            name="width"
            type="text"
            onChange={this.setSvgViewBox}
          />
          
          <input
            className="uk-input"
            placeholder="H"
            name="height"
            type="text"
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

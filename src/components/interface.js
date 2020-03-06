import React, { Component } from "react";
import { saveSvgAsPng, svgAsDataUri, svgAsPngUri } from 'save-svg-as-png';
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
      svgViewBox: {},
      vboutline: {border: '30px solid green'},
      pngDataUri: '',
      svgDataUri: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.svgReady !== this.props.svgReady) {
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
    this.setState({
      svgViewBox: svgVbBuffer
    }, () => {
      let x = this.state.svgViewBox.x;
      let y = this.state.svgViewBox.y;
      let w = this.state.svgViewBox.w;
      let h = this.state.svgViewBox.h;
      theSVG.setAttribute('viewBox', `${x} ${y} ${w} ${h}`)
    })
  }

  setVBOutline = (e) => {
    e.target.checked ? theSVG.style.border = "1px solid red" : theSVG.style.border = null
  };

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
    // console.log(this.props.svgReady);
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

  getPngDataUri = () => {
    let download = document.querySelector("#scene > svg");
    svgAsPngUri(download, 
      {
        scale: this.state.multiplier,
        encoderOptions: (this.state.encoderOptions / 10),
        backgroundColor: this.state.backgroundColor,
      }).then(uri => 
        this.setState({
          pngDataUri: uri
        })
      );
  };

  getSvgDataUri = () => {
    let download = document.querySelector("#scene > svg");
    svgAsDataUri(download).then(uri => 
      this.setState({
        svgDataUri: uri
      })
    );
  };

  copi = (e) => {
    navigator.clipboard.writeText(e.target.value);
    e.target.style.border = '3px solid #00b149';
  }


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
         id="outline"
         className="uk-form-label"
         htmlFor="SvgViewBoxInput">
          ViewBox
          
          <label htmlFor="vboutline"><input onChange={this.setVBOutline} type="checkbox" id="vboutline" name="vboutline" />Outline ViewBox</label>
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
          Download PNG
        </button>
        
        <button onClick={this.getPngDataUri} className="uk-button uk-button-default" style={{ color: 'white' }}>
          Get PNG Data URI
        </button>

        {this.state.pngDataUri ? <input
          className="uk-input"
          type="text"
          defaultValue=""
          value={this.state.pngDataUri}
          onClick={this.copi}
        /> : null}
        

        <button onClick={this.getSvgDataUri} className="uk-button uk-button-default" style={{ color: 'white' }}>
          Get SVG Data URI
        </button>

        {this.state.svgDataUri ? <input
          className="uk-input"
          type="text"
          defaultValue=""
          value={this.state.svgDataUri}
          onClick={this.copi}
        /> : null}

        
        <a href="https://github.com/x8BitRain/svg-emoji-corrupt"><span className="uk-label label-react">GitHub</span></a>
      </React.Fragment>
    );
  }
}

export default Interface;

import React, { Component } from "react";
import { saveSvgAsPng } from 'save-svg-as-png';
import UIkit from "uikit";

class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiplier: 3, // Default corruption multiplier
    };
  }

  setMultiplierAmount = (e) => {
    this.setState({
      multiplier: e.target.value
    });
  };


  setSvgUrl = (e) => {
    if (typeof e === "object") {
      this.props.url(e.target.value);
    } else if (typeof e === "string") {
      this.props.url(e);
    }
  };

  getSvgPng = () => {
    let download = document.querySelector("#scene > svg");
    saveSvgAsPng(download, "corrupted.png", {scale: this.state.multiplier});
  };

  render() {
    return (
      <React.Fragment>
        <label
         className="uk-form-label"
         for="url">
          Load SVG from URL or paste markup.
        </label>
        <input
          className="uk-input"
          placeholder="SVG URL"
          name="url"
          type="text"
          onChange={this.setSvgUrl}
          defaultValue=""
        />

        <label
         uk-tooltip="title: The higher the scale the longer it will take to render.; pos:left"
         className="uk-form-label"
         for="multiplier">
          Output image scale. <span style={{"font-size": "10px"}}>(Browser may freeze for a second.)</span>
        </label>
        <input
          className="uk-input"
          placeholder="3x"
          name="multiplier"
          type="number"
          onChange={this.setMultiplierAmount}
          defaultValue="3"
        />

        <button onClick={this.getSvgPng} className="uk-button uk-button-default" style={{ color: 'white' }}>
          Download
        </button>
        
        <a href="https://github.com/x8BitRain/svg-emoji-corrupt"><span class="uk-label label-react">GitHub</span></a>
      </React.Fragment>
    );
  }
}

export default Interface;

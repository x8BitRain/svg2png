import React from 'react';
import SVG from 'react-inlinesvg';
import Loader from './loader';


const Canvas = (props) => {
  const { svgUrl, onReady } = props;
  const svgReady = (src) => {
    props.onReady(src);
  }
  return (<SVG id="mainSVG" onLoad={(src) => svgReady(src)} src={svgUrl} loader={<Loader />} />);
};

export default Canvas;

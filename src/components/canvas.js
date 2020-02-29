import React from 'react';
import SVG from 'react-inlinesvg';
import Loader from './loader';


const Canvas = (props) => {
  const { svgUrl } = props;
  return (<SVG id="mainSVG" src={svgUrl} loader={<Loader />} />);
};

export default Canvas;

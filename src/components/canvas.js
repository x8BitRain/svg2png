import React from 'react';
import SVG from 'react-inlinesvg';
import Loader from './loader';


const Canvas = (props) => {
  const { svgUrl } = props;
  return (<SVG src={svgUrl} loader={<Loader />} />);
};

export default Canvas;

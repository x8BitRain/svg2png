/* eslint-disable */

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Canvas from './components/canvas';
import './assets/stylesheets/application.scss';
import Interface from './components/interface';
import panzoom from 'panzoom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            svgLink: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg"
        };
    }

    setSvgLink = (Url) => {
        this.setState({ svgLink: Url })
    }


    ignorePanzoom = (e) => {
        const element = document.getElementById('scene');
        const controller = panzoom(element);
        controller.pause();
        console.log("pause");
    }

    startPanzoom = (e) => {
        const element = document.getElementById('scene');
        const controller = panzoom(element);
        controller.resume();
        console.log("resume");
    }


    render () {
      return (
        <React.Fragment>
          <div id="controls-panel" >
            <div id="controls">
              <Interface url={this.setSvgLink} />
            </div>
          </div>
          <div id="outer-scene" onMouseLeave={this.ignorePanzoom} onMouseEnter={this.startPanzoom}>
            <div id="scene">
              <Canvas svgUrl={this.state.svgLink}/>
            </div>
          </div>
        </React.Fragment>
      );
    }
}

export default App;
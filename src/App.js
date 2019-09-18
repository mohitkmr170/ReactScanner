import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DotScanner from "./Components/DotScanner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <DotScanner />
        </div>
        <canvas id="mycanvas"></canvas>
      </div>
    );
  }
}

export default App;

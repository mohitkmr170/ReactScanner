import React from "react";
import "./App.css";
import DotScanner from "./Components/DotScanner";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <DotScanner />
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";
import { Component } from "react";
import "./App.css";

import { Header } from "./components/Header";
import Search from "./components/Search";
import Trains from "./components/Trains";

class App extends Component {
  state = {
    trains: [],
    code: "",
    stations: [],
  };

  render() {
    return (
      <div className="col col-sm-12 col-md-6 p-0 App">
        <div className="Container">
          <Header />
          <Search
            result={(trains, code, stations) =>
              this.setState({ trains, code, stations })
            }
          />
          <Trains
            trains={this.state.trains}
            code={this.state.code}
            stations={this.state.stations}
          />
        </div>
      </div>
    );
  }
}

export default App;

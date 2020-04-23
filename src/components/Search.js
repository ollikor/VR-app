import React from "react";
import { Component } from "react";

import { GetStationCodes, GetCurrentStation } from "../api/index";

import { Form, ListGroup } from "react-bootstrap";
import texts from "../texts";

class Search extends Component {
  state = {
    searchText: "",
    stations: [],
    newStationsCodes: [],
    error: "",
  };

  // Fetch all stationscodes from API
  async componentDidMount() {
    try {
      let stationsCodes = await GetStationCodes();

      let newStationsCodes = stationsCodes.map((item) => ({
        station: item.stationName,
        code: item.stationShortCode,
      }));
      this.setState({ newStationsCodes });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message });
    }
  }

  // Get value from input, change first letter to upperCase and check if input value match with stations
  // Set all match to stations array
  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ error: "" });
    let stations = [];
    let searchText =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    this.setState({ searchText });
    let stationsCodes = this.state.newStationsCodes;

    if (searchText.length) {
      for (let i = 0; i < stationsCodes.length; i++) {
        let match = stationsCodes[i].station.includes(searchText);
        if (match) {
          stations.push(stationsCodes[i]);
          this.setState({ stations });
        }
      }
    } else {
      this.setState({ stations: [] });
    }
  };

  // Fetch trains information in current station using stationcode
  // Send results on props to app component
  selectStation = async (e, code, station) => {
    e.preventDefault();
    this.setState({ searchText: station });
    try {
      let trains = await GetCurrentStation(code);
      if (trains.length) {
        this.props.result(trains, code, this.state.newStationsCodes);
      } else {
        const error = texts.emptyTrainArray;
        this.setState({ error });
        this.props.result([]);
      }
      this.setState({ stations: [] });
    } catch (error) {
      console.error(error);
      this.setState({ error: error.message, stations: [] });
    }
  };

  // submit(e) {
  //   e.preventDefault();
  //   var getvalue = document.getElementById("option");
  //   console.log(getvalue.value);
  // }

  render() {
    return (
      // <form className="Search">
      //   <label className="SearchTitle">{texts["search-label-text"]}</label>
      //   <input
      //     onFocus={(e) => e.target.select()}
      //     type="search"
      //     list="trains"
      //     // name="trains"
      //     value={this.state.searchText}
      //     onChange={(e) => this.handleSearch(e)}
      //   />
      //   <datalist id="trains">
      //     {this.state.stations.map((item, index) => (
      //       <option
      //           id="option"
      //         value={item.station}
      //         key={index}
      //         className="col col-sm-12 col-md-8 p-2 m-0"
      //       //   onClick={(e) => this.selectStation(e, item.code, item.station)}
      //       >
      //       </option>
      //     ))}
      //   </datalist>
      //   </form>

      /* <input list="trains" name="train">
                    <datalist id="trains">
                        {this.state.stations.map((item, index) =>
                            <option
                                key={index}
                                className="col col-sm-12 col-md-8 p-2 m-0"
                                onClick={() => this.selectStation(item.code, item.station)}>{item.station}
                            </option>
                        )}
                    </datalist>
                </input> */
      <Form className="Search">
        <Form.Group className="col col-sm-12 col-md-8 p-0 m-0">
          <Form.Label className="SearchTitle">
            Search with station name
          </Form.Label>
          <Form.Control
            onFocus={(e) => e.target.select()}
            list="stations"
            size="sm"
            type="search"
            value={this.state.searchText}
            onChange={(e) => this.handleSearch(e)}
          />
        </Form.Group>

        <ListGroup>
          {this.state.stations.map((item, index) => (
            <ListGroup.Item
              key={index}
              className="col col-sm-12 col-md-8 p-2 m-0"
              onClick={(e) => this.selectStation(e, item.code, item.station)}
            >
              {item.station}
            </ListGroup.Item>
          ))}
        </ListGroup>
        {this.state.error ? <p className="Error">{this.state.error}</p> : null}
      </Form>
    );
  }
}

export default Search;

{
  /* <select>
{this.state.stations.map((item, index) =>
        <option
            key={index}
            className="col col-sm-12 col-md-8 p-2 m-0"
            onClick={() => this.selectStation(item.code, item.station)}>{item.station}
        </option>
    )}
</select> */
}

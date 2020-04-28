import React, { Component, createRef } from "react";

import { GetStationCodes, GetCurrentStation } from "../api/index";

import texts from "../texts";

import { BigLoader } from "./Loaders";

class Search extends Component {
  state = {
    searchText: "",
    stations: [],
    newStationsCodes: [],
    error: "",
    loading: false,
  };

  inputRef = createRef();

  // Fetch all stationscodes from API
  async componentDidMount() {
    this.inputRef.current.focus();
    try {
      let stationsCodes = await GetStationCodes();

      let newStationsCodes = stationsCodes.map((item) => ({
        station: item.stationName,
        code: item.stationShortCode,
      }));
      this.setState({ newStationsCodes });
    } catch (error) {
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
      // e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
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

  // Fetch trains information from current station using stationcode
  // Send results on props to app component
  selectStation = async () => {
    if (this.state.searchText !== "") {
      let stationCode = this.state.newStationsCodes.find(
        (item) => item.station === this.state.searchText
      );
      if (stationCode) {
        this.setState({ loading: true });
        try {
          let trains = await GetCurrentStation(stationCode.code);
          if (trains.length) {
            this.props.result(
              trains,
              stationCode.code,
              this.state.newStationsCodes
            );
          } else {
            const error = texts["empty-trainarray"];
            this.setState({ error });
            this.props.result([]);
          }
          this.setState({ stations: [], loading: false });
        } catch (error) {
          this.setState({ error: error.message, stations: [] });
        }
      }
    }
    this.setState({ loading: false });
  };

  // Remove search input selection when press enter
  submit(e) {
    e.preventDefault();
    if (this.state.searchText) this.inputRef.current.blur();
  }

  render() {
    return (
      <form onSubmit={(e) => this.submit(e)} className="Search">
        <div className="SearchContent">
          <label className="SearchTitle">{texts["search-label-text"]}</label>
          <input
            onFocus={(e) => e.target.select()}
            onBlur={() => this.selectStation()}
            value={this.state.searchText}
            onChange={(e) => this.handleSearch(e)}
            ref={this.inputRef}
            type="search"
            list="trains"
          />
        </div>
        <datalist id="trains">
          {this.state.stations.map((item, index) => (
            <option id="option" value={item.station} key={index}></option>
          ))}
        </datalist>
        {this.state.error ? <p className="Error">{this.state.error}</p> : null}
        {this.state.loading ? <BigLoader /> : null}
      </form>
    );
  }
}

export default Search;

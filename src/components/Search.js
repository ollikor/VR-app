import React from 'react'
import { Component } from 'react'

import { GetStationCodes, GetCurrentStation } from '../api/index'

import { Form, ListGroup } from 'react-bootstrap'

class Search extends Component {

    state = {
        searchText: '',
        stations: [],
        stationsCodes: []
    }

    // Fetch all stationscodes from API
    async componentDidMount() {
        let stationsCodes = await GetStationCodes();
        this.setState({ stationsCodes });
    }

    // Get value from input, change first letter to upperCase and check if input value match with stations
    // Set all match to stations array
    handleSearch = async (e) => {
        let stations = [];
        let searchText = (e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1);
        this.setState({ searchText });

        let stationsCodes = this.state.stationsCodes;

        if (searchText.length > 0) {
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
    }

    // Fetch trains information in current station using stationcode
    // Send results on props to app component
    selectStation = async (code, station) => {
        let trains = [];
        this.setState({ searchText: station });
        trains = await GetCurrentStation(code);
        await this.props.result(trains, code, this.state.stationsCodes);
        this.setState({ stations: [] });
    }

    render() {
        return (
            <div className="Search">
                <Form>
                    <Form.Group className="col col-sm-12 col-md-8 p-0 m-0">
                        <Form.Label className="SearchTitle">Hae aseman nimellä</Form.Label>
                        <Form.Control onFocus={(e) => e.target.select()} list="stations" size="sm" type="search" value={this.state.searchText} onChange={(e) => this.handleSearch(e)} />
                    </Form.Group>
                    <ListGroup>
                        {this.state.stations.map((item, index) =>
                            <ListGroup.Item key={index} className="col col-sm-12 col-md-8 p-2 m-0" onClick={() => this.selectStation(item.code, item.station)}>{item.station}</ListGroup.Item>
                        )}
                    </ListGroup>
                </Form>
            </div>
        )
    }
}

export default Search;
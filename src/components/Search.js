import React from 'react'
import { Component } from 'react'

import { GetStationCodes, GetCurrentStation } from '../api/index'

import { Form, Button, Dropdown } from 'react-bootstrap'
import { getCurves } from 'crypto';

class Search extends Component {

    state = {
        searchText: '',
        results: [],
        stations: []
    }
    handleSearch = async (e) => {
        let station = (e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1);
        this.setState({searchText: station});

        let results = [];
        let stations = [];

        stations = await GetStationCodes();
        this.setState({stations});

        for(let i = 0; i < stations.length; i++){
            if(stations[i].station.includes(this.state.searchText)){
                results.push(stations[i]);
                this.setState({ results: results });
            }
        }
    }

    selectStation = async (code, station) => {
        this.setState({searchText: station});
        let trains = [];
        trains = await GetCurrentStation(code);
        // let url = `https://rata.digitraffic.fi/api/v1/live-trains/station/${code}`;
        // await fetch(url)
        // .then(response => response.json())
        // .then(data => data.map(item => trains.push(item)));
        console.log(trains);

        await this.props.result(trains, code, this.state.stations);
        this.setState({results: []})
    }

    render() {
        return (
            <div className="Search">
                <Form>
                    <Form.Group className="col col-sm-12 col-md-8 p-0">
                        <Form.Label className="SearchTitle">Search for a station name</Form.Label>
                        <Form.Control size="sm" type="search" value={this.state.searchText} onChange={(e) => this.handleSearch(e)} />
                    </Form.Group>
                </Form>
                
                <div>
                    <div className="SearchResultContainer">
                        {this.state.results.map((item, index) => 
                            <Button block variant="light" onClick={() => this.selectStation(item.code, item.station)} key={index}>
                                {item.station}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
import React from 'react'
import { Component } from 'react'

import { Tabs, Tab } from 'react-bootstrap';

import TabContent from './TabContent';

class Results extends Component {

    state = {
        key: 'arrival',
        arrival: 'Saapuvat',
        departure: 'Lähtevät',
        train: 'Juna',
        departureStation: 'Lähtöasema',
        terminal: 'Pääteasema',
        arrives: 'Saapuu',
        goes: 'Lähtee'
    }

    getArrivalTrains = () => {
        let result = this.props.result;
        let trains = [];
        let code = this.props.code;
        let stations = this.props.stations;
        let departureStation;
        let terminal;
        let lateTime;
        let time;

        console.log(result);
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result[i].timeTableRows.length; j++) {
                    if (result[i].timeTableRows[j].stationShortCode === code) {
                        if (result[i].timeTableRows[j].type === 'ARRIVAL') {
                            let scheduledTime = result[i].timeTableRows[j].scheduledTime;
                            let actualTime = result[i].timeTableRows[j].actualTime;
                            let scheduledTimeToDate = new Date(scheduledTime);
                            let actualTimeToDate = new Date(actualTime);
                            let scheduledGetTime = scheduledTimeToDate.getTime();
                            let actualGetTime = actualTimeToDate.getTime();
                            let scheduledGetTimeToMinutes = Math.floor(scheduledGetTime/60000);
                            let actualGetTimeToMinutes = Math.floor(actualGetTime/60000);
                            time = scheduledTimeToDate;

                            if (scheduledGetTimeToMinutes - actualGetTimeToMinutes < 0) {
                                lateTime = ('0' + actualTimeToDate.getHours()).slice(-2) + ':' + ('0' + actualTimeToDate.getMinutes()).slice(-2)
                            } else {
                                lateTime = null
                            }

                            // Get current stations name using stationShortCode
                            for (let k = 0; k < stations.length; k++) {
                                if (result[i].timeTableRows[0].stationShortCode === stations[k].code) {
                                    departureStation = stations[k].station
                                }
                                if (result[i].timeTableRows[result[i].timeTableRows.length - 1].stationShortCode === stations[k].code) {
                                    terminal = stations[k].station
                                }
                            }

                            trains.push({
                                trainType: result[i].trainType,
                                trainNumber: result[i].trainNumber,
                                departureStation: departureStation,
                                terminal: terminal,
                                cancelled: result[i].cancelled,
                                time: time,
                                lateTime: lateTime
                            })
                        }
                    }
                }
            }
            trains.sort((a, b) => (a.time - b.time));
            return trains;
        }
        return trains;
    }

    getDepartureTrains = () => {
        let result = this.props.result;
        let trains = [];
        let code = this.props.code;
        let stations = this.props.stations;
        let departureStation;
        let terminal;
        let lateTime;
        let time;

        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result[i].timeTableRows.length; j++) {
                    if (result[i].timeTableRows[j].stationShortCode === code) {
                        if (result[i].timeTableRows[j].type === 'DEPARTURE') {
                            let scheduledTime = result[i].timeTableRows[j].scheduledTime;
                            let actualTime = result[i].timeTableRows[j].actualTime;
                            let scheduledTimeToDate = new Date(scheduledTime);
                            let actualTimeToDate = new Date(actualTime);
                            let scheduledGetTime = scheduledTimeToDate.getTime();
                            let actualGetTime = actualTimeToDate.getTime();
                            let scheduledGetTimeToMinutes = Math.floor(scheduledGetTime/60000);
                            let actualGetTimeToMinutes = Math.floor(actualGetTime/60000);
                            time = scheduledTimeToDate;

                            if (scheduledGetTimeToMinutes - actualGetTimeToMinutes < 0) {
                                lateTime = ('0' + actualTimeToDate.getHours()).slice(-2) + ':' + ('0' + actualTimeToDate.getMinutes()).slice(-2)
                            } else {
                                lateTime = null
                            }

                            // Get current stations name using stationShortCode
                            for (let k = 0; k < stations.length; k++) {
                                if (result[i].timeTableRows[0].stationShortCode === stations[k].code) {
                                    departureStation = stations[k].station
                                }
                                if (result[i].timeTableRows[result[i].timeTableRows.length - 1].stationShortCode === stations[k].code) {
                                    terminal = stations[k].station
                                }
                            }

                            trains.push({
                                trainType: result[i].trainType,
                                trainNumber: result[i].trainNumber,
                                departureStation: departureStation,
                                terminal: terminal,
                                cancelled: result[i].cancelled,
                                time: time,
                                lateTime: lateTime
                            })
                        }
                    }
                }
                trains.sort((a, b) => (a.time - b.time));
            }
            return trains;
        }
        return trains;
    }

    render() {
        return (
            <div className="Results">
                <Tabs
                    id="controlled-tab"
                    defaultActiveKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                >
                    <Tab eventKey="arrival" title={this.state.arrival}>
                        <TabContent
                            titleOne={this.state.train}
                            titleTwo={this.state.departureStation}
                            titleThree={this.state.terminal}
                            titleFour={this.state.arrives}
                            result={this.getArrivalTrains()}
                        />
                    </Tab>
                    <Tab eventKey="departure" title={this.state.departure}>
                        <TabContent
                            titleOne={this.state.train}
                            titleTwo={this.state.departureStation}
                            titleThree={this.state.terminal}
                            titleFour={this.state.goes}
                            result={this.getDepartureTrains()}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Results;
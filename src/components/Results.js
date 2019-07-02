import React from 'react'
import { Component } from 'react'

import { Tabs, Tab } from 'react-bootstrap';
import TabContent from './TabContent';

class Results extends Component {

    state = {
        key: 'arrival',
    }

    getArrivalTrains = () => {
        let result = this.props.result;
        let trains = [];
        let code = this.props.code;
        let stations = this.props.stations;
        let departureStation;
        let terminal;
        let currentUTCTime;
        let lateArrival;

        for(let i = 0; i < result.length; i++){
            for(let j = 0; j < result[i].timeTableRows.length; j++){
                if(result[i].timeTableRows[j].stationShortCode === code){
                    if(result[i].timeTableRows[j].type === 'ARRIVAL'){
                        let scheduledTime = result[i].timeTableRows[j].scheduledTime;
                        let actualTime = result[i].timeTableRows[j].actualTime;
                        let scheduledTimeToDate = new Date(scheduledTime);
                        let actualTimeToDate = new Date(actualTime);
                        let scheduledGetTime = scheduledTimeToDate.getTime();
                        let actualGetTime = actualTimeToDate.getTime();
                        currentUTCTime = `${('0' + scheduledTimeToDate.getUTCHours()).slice(-2)}:${('0' + scheduledTimeToDate.getUTCMinutes()).slice(-2)}`;
                        if(scheduledGetTime - actualGetTime < 0){
                            lateArrival = ('0' + actualTimeToDate.getUTCHours()).slice(-2) + ':' + ('0' + actualTimeToDate.getUTCMinutes()).slice(-2)
                        }else{
                            lateArrival = null
                        }
                    }
                }
            }

            for(let k = 0; k < stations.length; k++){
                if(result[i].timeTableRows[0].stationShortCode === stations[k].code){
                    departureStation = stations[k].station
                }
                if(result[i].timeTableRows[result[i].timeTableRows.length - 1].stationShortCode === stations[k].code){
                    terminal = stations[k].station
                }
            }
            trains.push({
                trainType: result[i].trainType,
                trainNumber: result[i].trainNumber,
                departureStation: departureStation,
                terminal: terminal,
                cancelled: result[i].cancelled,
                arrival: currentUTCTime,
                lateArrival: lateArrival
            })
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
        let currentUTCTime;
        let lateArrival;

        for(let i = 0; i < result.length; i++){
            for(let j = 0; j < result[i].timeTableRows.length; j++){
                if(result[i].timeTableRows[j].stationShortCode === code){
                    if(result[i].timeTableRows[j].type === 'DEPARTURE'){
                        let scheduledTime = result[i].timeTableRows[j].scheduledTime;
                        let actualTime = result[i].timeTableRows[j].actualTime;
                        let scheduledTimeToDate = new Date(scheduledTime);
                        let actualTimeToDate = new Date(actualTime);
                        let scheduledGetTime = scheduledTimeToDate.getTime();
                        let actualGetTime = actualTimeToDate.getTime();
                        currentUTCTime = `${('0' + scheduledTimeToDate.getUTCHours()).slice(-2)}:${('0' + scheduledTimeToDate.getUTCMinutes()).slice(-2)}`;
                        if(scheduledGetTime - actualGetTime < 0){
                            lateArrival = ('0' + actualTimeToDate.getUTCHours()).slice(-2) + ':' + ('0' + actualTimeToDate.getUTCMinutes()).slice(-2)
                        }else{
                            lateArrival = null
                        }
                    }
                }
            }

            for(let k = 0; k < stations.length; k++){
                if(result[i].timeTableRows[0].stationShortCode === stations[k].code){
                    departureStation = stations[k].station
                }
                if(result[i].timeTableRows[result[i].timeTableRows.length - 1].stationShortCode === stations[k].code){
                    terminal = stations[k].station
                }
            }
            trains.push({
                trainType: result[i].trainType,
                trainNumber: result[i].trainNumber,
                departureStation: departureStation,
                terminal: terminal,
                cancelled: result[i].cancelled,
                arrival: currentUTCTime,
                lateArrival: lateArrival
            })
        }
        return trains;
    }

    render() {
        // console.log(this.state.results);
        // console.log(this.props.result);
        return (
            <div className="Results">
                <Tabs 
                    id="controlled-tab"
                    defaultActiveKey={this.state.key} 
                    onSelect={key => this.setState({ key })}
                >
                    <Tab eventKey="arrival" title="Arrival">
                        <TabContent 
                            titleOne={'Train'}
                            titleTwo={'Departure station'}
                            titleThree={'Terminal'}
                            titleFour={'Arrives'}
                            result={this.getArrivalTrains()}
                        />
                    </Tab>
                    <Tab eventKey="departure" title="Departure">
                        <TabContent 
                            titleOne={'Train'}
                            titleTwo={'Departure station'}
                            titleThree={'Terminal'}
                            titleFour={'Goes'}
                            result={this.getDepartureTrains()}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Results;
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
        let arrivalTime;

        for(let i = 0; i < result.length; i++){
            for(let j = 0; j < result[i].timeTableRows.length; j++){
                console.log(result[i].timeTableRows[j].stationShortCode);
                if(result[i].timeTableRows[j].stationShortCode === code){
                    if(result[i].timeTableRows[j].type === 'ARRIVAL'){
                        arrivalTime = result[i].timeTableRows[j].scheduledTime;
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
                arrival: arrivalTime
            })
        }

        console.log('trains');
        console.log(trains);
        // this.props.result.map((item, index) => {
        //     if(item.timeTableRows.stationShortCode === code){
        //         if(item.timeTableRows.type === 'ARRIVAL'){
        //             arrivalTime = item.timeTableRows.scheluledTime;
        //         }
        //     }
        //     trains.push({
        //         departureStation: item.timeTableRows[0],
        //         terminal: item.timeTableRows[item.timeTableRows.length - 1],
        //         cancelled: item.cancelled,
        //         arrival: arrivalTime
        //     })
        //     return trains;
        // });
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
                            result={this.props.result}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Results;
import React from "react";

import { Tabs, Tab } from "react-bootstrap";

import TabContent from "./TabContent";

const key = "arrival";

const Results = (props) => {
  const getArrivalTrains = (props) => {
    let result;
    let code;
    let stations;
    if (props !== undefined) {
      result = props.result;
      code = props.code;
      stations = props.stations;
    } else {
      result = null;
      code = null;
      stations = null;
    }
    let trains = [];
    let departureStation;
    let terminal;
    let lateTime;
    let time;

    if (result.length) {
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].timeTableRows.length; j++) {
          // If stationShortCode and type match, change datestrings to datetime, take getTime, change to minutes and
          // calculate difference between scheduledTime and actualTime
          if (result[i].timeTableRows[j].stationShortCode === code) {
            if (result[i].timeTableRows[j].type === "ARRIVAL") {
              let scheduledTime = result[i].timeTableRows[j].scheduledTime;
              let actualTime = result[i].timeTableRows[j].actualTime;
              let scheduledTimeToDate = new Date(scheduledTime);
              let actualTimeToDate = new Date(actualTime);
              let scheduledGetTime = scheduledTimeToDate.getTime();
              let actualGetTime = actualTimeToDate.getTime();
              let scheduledGetTimeToMinutes = Math.floor(
                scheduledGetTime / 60000
              );
              let actualGetTimeToMinutes = Math.floor(actualGetTime / 60000);
              time = scheduledTimeToDate;

              if (scheduledGetTimeToMinutes - actualGetTimeToMinutes < 0) {
                lateTime =
                  ("0" + actualTimeToDate.getHours()).slice(-2) +
                  ":" +
                  ("0" + actualTimeToDate.getMinutes()).slice(-2);
              } else {
                lateTime = null;
              }

              // Get current stations name using stationShortCode
              for (let k = 0; k < stations.length; k++) {
                if (
                  result[i].timeTableRows[0].stationShortCode ===
                  stations[k].code
                ) {
                  departureStation = stations[k].station;
                }
                if (
                  result[i].timeTableRows[result[i].timeTableRows.length - 1]
                    .stationShortCode === stations[k].code
                ) {
                  terminal = stations[k].station;
                }
              }

              trains.push({
                trainType: result[i].trainType,
                trainNumber: result[i].trainNumber,
                departureStation: departureStation,
                terminal: terminal,
                cancelled: result[i].cancelled,
                time: time,
                lateTime: lateTime,
              });
            }
          }
        }
      }
      trains.sort((a, b) => a.time - b.time);
      return trains;
    }
    return trains;
  };

  // // Get departureTrains from results
  // const getDepartureTrains = () => {
  //     let result ='';
  //     let trains = [];
  //     let code = '';
  //     let stations = '';
  //     let departureStation;
  //     let terminal;
  //     let lateTime;
  //     let time;

  //     if (result.length > 0) {
  //         for (let i = 0; i < result.length; i++) {
  //             for (let j = 0; j < result[i].timeTableRows.length; j++) {
  //                 // If stationShortCode and type match, change datestrings to datetime, take getTime, change to minutes and
  //                 // calculate difference between scheduledTime and actualTime
  //                 if (result[i].timeTableRows[j].stationShortCode === code) {
  //                     if (result[i].timeTableRows[j].type === 'DEPARTURE') {
  //                         let scheduledTime = result[i].timeTableRows[j].scheduledTime;
  //                         let actualTime = result[i].timeTableRows[j].actualTime;
  //                         let scheduledTimeToDate = new Date(scheduledTime);
  //                         let actualTimeToDate = new Date(actualTime);
  //                         let currentDate = new Date(Date.now());
  //                         let currentDateGetTime = currentDate.getTime();
  //                         let scheduledGetTime = scheduledTimeToDate.getTime();
  //                         let actualGetTime = actualTimeToDate.getTime();
  //                         let scheduledGetTimeToMinutes = Math.floor(scheduledGetTime / 60000);
  //                         let actualGetTimeToMinutes = Math.floor(actualGetTime / 60000);
  //                         time = scheduledTimeToDate;

  //                         // If currentDateTime is after than scheduledTime, train will drop off from results
  //                         if ((currentDateGetTime - scheduledGetTime) < 0) {
  //                             if (scheduledGetTimeToMinutes - actualGetTimeToMinutes < 0) {
  //                                 lateTime = ('0' + actualTimeToDate.getHours()).slice(-2) + ':' + ('0' + actualTimeToDate.getMinutes()).slice(-2)
  //                             } else {
  //                                 lateTime = null
  //                             }

  //                             // Get current stations name using stationShortCode
  //                             for (let k = 0; k < stations.length; k++) {
  //                                 if (result[i].timeTableRows[0].stationShortCode === stations[k].code) {
  //                                     departureStation = stations[k].station
  //                                 }
  //                                 if (result[i].timeTableRows[result[i].timeTableRows.length - 1].stationShortCode === stations[k].code) {
  //                                     terminal = stations[k].station
  //                                 }
  //                             }

  //                             trains.push({
  //                                 trainType: result[i].trainType,
  //                                 trainNumber: result[i].trainNumber,
  //                                 departureStation: departureStation,
  //                                 terminal: terminal,
  //                                 cancelled: result[i].cancelled,
  //                                 time: time,
  //                                 lateTime: lateTime
  //                             })
  //                         }
  //                     }
  //                 }
  //             }
  //             trains.sort((a, b) => (a.time - b.time));
  //         }
  //         return trains;
  //     }
  //     return trains;
  // }

  const changeKey = (key) => {
    return (key = key);
  };
  // Get arrivaltrains from results
  return (
    <div className="Results">
      <Tabs
        id="controlled-tab"
        defaultActiveKey={key}
        onSelect={(key) => changeKey(key)}
      >
        <Tab eventKey="arrival" title="Arrival">
          <TabContent
            titleOne="Train"
            titleTwo="Departure station"
            titleThree="Terminal"
            titleFour="arrives"
            result={undefined}
            result={getArrivalTrains(props)}
          />
        </Tab>
        <Tab eventKey="departure" title="departure">
                    <TabContent
                        titleOne="Train"
                        titleTwo="Departure station"
                        titleThree="Terminal"
                        titleFour="Goes"
                        // result={getDepartureTrains()}
                    />
                </Tab>
      </Tabs>
    </div>
  );
};

export default Results;

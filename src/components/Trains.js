import React from "react";

import { Tabs, Tab } from "react-bootstrap";

import TabContent from "./TabContent";

const Trains = (props) => {
  // convert scheduletimes to better format and create latetime if train is late
  const convertDate = (trains) => {
    let lateTime;
    let newTrains = [];
    for (let i = 0; i < trains.length; i++) {
      let time = new Date(trains[i].scheduledTime);

      // Convert scheduledTime to Date and get minutes
      let scheduledTimeToMinutes = Math.floor(
        new Date(trains[i].scheduledTime).getTime() / 60000
      );

      // Convert actualTime to Date and get minutes
      let actualTimeToMinutes = Math.floor(
        new Date(trains[i].actualTime).getTime() / 60000
      );

      // Made lateTime string
      scheduledTimeToMinutes - actualTimeToMinutes < 0
        ? (lateTime =
            ("0" + new Date(trains[i].actualTime).getHours()).slice(-2) +
            ":" +
            ("0" + new Date(trains[i].actualTime).getMinutes()).slice(-2))
        : (lateTime = null);

      // Made scheduledTime string
      let scheduleTime =
        ("0" + new Date(trains[i].scheduledTime).getHours()).slice(-2) +
        ":" +
        ("0" + new Date(trains[i].scheduledTime).getMinutes()).slice(-2);

      // Replace old scheduledTime from scheduleTime
      trains[i].scheduledTime = scheduleTime;
      let times = { lateTime: lateTime, time: time };
      let newObject = Object.assign({ ...times }, { ...trains[i] });
      newTrains.push(newObject);
    }
    return newTrains;
  };

  // Check is trains arrival or departure and and create arrival and departure arrays 
  const getTrains = (trainType) => {
    let convert;

    let trains;
    let code;
    let stations;

    let departureStation;
    let departureStationShortCode;
    let terminal;
    let terminalShortCode;

    let arrivalTrains = [];
    let departureTrains = [];

    if (props !== undefined) {
      trains = props.trains;
      code = props.code;
      stations = props.stations;
    } else {
      trains = [];
      code = null;
      stations = null;
    }

    if (trains.length) {
      for (let i = 0; i < trains.length; i++) {
        for (let j = 0; j < trains[i].timeTableRows.length; j++) {
          if (trains[i].timeTableRows[j].stationShortCode === code) {
            departureStationShortCode =
              trains[i].timeTableRows[0].stationShortCode;
            terminalShortCode =
              trains[i].timeTableRows[trains[i].timeTableRows.length - 1]
                .stationShortCode;
            departureStation = stations.find(
              (item) => item.code === departureStationShortCode
            );
            terminal = stations.find((item) => item.code === terminalShortCode);

            if (trains[i].timeTableRows[j].type === "ARRIVAL") {
              const arrival = {
                trainType: trains[i].trainType,
                trainNumber: trains[i].trainNumber,
                departureStation: departureStation.station,
                terminal: terminal.station,
                cancelled: trains[i].cancelled,
                actualTime: trains[i].timeTableRows[j].actualTime,
                scheduledTime: trains[i].timeTableRows[j].scheduledTime,
              };
              arrivalTrains.push(arrival);
            } else {
              const departure = {
                trainType: trains[i].trainType,
                trainNumber: trains[i].trainNumber,
                departureStation: departureStation.station,
                terminal: terminal.station,
                cancelled: trains[i].cancelled,
                actualTime: trains[i].timeTableRows[j].actualTime,
                scheduledTime: trains[i].timeTableRows[j].scheduledTime,
              };
              departureTrains.push(departure);
            }
          }
        }
      }
      if (trainType === "ARRIVAL") {
        convert = convertDate(arrivalTrains);
        convert.sort((a, b) => a.time - b.time);
        return convert;
      } else {
        convert = convertDate(departureTrains);
        convert.sort((a, b) => a.time - b.time);
        return convert;
      }
    }
  };

  // Get arrivaltrains from trainss
  return (
    <div>
      <Tabs id="controlled-tab">
        <Tab eventKey="arrival" title="Arrival">
          <TabContent
            titleOne="Train"
            titleTwo="Departure station"
            titleThree="Terminal"
            titleFour="arrives"
            trains={getTrains("ARRIVAL")}
          />
        </Tab>
        <Tab eventKey="departure" title="departure">
          <TabContent
            titleOne="Train"
            titleTwo="Departure station"
            titleThree="Terminal"
            titleFour="Goes"
            trains={getTrains("DEPARTURE")}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Trains;

import React from "react";

import { Table } from "react-bootstrap";

const TabContent = (props) => {
  let trains;
  if (props.trains !== undefined) {
    trains = props.trains;
  } else {
    trains = null;
  }

  const cancelledStyle = (value, index) => {
    let backgroundColor = "#ffffff";

    if ((index & 1) !== 1) {
      backgroundColor = "#e6e6e6";
    }
    if (value === true) {
      return {
        color: "#cccccc",
        backgroundColor,
      };
    } else {
      return {
        color: "#262626",
        backgroundColor,
      };
    }
  };

  return (
    <div className="TabContent">
      <Table borderless responsive>
        <thead>
          <tr>
            <th>{props.titleOne}</th>
            <th>{props.titleTwo}</th>
            <th>{props.titleThree}</th>
            <th>{props.titleFour}</th>
          </tr>
        </thead>
        <tbody>
          {trains !== null
            ? trains.map(
                (item, index) => (
                  (
                    <tr
                      key={index}
                      style={cancelledStyle(item.cancelled, index)}
                    >
                      <td>{item.trainType + " " + item.trainNumber}</td>
                      <td>{item.departureStation}</td>
                      <td>{item.terminal}</td>
                      <td>
                        {item.lateTime !== null ? (
                          <div>
                            <p className="LatestTime">{item.lateTime}</p>
                            <p className="ScheduleTime">
                              {"(" + item.scheduledTime + ")"}
                            </p>
                          </div>
                        ) : (
                          item.scheduledTime
                        )}
                        {item.cancelled ? (
                          <p className="Cancelled">Cancelled</p>
                        ) : null}
                      </td>
                    </tr>
                  )
                )
              )
            : null}
        </tbody>
      </Table>
    </div>
  );
};
export default TabContent;

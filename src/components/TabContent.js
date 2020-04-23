import React from 'react';

import { Table } from 'react-bootstrap';

const TabContent = (props) => {
    let result;
    if (props.result !== undefined) {
              result = props.result;
            } else {
              result = null;
            }

    const cancelledStyle = (value, index) => {
        let backgroundColor = '#ffffff';

        if ((index & 1) !== 1) {
            backgroundColor = '#e6e6e6'
        }
        if (value === true) {
            return {
                color: '#cccccc',
                backgroundColor,
            }
        } else {
            return {
                color: '#262626',
                backgroundColor,
            }
        }
    }

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
                    {
                        result !== null ?
                            result.map((item, index) => (
                                <tr key={index} style={cancelledStyle(item.cancelled, index)}>
                                    <td>{item.trainType + ' ' + item.trainNumber}</td>
                                    <td>{item.departureStation}</td>
                                    <td>{item.terminal}</td>
                                    <td>{item.lateTime !== null ?
                                        <div>
                                            <p className="LatestTime">{item.lateTime}</p>
                                            <p className="ScheduleTime">{'(' + ('0' + item.time.getHours()).slice(-2) + ':' + ('0' + item.time.getMinutes()).slice(-2) + ')'}</p>
                                        </div>
                                        : ('0' + item.time.getHours()).slice(-2) + ':' + ('0' + item.time.getMinutes()).slice(-2)}{item.cancelled ?
                                            <p className="Cancelled">Cancelled</p>
                                            : null}
                                    </td>
                                </tr>
                            ))
                            : null
                    }
                </tbody>
            </Table>
        </div>
    )
}
export default TabContent;
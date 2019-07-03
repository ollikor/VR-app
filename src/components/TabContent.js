import React from 'react'
import { Component } from 'react'

import { Table } from 'react-bootstrap';

class TabContent extends Component {

    cancelledStyle = (value) => {
        if(value === true){
            return {
                color: '#b3b3b3'
            }
        }
    }

    render() {
        return (
            <div className="TabContent">
                <Table borderless responsive>
                    <thead>
                        <tr>
                            <th>{this.props.titleOne}</th>
                            <th>{this.props.titleTwo}</th>
                            <th>{this.props.titleThree}</th>
                            <th>{this.props.titleFour}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.result.length > 0 ?
                                this.props.result.map((item, index) => (
                                    <tr key={index} style={this.cancelledStyle(item.cancelled)}>
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
                                            :null}
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
}

export default TabContent;
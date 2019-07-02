import React from 'react'
import { Component } from 'react'

import { Table } from 'react-bootstrap';

class TabContent extends Component {
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
                                    console.log(item),
                                    <tr key={index}>
                                        <td>{item.trainType + ' ' + item.trainNumber}</td>
                                        <td>{item.departureStation}</td>
                                        <td>{item.terminal}</td>
                                        <td>{item.arrival}</td>
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
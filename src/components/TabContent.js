import React from 'react'
import { Component } from 'react'

import { Table } from 'react-bootstrap';

class TabContent extends Component {

    state = {
        key: 'arrival'
    }

    render() {
        console.log(this.props.results)
        return (
            <div className="TabContent">
                <Table borderless>
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
                            this.props.results.length > 0 ?
                                this.props.results.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Train}</td>
                                        <td>{item.DepartureStation}</td>
                                        <td>{item.Terminal}</td>
                                        <td>{item.Time}</td>
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
import React from 'react'
import { Component } from 'react'

import { Tabs, Tab } from 'react-bootstrap';
import TabContent from './TabContent';

class Results extends Component {

    state = {
        key: 'arrival',
        results: [{
            Train: 'S 165',
            DepartureStation: 'Helsinki',
            Terminal: 'Tampere',
            Time: '10:04'
        }]
    }

    render() {
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
                            results={this.state.results}
                        />
                    </Tab>
                    <Tab eventKey="departure" title="Departure">
                        <TabContent 
                            titleOne={'Train'}
                            titleTwo={'Departure station'}
                            titleThree={'Terminal'}
                            titleFour={'Goes'}
                            results={this.state.results}
                        />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default Results;
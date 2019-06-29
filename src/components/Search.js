import React from 'react'
import { Component } from 'react'

import { Form } from 'react-bootstrap';

class Search extends Component {
    render() {
        return (
            <div className="Search">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Search for a station name</Form.Label>
                        <Form.Control type="search" />
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default Search;
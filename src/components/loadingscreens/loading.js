import React, { Component } from 'react'
import './loading.css'
import Spinner from 'react-bootstrap/Spinner'


class Loading extends Component {
    render() {
        return (
            <div id="loadingscreen-body">
                <div id="loadingscreen-middle">
                    <Spinner animation="border" /> Loading...
                </div>
            </div>
        )
    }
}

export default Loading

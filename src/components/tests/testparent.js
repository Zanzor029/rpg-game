import React, { Component } from 'react';
import "../globalcontext";
import "./tests.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import { showModal, hideModal } from '../../actions/modalActions'
import { connect } from 'react-redux'

class TestParent extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div>
                <Button onClick={() => this.props.showModal({
                    open: true,
                    header: 'Test Header',
                    body: "Test body",
                    buttons: [
                        {
                            title: "Close",
                            action: "hideModal"
                        },
                        {
                            title: "NotClose",
                            action: null
                        },
                    ]
                }, 'alert')}>Show Modal</Button>
            </div>

        );
    }

}

const mapStateToProps = state => ({
    hideModal: state.hideModal,
    showModal: state.showModal
})

export default connect(mapStateToProps, { hideModal, showModal })(withRouter(TestParent))
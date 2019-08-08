import React, { Component } from 'react';
import "../globalcontext";
import "./tests.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import { showModal, hideModal } from '../../actions/modalActions'
import {getEncounterLoot} from '../../actions/worldActions'
import { connect } from 'react-redux'

class TestParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemReceivedLoaded: false,
            itemReceived: null
        }
    }

componentWillMount() {
    this.props.getEncounterLoot(1)
    .then (
        res => {
            console.log(res)
            this.setState({
                itemReceived: res,
                itemReceivedLoaded: true
            })
        }
    )
}


    render() {
        if(!this.state.itemReceivedLoaded){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else {
            return (
                <div>
                    Item Received: {this.state.itemReceived.Name}
                </div>
    
            );
        }

    }

}

const mapStateToProps = state => ({
    hideModal: state.hideModal,
    showModal: state.showModal,
    getEncounterLoot: state.getEncounterLoot
})

export default connect(mapStateToProps, { hideModal, showModal, getEncounterLoot })(withRouter(TestParent))
import history from '../../../history'
import React, { Component } from 'react';
import "../../globalcontext";
import "./encounter.css";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { getEncounterLoot } from '../../../actions/worldActions'
import { showTooltip, hideTooltip } from '../../../actions/tooltipActions'
import { connect } from 'react-redux'

class EncounterFailure extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            character: this.props.loggedincharacter,
            creature: this.props.creature,
            encounterid: this.props.encounterid,
        })
    }

    routeChange(targetpath, state) {
        history.push(targetpath, state);
        setTimeout(function () {
            window.location.reload()
        }, 500)
    }

    render() {
        return (
            <div className="EncounterPostContainerBackground">
            <div className="EncounterPostContainer">
                <p>Encounter failure!</p>
                <p>{this.state.combatresult}</p>
                <p>{this.state.character.Name} was defeated by {this.state.creature.Name}.</p>
                <Link to={{
                    pathname: '/auth/world',
                    state: {
                        characterid: this.state.character.Id
                    }
                }}>
                    <Button variant="success" className="CharacterListBtn" id="CharacterListCreateNewBtn">Continue</Button></Link>
            </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    getEncounterLoot: state.getEncounterLoot,
    showTooltip: state.showTooltip,
    hideTooltip: state.hideTooltip,
    loggedincharacter: state.world.loggedincharacter,
    creature: state.world.creature,
    encounterid: state.world.encounterid
})

export default connect(mapStateToProps, { getEncounterLoot, hideTooltip, showTooltip })(withRouter(EncounterFailure))
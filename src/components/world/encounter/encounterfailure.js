import React, { Component } from 'react';
import "./encounter.css"
import history from '../../../history'

class EncounterFailure extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            character: this.props.location.state.character,
            creature: this.props.location.state.creature,
            encounterid: this.props.location.state.encounterid,
            savestate: this.props.location.state.savestate
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
            <div>
                <p>Encounter failure!</p>
                <p>{this.state.combatresult}</p>
                <p>{this.state.character.Name} was defeated by {this.state.creature.Name}</p>
            </div>
        );
    }

}
export default EncounterFailure;
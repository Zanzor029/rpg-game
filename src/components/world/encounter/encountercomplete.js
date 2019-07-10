import React, { Component } from 'react';
import "./encounter.css"

class EncounterCompleted extends Component {
    constructor(props) {
        super(props);
    }


render() {
    return (
        <div>
            <p>Encounter completed.</p>
            <p>{this.props.location.state.combatresult}</p>
        </div>
    );
}

}
export default EncounterCompleted;
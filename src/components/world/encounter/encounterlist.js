import React, { Component } from 'react';
import "./encounter.css"
import { showModal } from '../../../actions/modalActions'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Table from 'react-bootstrap/Table'


class EncounterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            encounterzoneloaded: false,
            encounterzonelocationid: null,
            encounterzonelocationname: null,
            encountersloaded: false,
            encounters: [],
            selectedencounter: null
        };
    }
    componentWillMount() {
        this.getZoneLocation(this.props.savestate.ZoneLocation)
        this.getZoneEncounters(this.props.savestate.ZoneLocation)
    }

    getZoneLocation(zoneid) {
        const getZoneDataPath = global.ApiStartPath + "zone/" + zoneid
        console.log(getZoneDataPath)
        fetch(getZoneDataPath,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: "GET",
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        encounterzoneloaded: true,
                        encounterzonelocationid: result[0].Id,
                        encounterzonelocationname: result[0].Name
                    });
                },
                (error) => {
                    this.setState({
                        encounterzoneloaded: false,
                        error
                    });
                }
            )
    }
    getZoneEncounters(zoneid) {
        const getZoneDataPath = global.ApiStartPath + "encountersbyzone/" + zoneid
        console.log(getZoneDataPath)
        fetch(getZoneDataPath,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: "GET",
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        encountersloaded: true,
                        encounters: result,
                    });
                    this.props.setSelectedEncounterValueFromChild({Id:result[0].Id,CreatureId:result[0].CreatureId})
                },
                (error) => {
                    this.setState({
                        encountersloaded: false,
                        error
                    });
                }
            )
    }

    selectEncounter(Id) {
        console.log("Encounter selected with ID " + Id)
        this.setState({
            selectedencounter: Id
        });
    }

    render() {
        const { error, encounters, encountersloaded, encounterzoneloaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!encounterzoneloaded) {
            return <div>Loading...</div>;
        }
        else if (!encountersloaded) {
            return <div>Loading...</div>;
        }
        return (
            <div id="EncounterListContainer">
                <i className="far fa-question-circle helperButton" onClick={() => this.props.showModal({
                    open: true,
                    header: 'Character Stats',
                    body: 
                    <div>
                        <div>This table displays available encounters for this zone.</div>
                    </div>
                    ,
                    buttons: [
                        {
                            title: "Close",
                            action: "hideModal"
                        },
                    ]
                }, 'info')}></i>
                <p>Zone: {this.state.encounterzonelocationname}</p>
                <div id="EncounterListGroupContainer">
                <Table hover responsive size="sm" bordered variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Icon</th>
                                <th>Name</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {encounters.map(encounter => (
                                <tr className="EncounterListItem" key={encounter.Id} onClick={() => this.props.setSelectedEncounterValueFromChild({Id:encounter.Id, CreatureId:encounter.CreatureId})}>
                                    <td>{encounter.Id}</td>
                                    <td><img className="EncounterListIcon" src={require('../../../'+encounter.IconPath)}></img></td>
                                    <td>{encounter.Name}</td>
                                    <td>{encounter.Level}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => ({
    showModal: state.showModal,
    loggedincharacter: state.world.loggedincharacter
})

export default connect(mapStateToProps, { showModal })(withRouter(EncounterList))
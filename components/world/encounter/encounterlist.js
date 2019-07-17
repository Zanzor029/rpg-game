import React, { Component } from 'react';
import "./encounter.css"
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                <p>Zone: {this.state.encounterzonelocationname}</p>
                <div id="EncounterListGroupContainer">
                    <ListGroup>
                        {encounters.map(encounter => (
                            <ListGroupItem className="EncounterListItem" action onClick={() => this.props.setSelectedEncounterValueFromChild({Id:encounter.Id, CreatureId:encounter.CreatureId})} key={encounter.Id}>{encounter.Id} : <img className="EncounterListIcon" src={require('../../../'+encounter.IconPath)}></img> Level {encounter.Level} {encounter.Name} </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
        );
    }

}
export default EncounterList;
import React, { Component } from 'react';
import "../globalcontext";
import './world.css';
import history from '../../history';


//import react components
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'

//import underlying components
import QuestLog from './questlog/questlog'
import CharacterPanel from './characterpanel/characterpanel'
import Spellbook from './spellbook/spellbook';
import EncounterList from './encounter/encounterlist';

class World extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: [],
            characterloaded: false,
            error: null,
            savestateloaded: false,
            savestate: [],
            selectedencounter: null,
            selectedspells: []
        };
        this.setSelectedEncounterValueFromChild = this.setSelectedEncounterValueFromChild.bind(this);
    }

    componentWillMount() {
        console.log("World prop:" + this.props.characterid)
        this.getCharacterData();
        this.checkSaveState(this.state.savestateloaded);
    }

    routeChange(targetpath) {
        history.push(targetpath);
        setTimeout(function () {
            window.location.reload()
        }, 500)
    }

    setSelectedEncounterValueFromChild(SelectedEncounter) {
        this.setState({
            selectedencounter: SelectedEncounter
        });
        console.log("Encounter selected with ID " + SelectedEncounter)
    }

    getCharacterData() {
        const getCharacterDataPath = global.ApiStartPath + "character/" + this.props.characterid
        fetch(getCharacterDataPath,
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
                        characterloaded: true,
                        character: result[0]
                    });
                },
                (error) => {
                    this.setState({
                        characterloaded: false,
                        error
                    });
                }
            )
    }

    checkSaveState(loaded) {
        if (loaded == false) {
            const getSaveStatePath = global.ApiStartPath + "savestate/" + this.props.characterid
            fetch(getSaveStatePath,
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
                        if (result.msg == "null") {
                            console.log("0 savestates found")
                            if (loaded == false) {
                                this.createSaveState(false)
                            }

                        }
                        else if (result.msg == "found") {
                            console.log("Savestate found:" + result.result[0].Id)
                            this.setState({
                                savestate: result.result[0],
                                savestateloaded: true
                            });

                        }
                    },
                    (error) => {
                        if (error)
                            this.setState({
                                error
                            });
                    }
                )
        }
    }

    createSaveState(loaded) {
        if (loaded == false) {
            console.log("No savestate found. Creating savestate for character id" + this.props.characterid);
            var payload = {
                Characterid: this.props.characterid,
                ZoneLocation: 1
            }
            var createCharacterApiPath = global.ApiStartPath + "savestate/create"
            fetch(createCharacterApiPath,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(payload)
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            savestate: result,
                            savestateloaded: true
                        });
                    },
                    (error) => {
                        if (error)
                            this.setState({
                                error
                            });
                    }
                )
        }
    }

    render() {
        const { error, character, characterloaded, savestateloaded } = this.state;
        if (!this.props.characterid) {
            this.routeChange("/auth/characterlist")
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!characterloaded) {
            return <div>Loading...</div>;
        }
        else if (!savestateloaded) {
            return <div>Loading...</div>;
        }
        console.log("Savestate when rendered: " + this.state.savestate.Id)
        return (
            <div id="WorldContainer">
                <div id="WorldTabContainer">
                    <Tabs defaultActiveKey="CharacterPanel" id="uncontrolled-tab-example">
                        <Tab eventKey="CharacterPanel" title="Character Panel">
                            <CharacterPanel character={character} />
                        </Tab>
                        <Tab eventKey="Inventory" title="Inventory">
                            <p> List inventory</p>
                        </Tab>
                        <Tab eventKey="QuestLog" title="Quest Log">
                            <QuestLog />
                        </Tab>
                        <Tab eventKey="AvailableEncounters" title="Available Encounters">
                            <EncounterList character={this.state.character} savestate={this.state.savestate} setSelectedEncounterValueFromChild={this.setSelectedEncounterValueFromChild} />
                            <div id="EncounterSelectButton">
                                <Button variant="primary">Start Encounter: {this.state.selectedencounter}</Button>
                            </div>
                        </Tab>
                        <Tab eventKey="Spellbook" title="Spellbook">
                            <Spellbook ClassId={this.state.character.ClassId} />
                        </Tab>

                    </Tabs>
                </div>
            </div>
        );
    }

}
export default World;
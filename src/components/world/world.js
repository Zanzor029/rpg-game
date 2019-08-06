import React, { Component } from 'react';
import "../globalcontext";
import './world.css';
import history from '../../history';
import Loading from '../loadingscreens/loading'
import { BrowserRouter as Router, Route, Link, withRouter} from "react-router-dom";
import { setLoggedInCharacter } from '../../actions/characterActions'
import { connect } from 'react-redux'

//import react bootstrap components
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'

//import underlying components
import QuestLog from './questlog/questlog'
import CharacterPanel from './characterpanel/characterpanel'
import Spellbook from './spellbook/spellbook';
import EncounterList from './encounter/encounterlist';
import Inventory from './inventory/inventory'
import Equipment from './equipment/equipment';

class World extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: [],
            characterloaded: false,
            error: null,
            savestateloaded: false,
            savestate: [],
            selectedspells: [],
            characterid: null,
            loggedInCharacterSet: false
        };
        this.setSelectedEncounterValueFromChild = this.setSelectedEncounterValueFromChild.bind(this);
        this.setSelectedSpellsValueFromChild = this.setSelectedSpellsValueFromChild.bind(this);
    }

    componentWillMount() {
        if(!this.props.location.state) {
            this.props.history.push("/auth/characterlist");
        }

        else {
            console.log("World prop:" + this.props.location.state.characterid)
            this.getCharacterData(this.props.location.state.characterid);
            this.checkSaveState(this.state.savestateloaded);
        }

    }

    routeChange(targetpath) {
        history.push(targetpath);
        setTimeout(function () {
            window.location.reload()
        }, 500)
    }

    setSelectedEncounterValueFromChild(SelectedEncounter) {
        this.setState({
            selectedencounterid: SelectedEncounter.Id,
            selectedcreatureid: SelectedEncounter.CreatureId
        });
        console.log(SelectedEncounter)
        console.log("Encounter selected with ID " + SelectedEncounter.Id + " and Creature ID " + SelectedEncounter.CreatureId)
    }
    setSelectedSpellsValueFromChild(SelectedSpells) {
        this.setState({
            selectedspells: SelectedSpells
        });
    }

    getCharacterData(charid) {
        const getCharacterDataPath = global.ApiStartPath + "character/" + charid
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
                    let dosetLoggedInCharacter = async () => {
                        let res = await this.props.setLoggedInCharacter(result[0])    
                        return res
                      }
                      dosetLoggedInCharacter()
                      .then(
                          console.log("Logged in character set in redux store"),
                          this.setState({
                            loggedInCharacterSet: true
                          })
                      )                   
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
            const getSaveStatePath = global.ApiStartPath + "savestate/" + this.props.location.state.characterid
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
            if (this.state.character.Faction == "Horde") {
                var zonevalue = 2
            } else {
                var zonevalue = 1
            }
            var payload = {
                Characterid: this.props.characterid,
                ZoneLocation: zonevalue
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
        const { error, character, characterloaded, savestateloaded,loggedInCharacterSet } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!characterloaded) {
            return <Loading />
        }
        else if (!savestateloaded) {
            return <Loading />
        }
        else if (!loggedInCharacterSet) {
            return <Loading />
        }
        console.log("Savestate when rendered: " + this.state.savestate.Id)
        return (
            <div id="WorldContainer">
                <div id="WorldTabContainer">
                    <Tabs defaultActiveKey="CharacterPanel" id="worldtab" variant="tabs">
                        <Tab eventKey="CharacterPanel" title="Character Panel">
                            <CharacterPanel />
                        </Tab>
                        <Tab eventKey="Inventory" title="Inventory">
                            <Equipment />
                            <br />
                            <Inventory/>
                        </Tab>
                        <Tab eventKey="QuestLog" title="Quest Log">
                            <QuestLog />
                        </Tab>
                        <Tab eventKey="AvailableEncounters" title="Available Encounters">
                            <EncounterList character={this.state.character} savestate={this.state.savestate} setSelectedEncounterValueFromChild={this.setSelectedEncounterValueFromChild} />
                            <div id="EncounterSelectButton">
                                <Link to={{
                                    pathname: '/auth/encounter',
                                    state: {
                                        savestate: this.state.savestate,
                                        selectedspells: this.state.selectedspells,
                                        character: this.state.character,
                                        selectedencounterid: this.state.selectedencounterid,
                                        selectedcreatureid: this.state.selectedcreatureid
                                    }
                                }}>
                                    <Button variant="success">Start Encounter: {this.state.selectedencounterid}</Button>
                                </Link>
                            </div>
                        </Tab>
                        <Tab eventKey="Spellbook" title="Spellbook">
                            <Spellbook ClassId={this.state.character.ClassId} setSelectedSpellsValueFromChild={this.setSelectedSpellsValueFromChild} />
                        </Tab>

                    </Tabs>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    setLoggedInCharacter: state.setLoggedInCharacter
})

export default connect(mapStateToProps, { setLoggedInCharacter })(withRouter(World))
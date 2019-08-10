import React, { Component } from 'react';
import "../globalcontext";
import './world.css';
import history from '../../history';
import Loading from '../loadingscreens/loading'
import { BrowserRouter as Router, Route, Link, withRouter} from "react-router-dom";
import { setLoggedInCharacter, setEncounterId } from '../../actions/worldActions'
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
import Store from './store/store';

class World extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: [],
            characterloaded: false,
            error: null,
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

        //Set the encounter id in Redux
        this.props.setEncounterId(SelectedEncounter.Id)

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


    render() {
        const { error, characterloaded,loggedInCharacterSet } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!characterloaded) {
            return <Loading />
        }
        else if (!loggedInCharacterSet) {
            return <Loading />
        }
        console.log("ZoneLocation when rendered: " + this.props.loggedincharacter.ZoneLocation)
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
                        <Tab eventKey="Store" title="Store">
                            <Store/>
                        </Tab>
                        <Tab eventKey="QuestLog" title="Quest Log">
                            <QuestLog />
                        </Tab>
                        <Tab eventKey="AvailableEncounters" title="Available Encounters">
                            <EncounterList setSelectedEncounterValueFromChild={this.setSelectedEncounterValueFromChild} />
                            <div id="EncounterSelectButton">
                                <Link to={{
                                    pathname: '/auth/encounter',
                                    state: {
                                        selectedspells: this.state.selectedspells,
                                        character: this.props.loggedincharacter,
                                        selectedencounterid: this.state.selectedencounterid,
                                        selectedcreatureid: this.state.selectedcreatureid
                                    }
                                }}>
                                    <Button variant="success">Start Encounter: {this.state.selectedencounterid}</Button>
                                </Link>
                            </div>
                        </Tab>
                        <Tab eventKey="Spellbook" title="Spellbook">
                            <Spellbook ClassId={this.props.loggedincharacter.ClassId} setSelectedSpellsValueFromChild={this.setSelectedSpellsValueFromChild} />
                        </Tab>

                    </Tabs>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    setLoggedInCharacter: state.setLoggedInCharacter,
    loggedincharacter: state.world.loggedincharacter,
    setEncounterId: state.setEncounterId
})

export default connect(mapStateToProps, { setLoggedInCharacter, setEncounterId })(withRouter(World))
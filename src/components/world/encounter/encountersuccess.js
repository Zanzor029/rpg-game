import React, { Component } from 'react';
import "../../globalcontext";
import "./encounter.css";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { getEncounterLoot } from '../../../actions/worldActions'
import { showTooltip, hideTooltip } from '../../../actions/tooltipActions'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'

class EncounterSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: this.props.loggedincharacter,
            creature: this.props.creature,
            encounterid: this.props.encounterid,
            xpcalculated: false,
        }
    }

    componentWillMount() {
        this.props.getEncounterLoot(1)
            .then(
                res => {
                    console.log(res)
                    this.setState({
                        itemReceived: res,
                        itemReceivedLoaded: true
                    })
                }
            )
    }

    componentDidMount() {
        this.calculateExperienceGain(this.state.character, this.state.creature)
    }

    calculateExperienceGain(character, creature) {
        console.log("Character level is: " + character.Level)
        console.log("Creature level is :" + creature.Level)

        var xpvalue = (character.Level * 5) + 45
        var xptolevel = (2 * character.Level) * xpvalue
        var xpmodifier = 1
        if (character.GrayLevel >= creature.Level) {
            var xpmodifier = 0
        }
        if ((creature.Level) >= character.Level + 5) {
            var xpmodifier = 2
        }
        if ((creature.Level) <= character.Level - 3) {
            var xpmodifier = 0.75
        }
        var xpgain = Math.round(xpvalue * xpmodifier)
        console.log("XP gained " + xpgain)
        console.log("Current XP Points: " + this.state.character.ExperiencePoints)
        console.log("XP needed to level: " + xptolevel)
        if (this.state.character.ExperiencePoints + xpgain >= xptolevel) {
            console.log("Level Up!")
            var payload = {
                Id: this.state.character.Id,
                Level: this.state.character.Level + 1,
                ExperiencePoints: this.state.character.ExperiencePoints + xpgain - xptolevel,
                StatPoints: this.state.character.StatPoints + 10
            }
            this.setState({
                levelup: true,
                xpgain: xpgain
            })
        }
        else {
            this.setState({
                levelup: false,
                xpgain: xpgain
            })
            var payload = {
                Id: this.state.character.Id,
                Level: this.state.character.Level,
                ExperiencePoints: this.state.character.ExperiencePoints + xpgain,
                StatPoints: this.state.character.StatPoints
            }
        }


        var xpGainApiPath = global.ApiStartPath + "character/expgain"
        fetch(xpGainApiPath,
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
                    console.log(result)
                    this.setState({
                        xpcalculated: true
                    })
                },
                (error) => {
                    if (error)
                        this.setState({
                            error
                        });
                }
            )
    }

    render() {
        const { error, xpcalculated, character, creature, levelup, xpgain } = this.state;
        if (!this.state.itemReceivedLoaded) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!xpcalculated) {
            return <div>Loading...</div>;
        }
        else {
            if (levelup === true) {
                return (
                    <div className="EncounterPostContainerBackground">
                        <div className="EncounterPostContainer">
                            <p>{character.Name} defeated {creature.Name} and gained {xpgain} experience. </p>
                            <p>{character.Name} have received an item: </p>
                            <Table hover responsive size="sm" bordered variant="dark">
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Item Slot</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr key={this.state.itemReceived.ItemId} id={"InventoryTablerow-" + this.state.itemReceived.ItemId}
                                        onMouseOver={(e) => this.props.showTooltip({
                                            object: this.state.itemReceived,
                                            positionY: e.clientY,
                                            positionX: e.clientX
                                        }, "item")}
                                        onMouseOut={() => this.props.hideTooltip()}>
                                        <td><img className="InventoryIcon" src={require('../../../' + this.state.itemReceived.IconPath)}></img></td>
                                        <td>{this.state.itemReceived.Name}</td>
                                        <td>{this.state.itemReceived.ItemSlot}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <p>{character.Name} has gained a level and grows in power!</p>
                            <div >
                                <Link to={{
                                    pathname: '/auth/levelup',
                                    state: {
                                        character: character,
                                        levelup: levelup
                                    }
                                }}>

                                    <Button variant="success" className="CharacterListBtn" id="CharacterListCreateNewBtn">Continue</Button></Link>
                            </div>
                        </div>
                    </div>
                )
            }
            return (
                <div className="EncounterPostContainerBackground">
                    <div className="EncounterPostContainer">
                        <p>{character.Name} defeated {creature.Name} and gained {xpgain} experience.</p>
                        <p>{character.Name} have received an item: </p>
                        <Table hover responsive size="sm" bordered variant="dark">
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Item Slot</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={this.state.itemReceived.ItemId} id={"InventoryTablerow-" + this.state.itemReceived.ItemId}
                                    onMouseOver={(e) => this.props.showTooltip({
                                        object: this.state.itemReceived,
                                        positionY: e.clientY,
                                        positionX: e.clientX
                                    }, "item")}
                                    onMouseOut={() => this.props.hideTooltip()}>
                                    <td><img className="InventoryIcon" src={require('../../../' + this.state.itemReceived.IconPath)}></img></td>
                                    <td>{this.state.itemReceived.Name}</td>
                                    <td>{this.state.itemReceived.ItemSlot}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div>
                            <Link to={{
                                pathname: '/auth/world',
                                state: {
                                    characterid: this.state.character.Id
                                }
                            }}>
                                <Button variant="success" className="CharacterListBtn" id="CharacterListCreateNewBtn">Continue</Button></Link>
                        </div>

                    </div>
                </div>
            );
        }

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

export default connect(mapStateToProps, { getEncounterLoot, hideTooltip, showTooltip })(withRouter(EncounterSuccess))
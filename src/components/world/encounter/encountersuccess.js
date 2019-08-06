import React, { Component } from 'react';
import "../../globalcontext";
import "./encounter.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

class EncounterSuccess extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            character: this.props.location.state.character,
            creature: this.props.location.state.creature,
            encounterid: this.props.location.state.encounterid,
            savestate: this.props.location.state.savestate,
            xpcalculated: false,
        })
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
        const { error, xpcalculated, character, creature, combatresult, levelup, xpgain } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!xpcalculated) {
            return <div>Loading...</div>;
        }
        else {
            if (levelup === true) {
                return (
                    <div>
                        <p>{character.Name} defeated {creature.Name} and gained {xpgain} experience. {character.Name} has gained a level and grows in power! </p>
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
                )
            }
            return (
                <div>
                    <div className="flex-item">


                        <p>{character.Name} defeated {creature.Name} and gained {xpgain} experience.</p>
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
export default EncounterSuccess;
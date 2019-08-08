import React, { Component } from 'react';
import "./levelup.css"
import "../../globalcontext";
import history from '../../../history';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

class LevelUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: null,
            newstrength: null,
            newagility: null,
            newstamina: null,
            newintellect: null,
            newspirit: null,
            pointsremaining: null,
            saved: false,
        }
    }



    componentWillMount() {
        if (!this.props.location.state) {
            this.routeChange("/auth/characterlist")
        }
        else {
            this.getCharacterData(this.props.location.state.character.Id)
            this.setState({
                newstrength: this.props.location.state.character.Strength,
                newagility: this.props.location.state.character.Agility,
                newstamina: this.props.location.state.character.Stamina,
                newintellect: this.props.location.state.character.Intellect,
                newspirit: this.props.location.state.character.Spirit
            })
        }
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
                        character: result[0],
                        pointsremaining: result[0].StatPoints
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

    routeChange(targetpath, state) {
        history.push(targetpath, state);
        setTimeout(function () {
            window.location.reload()
        }, 500)
    }

    changeStat(Method, Attribute) {
        console.log("Change state: " + Method + Attribute);
        if (Method === "Plus") {
            if (this.state.pointsremaining === 0) {
                return
            }
            if (Attribute === "Strength") {
                let newstrengthcopy = this.state.newstrength
                this.setState({
                    pointsremaining: this.state.pointsremaining - 1,
                    newstrength: newstrengthcopy + 1
                })
            }
            if (Attribute === "Agility") {
                let newagilitycopy = this.state.newagility
                this.setState({
                    pointsremaining: this.state.pointsremaining - 1,
                    newagility: newagilitycopy + 1
                })
            }
            if (Attribute === "Stamina") {
                let newstaminacopy = this.state.newstamina
                this.setState({
                    pointsremaining: this.state.pointsremaining - 1,
                    newstamina: newstaminacopy + 1
                })
            }
            if (Attribute === "Intellect") {
                let newintellectcopy = this.state.newintellect
                this.setState({
                    pointsremaining: this.state.pointsremaining - 1,
                    newintellect: newintellectcopy + 1
                })
            }
            if (Attribute === "Spirit") {
                let newspiritcopy = this.state.newspirit
                this.setState({
                    pointsremaining: this.state.pointsremaining - 1,
                    newspirit: newspiritcopy + 1
                })
            }
        }
        if (Method === "Minus") {
            if (this.state.pointsremaining === 10) {
                return
            }
            if (Attribute === "Strength") {
                if (this.state.newstrength - 1 < this.state.character.Strength) {
                    return
                }
                let newstrengthcopy = this.state.newstrength
                this.setState({
                    pointsremaining: this.state.pointsremaining + 1,
                    newstrength: newstrengthcopy - 1
                })
            }
            if (Attribute === "Agility") {
                if (this.state.newagility - 1 < this.state.character.Agility) {
                    return
                }
                let newagilitycopy = this.state.newagility
                this.setState({
                    pointsremaining: this.state.pointsremaining + 1,
                    newagility: newagilitycopy - 1
                })
            }
            if (Attribute === "Stamina") {
                if (this.state.newstamina - 1 < this.state.character.Stamina) {
                    return
                }
                let newstaminacopy = this.state.newstamina
                this.setState({
                    pointsremaining: this.state.pointsremaining + 1,
                    newstamina: newstaminacopy - 1
                })
            }
            if (Attribute === "Intellect") {
                if (this.state.newintellect - 1 < this.state.character.Intellect) {
                    return
                }
                let newintellectcopy = this.state.newintellect
                this.setState({
                    pointsremaining: this.state.pointsremaining + 1,
                    newintellect: newintellectcopy - 1
                })
            }
            if (Attribute === "Spirit") {
                if (this.state.newspirit - 1 < this.state.character.Spirit) {
                    return
                }
                let newspiritcopy = this.state.newspirit
                this.setState({
                    pointsremaining: this.state.pointsremaining + 1,
                    newspirit: newspiritcopy - 1
                })
            }
        }
    }

    saveStatChanges() {
       if(this.state.pointsremaining !== 0) {
           alert("You must spend all your attribute points!")
           return
       }
        var statGainApiPath = global.ApiStartPath + "character/statgain"
        var payload = {
            Id: this.state.character.Id,
            Strength: this.state.newstrength,
            Agility: this.state.newagility,
            Stamina: this.state.newstamina,
            Intellect: this.state.newintellect,
            Spirit: this.state.newspirit,
            StatPoints: this.state.character.statpoints + this.state.pointsremaining - 10
        }

        fetch(statGainApiPath,
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
                        saved: true
                    })
                    this.routeChange("/auth/world", {
                        characterid: this.state.character.Id
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
        const { error, characterloaded, } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!characterloaded) {
            return <div>Loading...</div>;
        }
        return (
            <div className="LevelUpContainerBackground">
                <div className="LevelUpContainer">
                    <div className="flex-container">
                        <div id="LevelUpRemainingPointsContainer" className="flex-item">
                            <p>You have gained a level and can spend Attribute points!</p>
                            <p>There are <strong>{this.state.pointsremaining} </strong>points remaining.</p>
                        </div>
                    </div>
                    <Table bordered hover size="sm" variant="dark">
                        <thead>
                            <tr>
                                <th>Stat</th>
                                <th>Value</th>
                                <th>Add</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Strength</td>
                                <td>{this.state.newstrength}</td>
                                <td><div className="LevelUpPlus" onClick={() => this.changeStat("Plus", "Strength")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-plus-square" ></i></Button></div></td>
                                <td><div className="LevelUpMinus" onClick={() => this.changeStat("Minus", "Strength")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-minus-square"></i></Button></div></td>
                            </tr>
                            <tr>
                                <td>Agility</td>
                                <td>{this.state.newagility}</td>
                                <td><div className="LevelUpPlus" onClick={() => this.changeStat("Plus", "Agility")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-plus-square" ></i></Button></div></td>
                                <td><div className="LevelUpMinus" onClick={() => this.changeStat("Minus", "Agility")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-minus-square"></i></Button></div></td>
                            </tr>
                            <tr>
                                <td>Stamina</td>
                                <td>{this.state.newstamina}</td>
                                <td><div className="LevelUpPlus" onClick={() => this.changeStat("Plus", "Stamina")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-plus-square" ></i></Button></div></td>
                                <td><div className="LevelUpMinus" onClick={() => this.changeStat("Minus", "Stamina")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-minus-square"></i></Button></div></td>
                            </tr>
                            <tr>
                                <td>Intellect</td>
                                <td>{this.state.newintellect}</td>
                                <td><div className="LevelUpPlus" onClick={() => this.changeStat("Plus", "Intellect")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-plus-square" ></i></Button></div></td>
                                <td><div className="LevelUpMinus" onClick={() => this.changeStat("Minus", "Intellect")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-minus-square"></i></Button></div></td>
                            </tr>
                            <tr>
                                <td>Spirit</td>
                                <td>{this.state.newspirit}</td>
                                <td><div className="LevelUpPlus" onClick={() => this.changeStat("Plus", "Spirit")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-plus-square" ></i></Button></div></td>
                                <td><div className="LevelUpMinus" onClick={() => this.changeStat("Minus", "Spirit")}><Button variant="dark" className="LevelUpStatBtn"><i class="far fa-minus-square"></i></Button></div></td>
                            </tr>
                        </tbody>
                    </Table>
                    <div id="SaveChanges" className="flex-item" onClick={() => this.saveStatChanges()}>
                        <Button variant="success" className="SaveChangesBtn">Save changes</Button>

                    </div>

                </div>
            </div>
        );
    }

}
export default LevelUp;
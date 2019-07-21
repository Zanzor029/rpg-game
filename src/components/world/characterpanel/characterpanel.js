import React, { Component } from 'react';
import "./characterpanel.css"
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import store from '../../../store';

class CharacterPanel extends Component {   
    render() {
        var xpvalue = (this.props.character.Level * 5) + 45
        var xptolevel = (2 * this.props.character.Level) * xpvalue
        const loggedincharacter = store.getState().world.loggedincharacter
        
        return (

            <div id="StatTableContainer">
            <br />
            <br />
                <Table responsive size="sm">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{loggedincharacter.Name}</td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td>{loggedincharacter.Level}</td>
                        </tr>
                        <tr>
                            <td>Experience</td>
                            <td><ProgressBar now={Math.round((loggedincharacter.ExperiencePoints / xptolevel) * 100)} label={loggedincharacter.ExperiencePoints + " / " + xptolevel + " (" + Math.round((loggedincharacter.ExperiencePoints / xptolevel) * 100) + "%)"} /></td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td><img className="StatTableIcon" src={require('../../../' + loggedincharacter.ClassIconPath)}></img> {loggedincharacter.Class}</td>
                        </tr>
                        <tr>
                            <td>Race</td>
                            <td><img className="StatTableIcon" src={require('../../../' + loggedincharacter.RaceIconPath)}></img> {loggedincharacter.Race}</td>
                        </tr>
                        <tr>
                            <td>Strength</td>
                            <td>{loggedincharacter.Strength}</td>
                        </tr>
                        <tr>
                            <td>Agility</td>
                            <td>{loggedincharacter.Agility}</td>
                        </tr>
                        <tr>
                            <td>Stamina</td>
                            <td>{loggedincharacter.Stamina}</td>
                        </tr>
                        <tr>
                            <td>Intellect</td>
                            <td>{loggedincharacter.Intellect}</td>
                        </tr>
                        <tr>
                            <td>Spirit</td>
                            <td>{loggedincharacter.Spirit}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default CharacterPanel
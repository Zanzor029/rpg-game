import React, { Component } from 'react';
import "./characterpanel.css"
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import store from '../../../store';
import { connect } from 'react-redux'
class CharacterPanel extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        var xpvalue = (this.props.character.Level * 5) + 45
        var xptolevel = (2 * this.props.character.Level) * xpvalue
        const loggedincharacter = store.getState().characters.loggedincharacter
        return (

            <div id="StatTableContainer">
                <div>
                    redux testing Name: {loggedincharacter.Name}
                    
            </div>
            <br />
            <br />
                <Table responsive size="sm">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{this.props.character.Name}</td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td>{this.props.character.Level}</td>
                        </tr>
                        <tr>
                            <td>Experience</td>
                            <td><ProgressBar now={Math.round((this.props.character.ExperiencePoints / xptolevel) * 100)} label={this.props.character.ExperiencePoints + " / " + xptolevel + " (" + Math.round((this.props.character.ExperiencePoints / xptolevel) * 100) + "%)"} /></td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td><img className="StatTableIcon" src={require('../../../' + this.props.character.ClassIconPath)}></img> {this.props.character.Class}</td>
                        </tr>
                        <tr>
                            <td>Race</td>
                            <td><img className="StatTableIcon" src={require('../../../' + this.props.character.RaceIconPath)}></img> {this.props.character.Race}</td>
                        </tr>
                        <tr>
                            <td>Strength</td>
                            <td>{this.props.character.Strength}</td>
                        </tr>
                        <tr>
                            <td>Agility</td>
                            <td>{this.props.character.Agility}</td>
                        </tr>
                        <tr>
                            <td>Stamina</td>
                            <td>{this.props.character.Stamina}</td>
                        </tr>
                        <tr>
                            <td>Intellect</td>
                            <td>{this.props.character.Intellect}</td>
                        </tr>
                        <tr>
                            <td>Spirit</td>
                            <td>{this.props.character.Spirit}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}

const mapStateToProps = store => ({
    loggedincharacter: store.loggedincharacter

})

export default connect(mapStateToProps)(CharacterPanel)
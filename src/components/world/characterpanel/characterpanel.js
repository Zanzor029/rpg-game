import React, { Component } from 'react';
import "./characterpanel.css"
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

import { showModal } from '../../../actions/modalActions'
import { connect } from 'react-redux'

class CharacterPanel extends Component {
    render() {
        var xpvalue = (this.props.loggedincharacter.Level * 5) + 45
        var xptolevel = (2 * this.props.loggedincharacter.Level) * xpvalue

        return (

            <div id="StatTableContainer">
                <i className="far fa-question-circle helperButton" onClick={() => this.props.showModal({
                    open: true,
                    header: 'Character Stats',
                    body: 
                    <div>
                        <div>This panel displays your characters stats.</div>
                        <ul>
                            <li>Stamina will increase your health.</li>
                            <li>Intellect will increase your mana, and increase the potency of Magic based abilities.</li>
                            <li>Spirit will increase your mana regeneration.</li>
                            <li>Strength will increase the potency of Physical based abilities.</li>
                            <li>Agility will increase the chance for your abilities to critically strike, dealing double damage.</li>
                        </ul>
                    </div>
                    ,
                    buttons: [
                        {
                            title: "Close",
                            action: "hideModal"
                        },
                    ]
                }, 'info')}></i>
                <Table responsive size="sm" variant="dark">
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{this.props.loggedincharacter.Name}</td>
                        </tr>
                        <tr>
                            <td>Level</td>
                            <td>{this.props.loggedincharacter.Level}</td>
                        </tr>
                        <tr>
                            <td>Gold Coins</td>
                            <td>{this.props.loggedincharacter.GoldCoins}</td>
                        </tr>
                        <tr>
                            <td>Experience</td>
                            <td><ProgressBar now={Math.round((this.props.loggedincharacter.ExperiencePoints / xptolevel) * 100)} label={this.props.loggedincharacter.ExperiencePoints + " / " + xptolevel + " (" + Math.round((this.props.loggedincharacter.ExperiencePoints / xptolevel) * 100) + "%)"} /></td>
                        </tr>
                        <tr>
                            <td>Class</td>
                            <td><img className="StatTableIcon" src={require('../../../' + this.props.loggedincharacter.ClassIconPath)}></img> {this.props.loggedincharacter.Class}</td>
                        </tr>
                        <tr>
                            <td>Race</td>
                            <td><img className="StatTableIcon" src={require('../../../' + this.props.loggedincharacter.RaceIconPath)}></img> {this.props.loggedincharacter.Race}</td>
                        </tr>
                        <tr>
                            <td>Strength</td>
                            <td>{this.props.loggedincharacter.Strength}</td>
                        </tr>
                        <tr>
                            <td>Agility</td>
                            <td>{this.props.loggedincharacter.Agility}</td>
                        </tr>
                        <tr>
                            <td>Stamina</td>
                            <td>{this.props.loggedincharacter.Stamina}</td>
                        </tr>
                        <tr>
                            <td>Intellect</td>
                            <td>{this.props.loggedincharacter.Intellect}</td>
                        </tr>
                        <tr>
                            <td>Spirit</td>
                            <td>{this.props.loggedincharacter.Spirit}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    showModal: state.showModal,
    loggedincharacter: state.world.loggedincharacter
})

export default connect(mapStateToProps, { showModal })(withRouter(CharacterPanel))
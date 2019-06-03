import React, { Component } from 'react';
import "../globalcontext"
import "./charactercard.css"

class CharacterCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Highlighted: "No"
        };
    }

    selectCharacter(e) {
        console.log("Selected CharacterID " + e.currentTarget.id.split("-")[1])
        global.SelectedCharacterListId = e.currentTarget.id;
        global.SelectedCharacter = e.currentTarget.id.split("-")[1];

        //set highlight, clears previous highlight first
        var els = document.getElementsByClassName('highlightcharacter')
        while (els[0]) {
            els[0].classList.remove('highlightcharacter')
        }
        e.currentTarget.className = "CharacterList highlightcharacter"
    }

    render() {
        return (
            <li className="CharacterList" id={"CharacterListRowID-" + this.props.Id} key={this.props.Id} onClick={this.selectCharacter}>
                <div className="CharacterListRow" id={"CharacterListRowID-" + this.state.Id}>
                    <div className="CharacterListName">
                        {this.props.Name}
                    </div>
                    <div className="CharacterListImagesHolder">
                        <div className="CharacterRaceImageHolder">
                            <img className="CharacterRaceImage" src={require("../../" + this.props.RaceIconPath)} alt={this.props.Race} />
                        </div>
                        <div className="CharacterClassImageHolder">
                            <img className="CharacterClassImage" src={require("../../" + this.props.ClassIconPath)} alt={this.props.Class} />
                        </div>
                    </div>
                    <div className="CharacterListLevelRaceClass">
                        Level {this.props.Level} {this.props.Race} {this.props.Class}
                    </div>
                </div>
            </li>
        );
    }

}
export default CharacterCard;
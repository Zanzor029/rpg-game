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


render() {
    return (
        // <li className="CharacterList" id={"CharacterListRowID-" + this.props.Id} key={this.props.Id} onClick={this.selectCharacter}>
        <li className="CharacterList" id={"CharacterListRowID-" + this.props.Id} key={this.props.Id} onClick = {(event) => { this.props.setSelectedCharacterId(event) }}>
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
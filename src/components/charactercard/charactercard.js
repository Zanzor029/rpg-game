import React, { Component } from 'react';
import "../globalcontext"
import "./charactercard.css"

class CharacterCard extends Component {
render() {
    return (
        <li className={`${this.props.selected === "yes" ? 'CharacterList selectedcharacter' : 'CharacterList'}`} id={"CharacterListRowID-" + this.props.character.Id} key={this.props.Id} onClick={() => this.props.onClick(this.props.character)} >
            <div className={`${this.props.selected === "yes" ? 'CharacterListRow selectedcharacter' : 'CharacterListRow'}`} id={"CharacterListRowID-" + this.props.character.Id}>
                <div className="CharacterListName">
                    {this.props.character.Name}
                </div>
                <div className="CharacterListImagesHolder">
                    <div className="CharacterRaceImageHolder">
                        <img className="CharacterRaceImage" src={require("../../" + this.props.character.RaceIconPath)} alt={this.props.character.Race} />
                    </div>
                    <div className="CharacterClassImageHolder">
                        <img className="CharacterClassImage" src={require("../../" + this.props.character.ClassIconPath)} alt={this.props.character.Class} />
                    </div>
                </div>
                <div className="CharacterListLevelRaceClass">
                    Level {this.props.character.Level} {this.props.character.Race} {this.props.character.Class}
                </div>
            </div>
        </li>
    );
}

}
export default CharacterCard;
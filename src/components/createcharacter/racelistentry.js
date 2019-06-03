import React, { Component } from 'react';
import "../globalcontext"
import ReactDOM from "react-dom";
import LoreBox from '../lorebox/lorebox';

class RaceListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Highlighted: "No"
        };
    }
    selectRace(e, RaceArr) {
        console.log("Selected RaceId " + e.currentTarget.id.split("-")[1]);
        global.CreateCharacterSelectedRaceId = e.currentTarget.id.split("-")[1];

        //set highlight, clears previous highlight first
        var els = document.getElementsByClassName('highlightclass');
        while (els[0]) {
            els[0].classList.remove('highlightclass')
        }
        e.currentTarget.className = "racelistentry highlightclass";

        //Get property of specific object in array from an ID
        if (RaceArr.length > 0) {
            const SeletedRaceObject = RaceArr.filter((obj) => obj.Id === parseInt(e.currentTarget.id.split("-")[1]))
            console.log(SeletedRaceObject[0].Name)
            global.CreateCharacterSelectedRaceName = SeletedRaceObject[0].Name

            ReactDOM.render(
                <LoreBox
                    LoreBoxTitle={SeletedRaceObject[0].Name}
                    LoreBoxText={SeletedRaceObject[0].RaceDescription}
                    LoreBoxIcon={require("../../" + SeletedRaceObject[0].MaleIconPath)}
                />, document.getElementById("RaceLoreBox")
            );
            ReactDOM.render(
                <LoreBox
                    LoreBoxTitle={SeletedRaceObject[0].Faction}
                    LoreBoxText={SeletedRaceObject[0].FactionDescription}
                    LoreBoxIcon={require("../../" + SeletedRaceObject[0].FactionIconPath)}
                />, document.getElementById("FactionLoreBox")
            );

            global.CreateCharacterSelectedFaction = SeletedRaceObject[0].Faction;
            global.CreateCharacterSelectedRaceMaleIconPath = SeletedRaceObject[0].MaleIconPath;
            global.CreateCharacterSelectedRaceFemaleIconPath = SeletedRaceObject[0].FemaleIconPath;
            global.CreateCharacterSelectedRaceBaseStrength = SeletedRaceObject[0].BaseStrength;
            global.CreateCharacterSelectedRaceBaseAgility = SeletedRaceObject[0].BaseAgility;
            global.CreateCharacterSelectedRaceBaseStamina = SeletedRaceObject[0].BaseStamina;
            global.CreateCharacterSelectedRaceBaseIntellect = SeletedRaceObject[0].BaseIntellect;
            global.CreateCharacterSelectedRaceBaseSpirit = SeletedRaceObject[0].BaseSpirit;

            global.CreateCharacterSelectedCombinedBaseStrength = global.CreateCharacterSelectedClassBaseStrength + global.CreateCharacterSelectedRaceBaseStrength
            document.getElementById("selectedBaseStrengthValue").innerHTML = global.CreateCharacterSelectedCombinedBaseStrength
            global.CreateCharacterSelectedCombinedBaseAgility = global.CreateCharacterSelectedClassBaseAgility + global.CreateCharacterSelectedRaceBaseAgility
            document.getElementById("selectedBaseAgilityValue").innerHTML = global.CreateCharacterSelectedCombinedBaseAgility
            global.CreateCharacterSelectedCombinedBaseStamina = global.CreateCharacterSelectedClassBaseStamina + global.CreateCharacterSelectedRaceBaseStamina
            document.getElementById("selectedBaseStaminaValue").innerHTML = global.CreateCharacterSelectedCombinedBaseStamina;
            global.CreateCharacterSelectedCombinedBaseIntellect = global.CreateCharacterSelectedClassBaseIntellect + global.CreateCharacterSelectedRaceBaseIntellect
            document.getElementById("selectedBaseIntValue").innerHTML = global.CreateCharacterSelectedCombinedBaseIntellect
            global.CreateCharacterSelectedCombinedBaseSpirit = global.CreateCharacterSelectedClassBaseSpirit + global.CreateCharacterSelectedRaceBaseSpirit
            document.getElementById("selectedBaseSpiValue").innerHTML = global.CreateCharacterSelectedCombinedBaseSpirit
        }
    }

    render() {
        return (
            <li className={this.props.RaceListEntryClassName} id={this.props.RaceListEntryId} key={this.props.RaceListEntryKey} onClick={(e) => { this.selectRace(e, global.RacesArr) }}>
                <img id={this.props.RaceListEntryId+"-img"}className="raceimg" src={this.props.RaceListEntryImgPath} alt={this.props.RaceListEntryImgText} />
            </li>
        );
    }
}
export default RaceListEntry;
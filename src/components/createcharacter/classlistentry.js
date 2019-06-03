import React, { Component } from 'react';
import "../globalcontext"
import ReactDOM from "react-dom";
import LoreBox from '../lorebox/lorebox';

class ClassListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Highlighted: "No"
        };
    }
    selectClass(e, ClassArr) {
        console.log("Selected Class " + e.currentTarget.id.split("-")[1])
        global.CreateCharacterSelectedClassId = e.currentTarget.id.split("-")[1];

        //set highlight, clears previous highlight first
        var els = document.getElementsByClassName('highlightrace')
        while (els[0]) {
            els[0].classList.remove('highlightrace')
        }
        e.currentTarget.className = "classlistentry highlightrace"

        //Get property of specific object in array from an ID
        if (ClassArr.length > 0) {
            const SeletedClassObject = ClassArr.filter((obj) => obj.Id === parseInt(e.currentTarget.id.split("-")[1]))
            console.log(SeletedClassObject[0].Name)
            global.CreateCharacterSelectedClassName = SeletedClassObject[0].Name;

            ReactDOM.render(
                <LoreBox
                    LoreBoxTitle={SeletedClassObject[0].Name}
                    LoreBoxText={SeletedClassObject[0].ClassDescription}
                    LoreBoxIcon={require("../../" + SeletedClassObject[0].ClassIconPath)}
                />, document.getElementById("ClassLoreBox")
            );

            global.CreateCharacterSelectedClassIconPath = SeletedClassObject[0].ClassIconPath;
            global.CreateCharacterSelectedClassBaseStrength = SeletedClassObject[0].BaseStrength;
            global.CreateCharacterSelectedClassBaseAgility = SeletedClassObject[0].BaseAgility;
            global.CreateCharacterSelectedClassBaseStamina = SeletedClassObject[0].BaseStamina;
            global.CreateCharacterSelectedClassBaseIntellect = SeletedClassObject[0].BaseIntellect;
            global.CreateCharacterSelectedClassBaseSpirit = SeletedClassObject[0].BaseSpirit;

            global.CreateCharacterSelectedCombinedBaseStrength = global.CreateCharacterSelectedClassBaseStrength + global.CreateCharacterSelectedRaceBaseStrength;
            document.getElementById("selectedBaseStrengthValue").innerHTML = global.CreateCharacterSelectedCombinedBaseStrength;
            global.CreateCharacterSelectedCombinedBaseAgility = global.CreateCharacterSelectedClassBaseAgility + global.CreateCharacterSelectedRaceBaseAgility;
            document.getElementById("selectedBaseAgilityValue").innerHTML = global.CreateCharacterSelectedCombinedBaseAgility;
            global.CreateCharacterSelectedCombinedBaseStamina = global.CreateCharacterSelectedClassBaseStamina + global.CreateCharacterSelectedRaceBaseStamina;
            document.getElementById("selectedBaseStaminaValue").innerHTML = global.CreateCharacterSelectedCombinedBaseStamina;
            global.CreateCharacterSelectedCombinedBaseIntellect = global.CreateCharacterSelectedClassBaseIntellect + global.CreateCharacterSelectedRaceBaseIntellect;
            document.getElementById("selectedBaseIntValue").innerHTML = global.CreateCharacterSelectedCombinedBaseIntellect;
            global.CreateCharacterSelectedCombinedBaseSpirit = global.CreateCharacterSelectedClassBaseSpirit + global.CreateCharacterSelectedRaceBaseSpirit;
            document.getElementById("selectedBaseSpiValue").innerHTML = global.CreateCharacterSelectedCombinedBaseSpirit;
        }

    }

    render() {
        return (
            <li className="classlistentry" id={this.props.ClassListEntryId} key={this.props.ClassListEntryKey} onClick={(e) => { this.selectClass(e, global.ClassesArr) }}>
            <img className="classimg" src={this.props.ClassListEntryImgPath} alt={this.props.ClassListEntryImgText} />
        </li>
        );
    }
}
export default ClassListEntry;
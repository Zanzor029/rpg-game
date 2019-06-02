import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import "./globalcontext"

class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            RacesLoaded: false,
            ClassesLoaded: false,
            Races: [],
            Classes: [],
        };
    }

    componentDidMount() {
        this.getRaceData()
        this.getClassData()
    }

    getRaceData() {
        fetch("http://rpgapi.jpersson.eu:3003/races")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        RacesLoaded: true,
                        Races: result
                    });
                },
                (error) => {
                    this.setState({
                        RacesLoaded: true,
                        error
                    });
                }
            )
    }
    getClassData() {
        fetch("http://rpgapi.jpersson.eu:3003/classes")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        ClassesLoaded: true,
                        Classes: result
                    });
                },
                (error) => {
                    this.setState({
                        ClassesLoaded: true,
                        error
                    });
                }
            )
    }

    selectClass(e, ClassArr) {
        console.log("Selected Class " + e.currentTarget.id.split("-")[1])
        global.CreateCharacterSelectedClassId = e.currentTarget.id.split("-")[1];

        //set highlight, clears previous highlight first
        var els = document.getElementsByClassName('highlightrace')
        while (els[0]) {
            els[0].classList.remove('highlightrace')
        }
        e.currentTarget.className = "classlist highlightrace"

        //Get property of specific object in array from an ID
        if (ClassArr.length > 0) {
            const SeletedClassObject = ClassArr.filter((obj) => obj.Id === parseInt(e.currentTarget.id.split("-")[1]))
            console.log(SeletedClassObject[0].Name)
            global.CreateCharacterSelectedClassName = SeletedClassObject[0].Name;
            document.getElementById("selectedClassRowValue").innerHTML = SeletedClassObject[0].Name;
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
    selectRace(e, RaceArr) {
        console.log("Selected RaceId " + e.currentTarget.id.split("-")[1]);
        global.CreateCharacterSelectedRaceId = e.currentTarget.id.split("-")[1];

        //set highlight, clears previous highlight first
        var els = document.getElementsByClassName('highlightclass');
        while (els[0]) {
            els[0].classList.remove('highlightclass')
        }
        e.currentTarget.className = "racelist highlightclass";

        //Get property of specific object in array from an ID
        if (RaceArr.length > 0) {
            const SeletedRaceObject = RaceArr.filter((obj) => obj.Id === parseInt(e.currentTarget.id.split("-")[1]))
            console.log(SeletedRaceObject[0].Name)
            global.CreateCharacterSelectedRaceName = SeletedRaceObject[0].Name
            document.getElementById("selectedRaceRowValue").innerHTML = SeletedRaceObject[0].Name;
            document.getElementById("selectedFactionRowValue").innerHTML = SeletedRaceObject[0].Faction;
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

    createCharacterPost() {
        if (global.CreateCharacterSelectedRaceId === 0) {
            alert("Select a Race!");
            return;
        }
        if (global.CreateCharacterSelectedClassId === 0) {
            alert("Select a Class!");
            return;
        }
        if (document.getElementById("characterNameInput").value.length < 3) {
            alert("Name too short!");
            return;
        }
        if (document.querySelector('.genderInput:checked').value === "Male") {
            global.CreateCharacterSelectedRaceIconPath = global.CreateCharacterSelectedRaceMaleIconPath
        }
        else {
            global.CreateCharacterSelectedRaceIconPath = global.CreateCharacterSelectedRaceFemaleIconPath
        }


        var payload = {
            Race: global.CreateCharacterSelectedRaceName,
            RaceId: global.CreateCharacterSelectedRaceId,
            Class: global.CreateCharacterSelectedClassName,
            ClassId: global.CreateCharacterSelectedClassId,
            Faction: global.CreateCharacterSelectedFaction,
            Strength: global.CreateCharacterSelectedCombinedBaseStrength,
            Agility: global.CreateCharacterSelectedCombinedBaseAgility,
            Stamina: global.CreateCharacterSelectedCombinedBaseStamina,
            Intellect: global.CreateCharacterSelectedCombinedBaseIntellect,
            Spirit: global.CreateCharacterSelectedCombinedBaseSpirit,
            Name: document.getElementById("characterNameInput").value,
            Gender: document.querySelector('.genderInput:checked').value,
            RaceIconPath: global.CreateCharacterSelectedRaceIconPath,
            ClassIconPath: global.CreateCharacterSelectedClassIconPath,
            Level: 1
        }
        console.log(payload);
        fetch("http://rpgapi.jpersson.eu:3003/character/create",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(payload)
            })
            .then(function (res) { return res.json(); })
            .then(function (payload) { alert(JSON.stringify(payload)) })
    }

    render() {
        const { error, RacesLoaded, ClassesLoaded, Races, Classes } = this.state;
        global.RacesArr = this.state.Races;
        global.ClassesArr = this.state.Classes;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!RacesLoaded && !ClassesLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <div id="CharacterPanel">
                    <div id="selection">
                        <h2 className="spgame">Select and Race and a Class from below.</h2>
                        <div id="racelistpanel">
                            <h2 className="spgame">Race</h2>
                            <ul id="racelist">
                                {Races.map(Race => (
                                    <li className="racelist" id={"Race-" + Race.Id} key={Race.Id} onClick={(e) => { this.selectRace(e, global.RacesArr) }}>
                                        <img className="raceimg" src={require("../" + Race.MaleIconPath)} alt={Race.Name} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div id="classlistpanel">
                            <h2 className="spgame">Class</h2>
                            <ul id="classlist">
                                {Classes.map(Class => (
                                    <li className="classlist" id={"Class-" + Class.Id} key={Class.Id} onClick={(e) => { this.selectClass(e, global.ClassesArr) }}>
                                        <img className="classimg" src={require("../" + Class.ClassIconPath)} alt={Class.Name} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div id="details">
                        <div id="detailstable">
                            <div id="selectedRaceRow" className="tablerow">
                                <div id="selectedRaceRowHeader" className="tableheader">Selected Race</div>
                                <div id="selectedRaceRowValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedClassRow" className="tablerow">
                                <div id="selectedClassRowHeader" className="tableheader">Selected Class</div>
                                <div id="selectedClassRowValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedClassRow" className="tablerow">
                                <div id="selectedClassDescriptionRowHeader" className="tableheader">Class Description</div>
                                <div id="selectedClassDescriptionRowValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedFactionRow" className="tablerow">
                                <div id="selectedFactionRowHeader" className="tableheader">Faction</div>
                                <div id="selectedFactionRowValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedBaseStrength" className="tablerow">
                                <div id="selectedBaseStrengthHeader" className="tableheader">Base Strength</div>
                                <div id="selectedBaseStrengthValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedBaseAgility" className="tablerow">
                                <div id="selectedBaseAgilityHeader" className="tableheader">Base Agility</div>
                                <div id="selectedBaseAgilityValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedBaseStamina" className="tablerow">
                                <div id="selectedBaseStaminaHeader" className="tableheader">Base Stamina</div>
                                <div id="selectedBaseStaminaValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedBaseInt" className="tablerow">
                                <div id="selectedBaseIntHeader" className="tableheader">Base Intellect</div>
                                <div id="selectedBaseIntValue" className="tablevalue"> </div>
                            </div>
                            <div id="selectedBaseSpi" className="tablerow">
                                <div id="selectedBaseSpiHeader" className="tableheader">Base Spirit</div>
                                <div id="selectedBaseSpiValue" className="tablevalue"> </div>
                            </div>
                        </div>
                        <div id="characterGenderInputHolder">
                            Gender:
                            <input type="radio" name="gender" className="genderInput" id="characterGenderInputMale" value="Male" defaultChecked />Male
                                <input type="radio" name="gender" id="characterGenderInputFemale" className="genderInput" value="Female" />Female
        </div>
                        <div id="characterNameInputHolder">
                            Character Name: <input type="text" name="charname" id="characterNameInput" />
                        </div>
                        <div id="createCharacterButtonHolder">
                            <button id="createCharacterButton" type="button" onClick={this.createCharacterPost}>Create Character!</button>
                        </div>
                        <div id="cancelButtonHolder">
                            <Link to="/CharacterList" className="CharacterListBtn"><button id="cancelButton" type="button">Cancel</button></Link>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default CreateCharacter;
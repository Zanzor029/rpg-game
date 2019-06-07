import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import ReactDOM from "react-dom";
import "../globalcontext";
import LoreBox from '../lorebox/lorebox';
import "./createcharacter.css";
import GenderSelection from './genderselection';
import ClassListEntry from './classlistentry';
import RaceListEntry from './racelistentry';

class CreateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            racegender: "Male",
            selectedClass: "Warrior",
            selectedRace: "Human",
            RacesLoaded: false,
            ClassesLoaded: false,
            Races: [],
            Classes: [],
        };
        this.setGenderValueFromChild = this.setGenderValueFromChild.bind(this);
    }

    componentDidMount() {
        if(!this.props.userid) {
            return <div>Not logged in...</div>;
        }
        else {
            this.getRaceData()
            this.getClassData()
            console.log("userid: "+this.props.userid)
        }

    }

    setGenderValueFromChild(GenderValue,e) {

        this.setState({
            racegender: GenderValue
        });
        console.log("Gender value set to: "+this.state.racegender)
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

    setRaceImagePath(Race) {
        if(this.state.racegender === "Male"){
            global.CreateCharacterSelectedGender = "Male"
            return Race.MaleIconPath
        }
        if(this.state.racegender === "Female"){
            global.CreateCharacterSelectedGender = "Female"
            return Race.FemaleIconPath
        }
    }

    createCharacterPost(userid) {
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
        if (global.CreateCharacterSelectedGender === "Male") {
            global.CreateCharacterSelectedRaceIconPath = global.CreateCharacterSelectedRaceMaleIconPath
        }
        else {
            global.CreateCharacterSelectedRaceIconPath = global.CreateCharacterSelectedRaceFemaleIconPath
        }

        var payload = {
            Race: global.CreateCharacterSelectedRaceName,
            UserId: userid,
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
            Gender: global.CreateCharacterSelectedGender,
            RaceIconPath: global.CreateCharacterSelectedRaceIconPath,
            ClassIconPath: global.CreateCharacterSelectedClassIconPath,
            Level: 1,
        }
        console.log(JSON.stringify(payload));
        var createCharacterApiPath = global.ApiStartPath + "character/create"
        fetch(createCharacterApiPath,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(payload)
            })
            .then(function (res) { return res.json(); })
            .then(function (res) { alert(JSON.stringify(res)) })
    }

    render() {
        const { error, RacesLoaded, ClassesLoaded, Races, Classes } = this.state;
        global.RacesArr = this.state.Races;
        global.ClassesArr = this.state.Classes;


        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!this.props.userid) {
            return <div>not logged in!</div>;
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
                                    <div id={"div-RaceListEntry-"+Race.Id} className ="RaceListEntryDiv">
                                        <RaceListEntry
                                            RaceListEntryId={"RaceListEntry-" + Race.Id}
                                            RaceListEntryKey={Race.Id}
                                            RaceListImagePath = {require("../../" + this.setRaceImagePath(Race))}
                                            RaceListEntryMaleImgPath={require("../../" + Race.MaleIconPath)}
                                            RaceListEntryFemaleImgPath={require("../../" + Race.MaleIconPath)}
                                            RaceListEntryImgText={Race.Name.toLowerCase()}
                                            RaceListEntryClassName={"racelistentry"}
                                        />
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div id="classlistpanel">
                            <h2 className="spgame">Class</h2>
                            <ul id="classlist">
                                {Classes.map(Class => (
                                    <ClassListEntry
                                        ClassListEntryId={"Class-" + Class.Id}
                                        ClassListEntryKey={Class.Id}
                                        ClassListEntryImgPath={require("../../" + Class.ClassIconPath)}
                                        ClassListEntryImgText={Class.Name}
                                    />
                                ))}
                            </ul>
                        </div>
                        <GenderSelection setGenderValueFromChild={this.setGenderValueFromChild}/>
                    </div>

                    <div id="details">
                        <div id="CreateCharacterLoreBoxes">
                            <LoreBox LoreBoxClassName="LoreBox" LoreBoxId="FactionLoreBox" LoreBoxTitle="Faction" LoreBoxText="No faction selected" />
                            <LoreBox LoreBoxClassName="LoreBox" LoreBoxId="RaceLoreBox" LoreBoxTitle="Race" LoreBoxText="No race selected" />
                            <LoreBox LoreBoxClassName="LoreBox" LoreBoxId="ClassLoreBox" LoreBoxTitle="Class" LoreBoxText="No class selected" />
                        </div>
                        <div id="detailstable">
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

                        <div id="characterNameInputHolder">
                            Character Name: <input type="text" name="charname" id="characterNameInput" />
                        </div>
                        <div id="createCharacterButtonHolder">
                            {/* <button id="createCharacterButton" type="button" onClick={this.createCharacterPost}>Accept</button> */}
                            <button id="createCharacterButton" type="button" onClick={(event) => this.createCharacterPost(this.props.userid)}>Accept</button>
                        </div>
                        <div id="cancelButtonHolder">
                            <Link to="/CharacterList" className="CharacterListBtn"><button id="cancelButton" type="button">Back</button></Link>
                        </div>
                    </div>
                </div>
            );

        }

    }
    initialSelection
}
export default CreateCharacter;
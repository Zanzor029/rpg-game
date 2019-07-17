import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from "../../history";
import "../globalcontext";
import LoreBox from "../lorebox/lorebox";
import "./createcharacter.css";
import GenderSelection from "./genderselection";
import ClassListEntry from "./classlistentry";
import RaceListEntry from "./racelistentry";

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
      Classes: []
    };
    this.setGenderValueFromChild = this.setGenderValueFromChild.bind(this);
  }

  componentDidMount() {
    if (!this.props.userid) {
      return <div>Not logged in...</div>;
    } else {
      this.getRaceData();
      this.getClassData();
      console.log("userid: " + this.props.userid);
    }
  }

  setGenderValueFromChild(GenderValue, e) {
    this.setState({
      racegender: GenderValue
    });
    console.log("Gender value set to: " + this.state.racegender);
  }

  routeChange(targetpath) {
    history.push(targetpath);
    setTimeout(function() {
      window.location.reload();
    }, 500);
  }

  getRaceData() {
    const getRacesData = global.ApiStartPath + "races/";
    fetch(getRacesData)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            RacesLoaded: true,
            Races: result
          });
        },
        error => {
          this.setState({
            RacesLoaded: true,
            error
          });
        }
      );
  }
  getClassData() {
    const getClassesData = global.ApiStartPath + "classes/";
    fetch(getClassesData)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            ClassesLoaded: true,
            Classes: result
          });
        },
        error => {
          this.setState({
            ClassesLoaded: true,
            error
          });
        }
      );
  }

  setRaceImagePath(Race) {
    if (this.state.racegender === "Male") {
      global.CreateCharacterSelectedGender = "Male";
      return Race.MaleIconPath;
    }
    if (this.state.racegender === "Female") {
      global.CreateCharacterSelectedGender = "Female";
      return Race.FemaleIconPath;
    }
  }

  createSaveState(charid) {
    console.log(
      "No savestate found. Creating savestate for character id" + charid
    );
    if (global.CreateCharacterSelectedFaction == "Horde") {
      var zonevalue = 2;
    } else {
      var zonevalue = 1;
    }
    var payload = {
      Characterid: charid,
      ZoneLocation: zonevalue
    };
    var createCharacterApiPath = global.ApiStartPath + "savestate/create";
    fetch(createCharacterApiPath, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(
        result => {
          this.routeChange("/auth/characterlist");
        },
        error => {
          if (error)
            this.setState({
              error
            });
        }
      );
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
      global.CreateCharacterSelectedRaceIconPath =
        global.CreateCharacterSelectedRaceMaleIconPath;
    } else {
      global.CreateCharacterSelectedRaceIconPath =
        global.CreateCharacterSelectedRaceFemaleIconPath;
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
      Level: 1
    };
    console.log(JSON.stringify(payload));
    var createCharacterApiPath = global.ApiStartPath + "character/create";
    fetch(createCharacterApiPath, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(
        result => {
          this.createSaveState(result.insertId);
        },
        error => {
          this.setState({
            error
          });
        }
      );
    // .then(function (res) { return res.json(); })
    // .then(function (res) {
    //     console.log(res);
    // this.createSaveState(res.insertId)
    // })
    // .then((res) => {
    //     this.createSaveState(res.insertId)
    // })
  }

  render() {
    const { error, RacesLoaded, ClassesLoaded, Races, Classes } = this.state;
    global.RacesArr = this.state.Races;
    global.ClassesArr = this.state.Classes;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!this.props.userid) {
      return <div>not logged in!</div>;
    } else if (!RacesLoaded && !ClassesLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="CharacterPanel" className="flex-container">
          <div id="selection" className="flex-item">
            <div id="racelistpanel" className="flex-item">
              <p>Race</p>
              <ul id="racelist">
                {Races.map(Race => (
                  <div
                    id={"div-RaceListEntry-" + Race.Id}
                    className="RaceListEntryDiv"
                  >
                    <RaceListEntry
                      RaceListEntryId={"RaceListEntry-" + Race.Id}
                      RaceListEntryKey={Race.Id}
                      RaceListImagePath={require("../../" +
                        this.setRaceImagePath(Race))}
                      RaceListEntryMaleImgPath={require("../../" +
                        Race.MaleIconPath)}
                      RaceListEntryFemaleImgPath={require("../../" +
                        Race.MaleIconPath)}
                      RaceListEntryImgText={Race.Name.toLowerCase()}
                      RaceListEntryClassName={"racelistentry"}
                    />
                  </div>
                ))}
              </ul>
            </div>
            <div id="classlistpanel" className="flex-item">
              <p>Class</p>
              <ul id="classlist">
                {Classes.map(Class => (
                  <ClassListEntry
                    ClassListEntryId={"Class-" + Class.Id}
                    ClassListEntryKey={Class.Id}
                    ClassListEntryImgPath={require("../../" +
                      Class.ClassIconPath)}
                    ClassListEntryImgText={Class.Name}
                  />
                ))}
              </ul>
            </div>
            <GenderSelection
              setGenderValueFromChild={this.setGenderValueFromChild}
            />
          </div>
          <div id="CreateCharacterName" className="flex-item">
            <div id="characterNametextHolder">Name</div>
            <div id="characterNameInputHolder" className="flex-item">
              <input type="text" name="charname" id="characterNameInput" />
            </div>
          </div>
          <div id="details" className="flex-item">
            <div id="CreateCharacterLoreBoxes" className="flex-item">
              <LoreBox
                LoreBoxClassName="LoreBox"
                LoreBoxId="FactionLoreBox"
                LoreBoxTitle="Faction"
                LoreBoxText="No faction selected"
              />
              <LoreBox
                LoreBoxClassName="LoreBox"
                LoreBoxId="RaceLoreBox"
                LoreBoxTitle="Race"
                LoreBoxText="No race selected"
              />
              <LoreBox
                LoreBoxClassName="LoreBox"
                LoreBoxId="ClassLoreBox"
                LoreBoxTitle="Class"
                LoreBoxText="No class selected"
              />
            </div>
            <div id="detailstable" className="flex-item">
              <div className="tablerow" className="flex-item">
                <div id="selectedBaseStrengthHeader" className="tableheader">
                  Strength
                </div>
                <div id="selectedBaseAgilityHeader" className="tableheader">
                  Agility
                </div>
                <div id="selectedBaseStaminaHeader" className="tableheader">
                  Stamina
                </div>
                <div id="selectedBaseIntHeader" className="tableheader">
                  Intellect
                </div>
                <div id="selectedBaseSpiHeader" className="tableheader">
                  Spirit
                </div>
              </div>
              <div className="tablerow" className="flex-item">
                <div id="selectedBaseStrengthValue" className="tablevalue">
                  {" "}
                </div>
                <div id="selectedBaseAgilityValue" className="tablevalue">
                  {" "}
                </div>
                <div id="selectedBaseStaminaValue" className="tablevalue">
                  {" "}
                </div>
                <div id="selectedBaseIntValue" className="tablevalue">
                  {" "}
                </div>
                <div id="selectedBaseSpiValue" className="tablevalue">
                  {" "}
                </div>
              </div>
            </div>

            <div id="createCharacterButtonHolder" className="flex-item">
              <button
                id="createCharacterButton"
                type="button"
                onClick={event => this.createCharacterPost(this.props.userid)}
              >
                Accept
              </button>
            </div>
            <div id="cancelButtonHolder" className="flex-item">
              <Link to="/auth/CharacterList" className="CharacterListBtn">
                <button id="cancelButton" type="button">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
  initialSelection;
}
export default CreateCharacter;

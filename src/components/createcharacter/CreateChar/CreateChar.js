import React, { Component } from "react";
import axios from "axios";
import "./CreateChar.css";
import LoreBox from '../../lorebox/lorebox.js'
import StatTable from '../StatTable/StatTable.js'
import history from '../../../history'

import ImageList from "../ImageList/ImageList";

const BASE_URL = global.ApiStartPath;

class CreateChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceData: [],
      racesLoaded: false,
      classesLoaded: false,
      classData: [],
      selectedRace: {},
      selectedClass: {},
      gender: "Male",
      gendericonpath: null,
      name: ""

    };
    this.selectRace = this.selectRace.bind(this);
    this.selectClass = this.selectClass.bind(this);
    this.getRaceData = this.getRaceData.bind(this);
    this.getClassData = this.getClassData.bind(this);
  }

  componentDidMount() {
    this.getRaceData();
    this.getClassData();
  }

  /// Get all Races
  async getRaceData() {
    try {
      const url = `${BASE_URL}races/`;
      let response = await axios.get(url);
      let data = response.data;
      data.sort(function (a, b) { return a.Faction - b.Faction })
      this.setState({
        raceData: data,
        selectedRace: data[0],
        gendericonpath: data[0].MaleIconPath,
        racesLoaded: true
      });
    } catch (error) {
      alert(error);
    }
  }

  /// Get all Classes
  async getClassData() {
    try {
      const url = `${BASE_URL}classes/`;
      let response = await axios.get(url);
      let data = response.data;

      this.setState({
        classData: data,
        selectedClass: data[0],
        classesLoaded: true
      });
    } catch (error) {
      alert(error);
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  };


  selectRace(race) {
    console.log("Selected " + race.Name)
    this.setState({
      selectedRace: race
    });
    if (this.state.gender === "Male") {
      this.setState({
        gendericonpath: race.MaleIconPath
      })
    }
    else {
      this.setState({
        gendericonpath: race.FemaleIconPath
      })
    }
  }

  selectClass(c) {
    console.log("Selected " + c.Name)
    this.setState({
      selectedClass: c
    });

  }

  routeChange(targetpath) {
    history.push(targetpath);
    setTimeout(function () {
        window.location.reload()
    }, 500)
}


  handleGenderChange = e => {
    this.setState({
      gender: e.target.value
    });
    if (e.target.value === "Male") {
      this.setState({
        gendericonpath: this.state.selectedRace.MaleIconPath
      })
    }
    else {
      this.setState({
        gendericonpath: this.state.selectedRace.FemaleIconPath
      })
    }

  };

  setRaceImagePath = race => {
    console.log("Setting gender")
    if (this.state.gender === "Male") {

      return race.MaleIconPath;
    }
    if (this.state.gender === "Female") {
      // this.setState({
      //   gendericonpath: race.FemaleIconPath
      // })
      return race.FemaleIconPath;
    }
  };

  createSaveState(charid) {
    console.log("No savestate found. Creating savestate for character id" + charid);
    if (this.state.selectedRace.Faction == "Horde") {
        var zonevalue = 2
    } else {
        var zonevalue = 1
    }
    var payload = {
        Characterid: charid,
        ZoneLocation: zonevalue
    }
    var createCharacterApiPath = global.ApiStartPath + "savestate/create"
    axios.post(createCharacterApiPath, payload)
    this.routeChange("/auth/characterlist");
}

  createCharacter = () => {
    if (this.state.name.length < 3) {
      alert("Name too short!");
      return;
  }
    const character = {
      Race: this.state.selectedRace.Name,
      UserId: this.props.userid,
      RaceId: this.state.selectedRace.Id,
      Class: this.state.selectedClass.Name,
      ClassId: this.state.selectedClass.Id,
      Faction: this.state.selectedRace.Faction,
      Strength: this.state.selectedClass.BaseStrength + this.state.selectedRace.BaseStrength,
      Agility: this.state.selectedClass.BaseAgility + this.state.selectedRace.BaseAgility,
      Stamina: this.state.selectedClass.BaseStamina + this.state.selectedRace.BaseStamina,
      Intellect: this.state.selectedClass.BaseIntellect + this.state.selectedRace.BaseIntellect,
      Spirit: this.state.selectedClass.BaseSpirit + this.state.selectedRace.BaseSpirit,
      Name: this.state.name,
      Gender: this.state.gender,
      RaceIconPath: this.state.gendericonpath,
      ClassIconPath: this.state.selectedClass.ClassIconPath,
      Level: 1,
    }
    console.log(character);

    try {
      axios
      .post(`${BASE_URL}character/create`, character)
      .then(res => 
        this.createSaveState(res.data.insertId)
        )

    }
    catch (error) {
      alert(error)
    }

  };

  render() {
    if (!this.state.racesLoaded) {
      return (
        <div>
          Loading races...
        </div>
      )
    }
    if (!this.state.classesLoaded) {
      return (
        <div>
          Loading classes...
        </div>
      )
    }
    return (
      <div className="main">
        <div className="container">
          <div>
            <span className="info-text">
              <h4>Select character name</h4>
            </span>
            <label>
              <input
                className="form-control"
                type="text"
                placeholder="name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </label>
          </div>

          <label>
            <span className="info-text">
              <h4>Select Gender</h4>
            </span>
            <select
              className="form-control"
              value={this.state.gender}
              onChange={this.handleGenderChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <span className="info-text">
            <h3>Selected Race: {this.state.selectedRace.Name}</h3>
            <br />
            <h3>Selected Class: {this.state.selectedClass.Name}</h3>
          </span>

          <div className="form-group">
            <input
              onClick={this.createCharacter}
              type="submit"
              value="Create character"
              className="btn btn-success"
            />
          </div>

          <div className="row">
            <div className="col col-lg-2 test">
              {this.state.raceData.map(race => (
                <ImageList
                  selected={`${this.state.selectedRace.Id === race.Id ? "yes" : "no"}`}
                  objectdata={race}
                  onClick={this.selectRace}
                  key={"RaceList" + race.Id}
                  img={require(`../../../${this.setRaceImagePath(race)}`)}
                />

              ))}
            </div>
            <div className="col col-lg-2 test">
              {this.state.classData.map(c => (
                <ImageList
                  selected={`${this.state.selectedClass.Id === c.Id ? "yes" : "no"}`}
                  objectdata={c}
                  onClick={this.selectClass}
                  key={"ClassList" + c.Id}
                  img={require(`../../../${c.ClassIconPath}`)}
                />
              ))}
            </div>


            <div id="CreateCharacterLoreBoxes" className="flex-item col">
              <LoreBox LoreBoxClassName="LoreBox" LoreBoxId="FactionLoreBox" LoreBoxTitle="Faction" LoreBoxText={this.state.selectedRace.Faction} LoreBoxIcon={this.state.selectedRace.FactionIconPath} />
              <LoreBox LoreBoxClassName="LoreBox" LoreBoxId="RaceLoreBox" LoreBoxTitle="Race" LoreBoxText={this.state.selectedRace.RaceDescription} LoreBoxIcon={this.state.gendericonpath} />
              <LoreBox LoreBoxClassName="LoreBox" LoreBoxId="ClassLoreBox" LoreBoxTitle="Class" LoreBoxText={this.state.selectedClass.ClassDescription} LoreBoxIcon={this.state.selectedClass.ClassIconPath} />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col">
                <StatTable
                  Strength={(this.state.selectedClass.BaseStrength + this.state.selectedRace.BaseStrength)}
                  Agility={(this.state.selectedClass.BaseAgility + this.state.selectedRace.BaseAgility)}
                  Stamina={(this.state.selectedClass.BaseStamina + this.state.selectedRace.BaseStamina)}
                  Intellect={(this.state.selectedClass.BaseIntellect + this.state.selectedRace.BaseIntellect)}
                  Spirit={(this.state.selectedClass.BaseSpirit + this.state.selectedRace.BaseSpirit)}



                />
              </div>

            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default CreateChar;

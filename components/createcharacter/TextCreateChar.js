import React, { Component } from "react";
import axios from "axios";
import "./TestCreateChar.css";

import TestRaceList from "./TestRaceList";

const BASE_URL = "https://rpgapi.jpersson.eu/";

class TextCreateChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceData: [],
      classData: [],
      selectedRace: "",
      selectedClass: "",
      gender: "Male",
      selectedFaction: "",
      name: ""
    };

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

      this.setState({
        raceData: data
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
        classData: data
      });
    } catch (error) {
      alert(error);
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  };

  selectRace = e => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      selectedRace: e.target.name
    });
  };

  selectClass = e => {
    e.preventDefault();
    this.setState({
      selectedClass: e.target.name
    });
  };

  handleGenderChange = e => {
    this.setState({ gender: e.target.value });
  };

  setRaceImagePath = race => {
    if (this.state.gender === "Male") {
      return race.MaleIconPath;
    }
    if (this.state.gender === "Female") {
      return race.FemaleIconPath;
    }
  };

  createCharacter = () => {
    const character = {
      name: this.state.name,
      selectedRace: this.state.selectedRace,
      selectedClass: this.state.selectedClass,
      gender: this.state.gender
    };

    console.log(character);

    axios
      .post(`${BASE_URL}character/create`, JSON.stringify(character), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => console.log(res.data));
  };

  render() {
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
            <h3>Selected Race: {this.state.selectedRace}</h3>
            <br />
            <h3>Selected Class: {this.state.selectedClass}</h3>
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
                <TestRaceList
                  onClick={this.selectRace}
                  id={race.Id}
                  raceName={race.Name}
                  faction={race.Faction}
                  FactionDescription={race.FactionDescription}
                  img={require(`../../${this.setRaceImagePath(race)}`)}
                />
              ))}
            </div>
            <div className="col col-lg-2 test">
              {this.state.classData.map(c => (
                <TestRaceList
                  onClick={this.selectClass}
                  id={c.Id}
                  raceName={c.Name}
                  img={require(`../../${c.ClassIconPath}`)}
                />
              ))}
            </div>

            <div className="col col-lg-2 info-text" />

            <div className="col col-lg-2 info-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              et perspiciatis dolorem similique repudiandae nemo consequuntur,
              officiis incidunt aliquid ut obcaecati quod amet explicabo sunt
              facilis eligendi! Consectetur, atque ut.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TextCreateChar;

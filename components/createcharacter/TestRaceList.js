import React, { Component } from "react";
import "./TestRaceList.css";

class TestRaceList extends Component {
  render() {
    return (
      <div className="TestRaceDiv">
        <img
          className="RaceList"
          onClick={this.props.onClick}
          src={this.props.img}
          id={this.props.id}
          name={this.props.raceName}
          FactionDescription={this.props.FactionDescription}
        />
    
      </div>
    );
  }
}

export default TestRaceList;

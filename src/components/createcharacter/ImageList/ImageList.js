import React, { Component } from "react";
import "./ImageList.css";

class ImageList extends Component {
  
  render() {
    return (
      <div className={`${this.props.selected === "yes" ? 'TestRaceDiv Selected' : 'TestRaceDiv'}`}>
        <img
          className="RaceList"
          onClick={() => this.props.onClick(this.props.objectdata)} 
          src={this.props.img}
        />
    
      </div>
    );
  }
}

export default ImageList;

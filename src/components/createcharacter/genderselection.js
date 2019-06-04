import React, { Component } from 'react';
import "../globalcontext";
import "./createcharacter.css";

class GenderSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        
    }

    render() {
        return (
            <div id="characterGenderInputHolder" onChange={(event) => {this.props.setGenderValueFromChild(event.target.value, event)}}>
                <p>Gender</p>
                <input type="radio" name="gender" className="genderInput" id="characterGenderInputMale" value="Male" defaultChecked/>Male
                <input type="radio" name="gender" id="characterGenderInputFemale" className="genderInput" value="Female" />Female
          </div>
        )
    }

}
export default GenderSelection;
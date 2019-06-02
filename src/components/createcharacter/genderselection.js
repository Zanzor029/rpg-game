import React, { Component } from 'react';
import "../globalcontext"
import "./createcharacter.css"

class GenderSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Highlighted: "No"
        };
    }
    setGender(event) {
        console.log(event.target.value);
        //Add function to update Race icons to female
    }

    render() {
        return (
            <div id="characterGenderInputHolder" onChange={this.setGender.bind(this)}>
                <p>Gender</p>
                <input type="radio" name="gender" className="genderInput" id="characterGenderInputMale" value="Male" defaultChecked />Male
                <input type="radio" name="gender" id="characterGenderInputFemale" className="genderInput" value="Female" />Female
          </div>
        )
    }

}
export default GenderSelection;
import React, { Component } from 'react';
import "../globalcontext";

class GenderSelectionTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div onChange={(event) => {this.props.setGenderValueFromChild(document.querySelector('.genderInput:checked').value, event)}}>
                <p>Gender</p>
                <input type="radio" name="gender" className="genderInput" id="characterGenderInputMale" value="Male" defaultChecked />Male
                <input type="radio" name="gender" id="characterGenderInputFemale" className="genderInput" value="Female" />Female
          </div>
        )
    }

}
export default GenderSelectionTest;
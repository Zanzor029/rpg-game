import React, { Component } from 'react';
import "../globalcontext";
import "./tests.css";
import TestSingleChild from './singlechild';
import GenderSelectionTest from './genderselectiontest';

class TestParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            racegender: "Male"
        };
        this.setMale = this.setMale.bind(this);
        this.setFemale = this.setFemale.bind(this);
        this.setGenderValueFromChild = this.setGenderValueFromChild.bind(this);

    }

    setMale() {
        console.log("Button pressed");
        this.setState({
            racegender: "Male"
        });
        console.log("Parent racegender set to: " + this.state.racegender);
    }
    setFemale() {
        console.log("Button pressed");
        this.setState({
            racegender: "Female"
        });
        console.log("Parent racegender set to: " + this.state.racegender);
    }

    setGenderValueFromChild(GenderValue,e) {
        e.preventDefault();
        this.setState({
            racegender: GenderValue
        });
    }
    

    render() {

        return (
            <div id="MainArea">
                <h1>Hello world</h1>
                <p> Gender Input:</p>
                <GenderSelectionTest setGenderValueFromChild={this.setGenderValueFromChild}/>
                <br/>
                <button onClick={this.setMale}>Male from Parent</button>
                <button onClick={this.setFemale}>Female from Parent</button>
                <TestSingleChild setGenderValueFromChild={this.setGenderValueFromChild} racetitle="Orc" racegender={this.state.racegender} />
                <TestSingleChild setGenderValueFromChild={this.setGenderValueFromChild} racetitle="Human" racegender={this.state.racegender} />
            </div>
        );
    }

}
export default TestParent;
import React, { Component } from 'react';
import "../globalcontext";
import "./tests.css";
class TestSingleChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className={"SingleChild-" + this.props.color}>
                <p>
                    Race Title: {this.props.racetitle}
                </p>
                <p>
                    Race Gender: {this.props.racegender}
                </p>
                <button onClick={(event) => {this.props.setGenderValueFromChild("Male", event)}}>Male from child</button>
                <button onClick={(event) => {this.props.setGenderValueFromChild("Female", event)}}>Female from child</button>

            </div>
        );
    }

}
export default TestSingleChild;
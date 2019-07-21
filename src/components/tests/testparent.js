import React, { Component } from 'react';
import "../globalcontext";
import "./tests.css";
import Testcharacterlist from './testcharacterlist'

class TestParent extends Component {
    constructor(props) {
        super(props);
    }
  

    render() {

        return (
            <div id="MainArea">
                <Testcharacterlist />
            </div>
        );
    }

}
export default TestParent;
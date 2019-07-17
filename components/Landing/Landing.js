import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Landing.css";
import Login from "./Login";
import Button from 'react-bootstrap/Button'

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
}

  render() {
    return (
      <div className="landing">
        <div className="loginbox">
          <Login useridHandler={this.useridHandler}/>
          <div className="registerholder">
          <Link to="/register">
            <Button variant="dark" className="register-btn">Register a new account</Button>
          </Link>
        </div>
        </div>

      </div>
    );
  }
}

export default Landing;

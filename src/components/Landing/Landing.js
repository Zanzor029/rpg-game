import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Landing.css";
import Login from "./Login";

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
            <button className="register-btn">Register a new account</button>
          </Link>
        </div>
        </div>

      </div>
    );
  }
}

export default Landing;

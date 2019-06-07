import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-btn">
        <Link to="/register">
         <button className="landing-btn">Register</button>
        </Link>
        <Link to="/login">
          <button>Log in</button>
        </Link>
        </div>
      </div>
    );
  }
}

export default Landing;

import React, { Component } from "react";
import history from '../../history';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
}

componentDidMount() {
    console.log("Logout requested for token:")
    var alertConfirmation = window.confirm("This will log you out");
    if (alertConfirmation === true) {
        console.log("Logout confirmed") 
        localStorage.removeItem('token')
        console.log("Token deleted from localstorage")
        this.routeChange("/")
    }
    else {
        return
    }
}

routeChange(targetpath) {
    history.push(targetpath);
    window.location.reload()
  }

  render() {
    return (
        <p>Logout</p>
    );
  }
}

export default withRouter(Logout)

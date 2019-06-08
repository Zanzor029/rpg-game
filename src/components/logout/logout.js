import React, { Component } from "react";
import history from '../../history';


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
        this.routeChange("/auth/characterlist")
    }
}

routeChange(targetpath) {
    history.push(targetpath);
    window.location.reload()
  }

  render() {
    return (
        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    );
  }
}

export default Logout;

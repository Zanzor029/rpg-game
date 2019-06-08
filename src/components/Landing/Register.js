import React, { Component } from "react";
import history from '../../history';
import "./Landing.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }
  routeChange(targetpath) {
    history.push(targetpath);
    window.location.reload()
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);
    if (newUser.password === newUser.password2) {
      console.log("Password matches, creating account");

      var apipath = global.ApiStartPath + "register"
      fetch(apipath,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(newUser)
        })
        .then(function (res) { return res.json(); })
      // .then(function (newUser) { alert(JSON.stringify(newUser)) })
      this.routeChange("/")

    }
    else {
      console.log("Password does not match")
      alert("Password does not match!");
      this.setState({
        password: "",
        password2: ""
      });
    }
  };

  render() {
    return (

      <div className="landing">
        <div className="loginbox">
          <p>Create your account</p>
          <form onSubmit={this.onSubmit}>
            <div>
              <input
                type="text"
                minLength="5"
                placeholder="Username"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                minLength="5"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={this.state.password2}
                onChange={this.onChange}
              />
            </div>
            <input value="Register" type="submit" />
          </form>
        </div>
      </div>

    );
  }
}

export default Register;

import React, { Component } from "react";
import history from '../../history';
import "./Landing.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
        .then(function (res) { 
          if(!res.ok) {
            alert("Error!")
            return res.json();
          }
        })
        .then(this.routeChange("/"))
      // .then(function (newUser) { alert(JSON.stringify(newUser)) })
      

    }
    else {
      console.log("Password does not match")
      alert("Password does not match! Try again.");
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
          <div className="loginheadertext">
            Create your account <br></br>
          </div>
          <Form onSubmit={this.onSubmit}>
            <div>
              <input
                className="logininput"
                type="text"
                minLength="5"
                placeholder="Username"
                name="name"
                required
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                className="logininput"
                type="email"
                placeholder="Email Address"
                name="email"
                required
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                className="logininput"
                type="password"
                placeholder="Password"
                minLength="5"
                name="password"
                required
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div>
              <input
                className="logininput"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                required
                value={this.state.password2}
                onChange={this.onChange}
              />
            </div>
            <Button variant="dark" type="submit">Register</Button>
          </Form>
          <Link to="/"><Button variant="dark" id="RegisterCancel">Cancel</Button></Link>
        </div>

      </div>

    );
  }
}

export default Register;

import React, { Component } from "react";
import history from '../../history';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usertoken: "",
      userid: ""
    };
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(targetpath) {
    history.push(targetpath);
    window.location.reload()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(event){
    event.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(userData);

    var apipath = global.ApiStartPath + "login"
    fetch(apipath,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(userData)
      })
      .then(function (res) { return res.json(); })
      .then(res => {
        console.log(res);
        if (res.msg === "ok") {
          console.log("login successfull")
          localStorage.setItem('token', res.token);
          var base64url = res.token.split('.')[1]
          var base64 = decodeURIComponent(atob(base64url).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          var base64json = JSON.parse(base64)
          this.setState({
            usertoken: res.token,
            userid: res.token.split
          })
          console.log("Base64: " + base64);
          console.log("Base64 id: " + base64json.id)
          this.routeChange("/auth/characterlist")

        }
        else {
          console.log("Bad login")
          alert("Incorrect credentials!")
        }

      })
  };

  render() {
    return (
      <div>
        <Form onSubmit={e => this.onSubmit(e)}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" onChange={this.onChange} name="username" value={this.state.username}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.onChange} name="password" value={this.state.password}/>
          </Form.Group>
          <Button variant="dark" type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;

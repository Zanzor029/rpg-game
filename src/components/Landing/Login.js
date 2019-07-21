import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loginAccount } from '../../actions/accountActions'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(event) {
    event.preventDefault();
    if (this.state.username.length < 4) {
      alert("Username too short!")
      return
    }
    if (this.state.password.length < 4) {
      alert("Password too short!")
      return
    }
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(userData);

    let doLogin = async () => {
      let res = await this.props.loginAccount(userData)
      return res
    }
    doLogin().then((res)=>{
      if(res.status === 200) {
        console.log("login OK")

        //redirect to characterlist after OK login
        this.props.history.push("/auth/characterlist");
      } else {
        console.log("bad login")
        alert(res.data.msg)
      }
    })
  };

  render() {
    return (
      <div>
        <Form onSubmit={e => this.onSubmit(e)}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" placeholder="Enter username" onChange={this.onChange} name="username" value={this.state.username} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.onChange} name="password" value={this.state.password} />
          </Form.Group>
          <Button variant="dark" type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginAccount: state.loginAccount
})

export default connect(mapStateToProps, { loginAccount })(withRouter(Login))

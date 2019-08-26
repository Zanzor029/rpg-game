import React, { Component } from "react";
import "./Landing.css";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { registerAccount } from '../../actions/appActions'
import { loginAccount } from '../../actions/appActions'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    console.log(newUser)
    if (newUser.password === newUser.password2) {
      console.log("Password matches, creating account")
    }
    else {
      console.log("Password does not match")
      alert("Password does not match! Try again.");
      this.setState({
        password: "",
        password2: ""
      });
      return
    }
    let doRegister = async () => {
      let res = await this.props.registerAccount(newUser)
      return res
    }
    let doLogin = async () => {
      let res = await this.props.loginAccount({ username: newUser.username, password: newUser.password })
      return res
    }
    doRegister().then((res) => {
      if (res.status === 201) {
        console.log("account created will now try login")
        doLogin().then((res) => {
          if (res.status === 200) {
            console.log("login was OK, redirect to characterlist...")
            this.props.history.push("/auth/characterlist");
          } else {
            console.log(res.data.msg)
            alert(res.data.msg)
          }
        })
      } else {
        console.log(res.data.message)
        alert(res.data.message)
      }
    })

  }

  render() {
    return (
      <div className="landing">
        <div className="loginbox">
          <div className="loginheadertext">
            Create your account
          </div>
          <br></br>
          <Form onSubmit={this.onSubmit}>
            <div>
              <input
                className="logininput"
                type="text"
                minLength="5"
                placeholder="Username"
                name="username"
                required
                value={this.state.username}
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
            <br></br>
            <Button variant="dark" type="submit">Register</Button>
          </Form>
          <Link to="/"><Button variant="dark" id="RegisterCancel">Cancel</Button></Link>
        </div>

      </div>

    );
  }
}

const mapStateToProps = state => ({
  registerAccount: state.registerAccount,
  loginAccount: state.loginAccount
})

export default connect(mapStateToProps, { registerAccount, loginAccount })(withRouter(Register))

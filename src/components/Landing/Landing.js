import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { loginAccountWithToken } from '../../actions/appActions'
import { connect } from 'react-redux'

import "./Landing.css";
import Login from "./Login";
import Button from 'react-bootstrap/Button'

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {

    //Check if a JWT exists in local storage, if so try to login using that token
    if (localStorage.getItem('token')) {
      var base64url = localStorage.getItem('token').split('.')[1]
      var base64 = decodeURIComponent(atob(base64url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      var base64json = JSON.parse(base64)
      console.log(base64json)

      let dologinAccountWithToken = async () => {
        let res = await this.props.loginAccountWithToken({
          token: localStorage.getItem('token'),
          userid: base64json.id
        })
        return res
      }
      dologinAccountWithToken().then(() => {
        console.log("Logged in with saved JWT from local storage")
        this.props.history.push("/auth/characterlist");
      })
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="loginbox">
          <Login useridHandler={this.useridHandler} />
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

const mapStateToProps = state => ({
  loginAccountWithToken: state.loginAccountWithToken
})

export default connect(mapStateToProps, { loginAccountWithToken })(withRouter(Landing))

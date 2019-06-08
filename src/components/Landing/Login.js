import React, { Component } from "react";
import history from '../../history';
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

  onSubmit = e => {
    e.preventDefault();

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
        <div>
          <div>
            <div>
              <div className="loginheadertext">Submit login credentials</div>
              <p>{this.state.userid}</p>
              <form onSubmit={this.onSubmit}>
                <div>
                  <input
                    className="logininput"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    className="logininput"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input className="logininputsubmit" value="Login" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

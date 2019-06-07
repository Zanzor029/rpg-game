import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usertoken: "",
      userid: ""
    };
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
        {
          this.props.useridHandler({
            usertoken: this.state.usertoken,
            userid: base64json.id
          })
        }
      })
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <h1>Log in</h1>
              <p>Submit login credentials</p>
              <p>{this.state.usertoken}</p>
              <p>{this.state.userid}</p>
              <form onSubmit={this.onSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input value="Login" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

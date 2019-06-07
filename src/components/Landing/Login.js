import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(userData);
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <h1>Logga in</h1>
              <p>Ange inloggnings uppgifter</p>
              <form onSubmit={this.onSubmit}>
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
                    placeholder="Lösenord"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input value="Logga in" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

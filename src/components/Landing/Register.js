import React, { Component } from "react";

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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <h1>Bli Medlem</h1>
              <p>Skapa ditt konto</p>
              <form onSubmit={this.onSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Namn"
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
                    placeholder="Lösenord"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Bekräfta lösenord"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                </div>
                <input value="Registrera" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

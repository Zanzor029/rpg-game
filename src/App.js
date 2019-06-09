import React, { Component } from 'react';
import './App.css';
import "./components/globalcontext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CharacterList from './components/characterlist/characterlist.js';
import CreateCharacter from './components/createcharacter/createcharacter.js';
import Landing from "./components/Landing/Landing";
import Register from "./components/Landing/Register";
import history from './history';
import Navbar from './components/navbar/navbar';
import Logout from './components/logout/logout';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      userid: "",
      redirectlogin: false
    }
  }

  componentWillMount() {
    this.checkLoginState();
  }

  routeChange(targetpath) {
    history.push(targetpath);

    window.location.reload()
  }

  checkLoginState() {

    var localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      var base64url = localStorageToken.split('.')[1]
      var base64 = decodeURIComponent(atob(base64url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      var base64json = JSON.parse(base64);
      this.setState({
        usertoken: base64json.token,
        userid: base64json.id
      })
      console.log("Base64: " + base64);
      console.log("token: " + localStorageToken);
      console.log("Base64 id: " + base64json.id);
    }
    else {
      if(window.location.href.match("/auth")){
        alert("You are not logged in.")
        this.routeChange("/")
        console.log("Redirectlogin set to true");
      }

    }
  }

  render() {
    return (
      <Router>
        <Navbar />
        <div className="AppContentRightSide">
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/auth/characterlist" render={() => (
            <CharacterList userid={this.state.userid}
            />
          )} />
          <Route path="/auth/CreateCharacter" render={() => (
            <CreateCharacter userid={this.state.userid} />
          )} />
            <Route path="/auth/Logout" render={() => (
            <Logout/>
          )} />

        </div>

      </Router>
    );
  }
}


export default App;
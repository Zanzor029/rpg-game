import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import "./components/globalcontext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CharacterList from './components/characterlist/characterlist.js';
import CreateChar from './components/createcharacter/CreateChar/CreateChar.js'
import Landing from "./components/Landing/Landing";
import Register from "./components/Landing/Register";
import history from './history';
import Navbar from './components/navbar/navbar';
import Logout from './components/logout/logout';
import World from './components/world/world';
import Encounter from './components/world/encounter/encounter';
import EncounterSuccess from './components/world/encounter/encountersuccess';
import EncounterFailure from './components/world/encounter/encounterfailure';
import LevelUp from './components/world/levelup/levelup';

import store from './store'
import TestParent from './components/tests/testparent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      userid: "",
      characterid: "",
      redirectlogin: false
    }
    this.setSelectedCharacterIdtoApp = this.setSelectedCharacterIdtoApp.bind(this);
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
      if (window.location.href.match("/auth")) {
        alert("You are not logged in.")
        this.routeChange("/")
        console.log("Redirectlogin set to true");
      }

    }
  }

  setSelectedCharacterIdtoApp(id) {
    this.setState({
      characterid: id
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="AppContentRightSide">
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/test" component={TestParent} />
            <Route path="/auth/world" component={World} />
            <Route path="/auth/encounter" component={Encounter} />
            <Route path="/auth/encountersuccess" component={EncounterSuccess} />
            <Route path="/auth/encounterfailure" component={EncounterFailure} />
            <Route path="/auth/levelup" component={LevelUp} />
            <Route path="/auth/characterlist" render={() => (
              <CharacterList userid={this.state.userid} setSelectedCharacterIdtoApp={this.setSelectedCharacterIdtoApp} />
            )} />
            <Route path="/auth/CreateCharacter" render={() => (
              <CreateChar userid={this.state.userid} />
            )} />
            <Route path="/auth/Logout" render={() => (
              <Logout />
            )} />

          </div>

        </Router>
      </Provider>
    );
  }
}


export default App;
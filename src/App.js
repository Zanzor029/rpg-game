import React, { Component } from 'react';
import './App.css';
import "./components/globalcontext";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import CharacterList from './components/characterlist/characterlist.js';
import CreateCharacter from './components/createcharacter/createcharacter.js';
import TestParent from './components/tests/testparent';
import Landing from "./components/Landing/Landing";
import Login from "./components/Landing/Login";
import Register from "./components/Landing/Register";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      userid: "",
      redirectlogin: false
    }
    this.useridHandler = this.useridHandler.bind(this)
  }

  componentWillMount() {
    this.checkLoginState();
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
      this.setState({
        redirectlogin: true
      })
    }
  }

  useridHandler(loginvalues) {
    this.setState({
      token: loginvalues.token,
      userid: loginvalues.userid
    })
    console.log("State is updated with user id:" + this.state.userid);
  }


render() {
  if (this.state.redirectlogin) {
    if (window.location.href.match("/login") || window.location.href.match("/register")) {

    }
  }
  return (
    <Router>
      <div className="RouterNavigation">
        <ul className="RouterNavigationUlHolder">
          <li className="RouterNavigationLi">
            <Link to="/">Home</Link>
          </li>
          <li className="RouterNavigationLi">
            <Link to="/characterlist">Character List</Link>
          </li>
          <li className="RouterNavigationLi">
            <Link className="RouterNavigation" to="/test">Test</Link>
          </li>
          <li className="RouterNavigationLi">
            <Link className="RouterNavigation" to="/DebuggerRoute">Debug</Link>
          </li>

        </ul>
      </div>
      <div className="AppContentRightSide">
        <Route exact path="/" component={Landing} />
        <Route path="/characterlist" render={() => (
            <CharacterList userid={this.state.userid}
            />
          )} />
        <Route path="/test" component={TestRoute} />
        <Route path="/DebuggerRoute" component={DebuggerRoute} />
        <Route path="/CreateCharacter" render={() => (
          <CreateCharacter userid={this.state.userid} />
        )} />
        <Route path="/login" render={() => (
          <Login useridHandler={this.useridHandler} />
        )} />
        <Route path="/register" component={Register} />
      </div>

    </Router>
  );
}
}


function TestRoute({ match }) {
  return (
    <div>
      <h2>Test route matching</h2>
      <ul>
        <li>
          <Link to={`${match.url}/test1`}>Test 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/test2`}>Test 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/test3`}>Test 3</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Test routes</h3>}
      />
    </div>
  );
}

function DebuggerRoute() {
  return (
    <div>
      <TestParent />
    </div>
  )
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default App;
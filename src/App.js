import React, { Component } from 'react';
import './App.css';
import "./components/globalcontext";

import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import CharacterList from './components/characterlist/characterlist.js';
import CreateCharacter from './components/createcharacter/createcharacter.js';
import TestParent from './components/tests/testparent';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
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
          <Route exact path="/" component={HomeRoute} />
          <Route path="/characterlist" component={CharacterListRoute} />
          <Route path="/test" component={TestRoute} />
          <Route path="/DebuggerRoute" component={DebuggerRoute} />
          <Route path="/CreateCharacter" component={CreateCharacterRoute} />
        </div>

      </Router>
    );
  }
}
function HomeRoute() {
  return (
    <div>
      <p>Home</p>
      <p>To do:</p>
      <ul>
        <li>
          Loginfeature?
        </li>
      </ul>
    </div>
  );
}

function CharacterListRoute() {
  return (
    <div>
      <CharacterList />
    </div>

  );
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
  return(
    <div>
      <TestParent />
    </div>
  )
}

function CreateCharacterRoute() {
  return(
    <div>
      <CreateCharacter />
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
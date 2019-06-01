import React, { Component } from 'react';
import './App.css';
import CharacterList from './components/characterlist.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelectedCharacterId: 1,
      TestGlobalVar: "Test123"
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
          </ul>
        </div>
        <div className="AppContentRightSide">
          <Route exact path="/" component={HomeRoute} />
          <Route path="/characterlist" component={CharacterListRoute} />
          <Route path="/test" component={TestRoute} />
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

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}

export default App;
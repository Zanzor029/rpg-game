import React, { Component } from 'react';
import './App.css';
import CharacterList from './components/characterlist.js';
import CharacterListButtons from './components/characterlistbuttons';


class App extends Component {
  render() {

    return (
        <CharacterList/>
    );
  }
}
export default App;
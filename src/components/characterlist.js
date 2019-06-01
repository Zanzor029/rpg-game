import React, { Component } from 'react';
import '../App.css';
import CharacterListButtons from './characterlistbuttons';

class CharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      characters: []
    };
  }

  componentDidMount() {
    this.getCharacterData()
  }

  getCharacterData() {
    fetch("http://rpgapi.jpersson.eu:3003/characters")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            characters: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, characters } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div id="CharacterListPanel">
          <div id="CharacterListUlHolder">
            <ul id="CharacterList">
              {characters.map(character => (
                <li className="CharacterList">
                  <div className="CharacterListName">
                    {character.Name}
                  </div>
                  <div className="CharacterListImagesHolder">
                    <div className="CharacterRaceImageHolder">
                      <img className="CharacterRaceImage" src={character.RaceIconPath} />
                    </div>
                    <div className="CharacterClassImageHolder">
                      <img className="CharacterClassImage" src={character.ClassIconPath} />
                    </div>
                  </div>
                  <div className="CharacterListLevelRaceClass">
                    Level {character.Level} {character.Race} {character.Class}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
  }
}
export default CharacterList;
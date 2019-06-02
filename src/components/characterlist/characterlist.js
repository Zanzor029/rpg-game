import React, { Component } from 'react';
import CharacterListButtons from './characterlistbuttons';
import "../globalcontext";
import CharacterListCard from '../characterlistcard/characterlistcard';
import "./characterlist.css";

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
                                <CharacterListCard Id={character.Id} Name={character.Name} Race={character.Race} Class={character.Class} RaceIconPath={character.RaceIconPath} ClassIconPath={character.ClassIconPath} Level={character.Level} />
                            ))}
                        </ul>
                    </div>
                    <CharacterListButtons />
                </div>
            );
        }
    }
}
export default CharacterList;
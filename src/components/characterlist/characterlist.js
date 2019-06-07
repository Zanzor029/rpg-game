import React, { Component } from 'react';
import CharacterListButtons from './characterlistbuttons';
import "../globalcontext";
import CharacterCard from '../charactercard/charactercard';
import "./characterlist.css";

class CharacterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            characters: [],
            token: localStorage.getItem('token')
        };
    }

    componentDidMount() {
        if (!this.props.userid) {
            console.log("Missing UserID Prop")
        }
        else {
            this.getCharacterData()
        }

    }

    getCharacterData() {
        var getCharacterDataPath = global.ApiStartPath + "characters/" + this.props.userid
        console.log("Call API to get all characters with userID" + this.props.userid)
        fetch(getCharacterDataPath,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                method: "GET",
            })
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
        const { error, isLoaded, characters, token } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!this.props.userid) {
            return (
                <div> You are not logged in to the application.
                </div>
            )
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
                                <CharacterCard Id={character.Id} Name={character.Name} Race={character.Race} Class={character.Class} RaceIconPath={character.RaceIconPath} ClassIconPath={character.ClassIconPath} Level={character.Level} />
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
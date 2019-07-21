import React, { Component } from 'react';
import CharacterListButtons from './characterlistbuttons';
import "../globalcontext";
import CharacterCard from '../charactercard/charactercard';
import "./characterlist.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from '../../store';

class CharacterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            characters: [],
            characterid: "",
            token: localStorage.getItem('token')
        };
        this.setSelectedCharacterId = this.setSelectedCharacterId.bind(this);
    }

    componentDidMount() {
        if (store.getState().app.userid === 0) {
            if (localStorage.getItem('token')) {
                var base64url = localStorage.getItem('token').split('.')[1]
                var base64 = decodeURIComponent(atob(base64url).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                var base64json = JSON.parse(base64)
                this.getCharacterData(base64json.id)
            }
            else {
                return alert("you are not logged in!")
            }
        }
        else {
            this.getCharacterData(store.getState().app.userid)
        }
        
    }



    setSelectedCharacterId(e) {
        const selectedCharacterId = e.currentTarget.id.split("-")[1];
        console.log("Selected CharacterID " + selectedCharacterId);
        global.SelectedCharacterListId = e.currentTarget.id;
        global.SelectedCharacter = selectedCharacterId;

        //set highlight, clears previous highlight first
        var els = document.getElementsByClassName('highlightcharacter')
        while (els[0]) {
            els[0].classList.remove('highlightcharacter')
        }
        e.currentTarget.className = "CharacterList highlightcharacter"
        this.props.setSelectedCharacterIdtoApp(selectedCharacterId);
        this.setState({
            characterid: selectedCharacterId
        });

        console.log("character id value set to: " + selectedCharacterId);

    };

    getCharacterData(userid) {
        var getCharacterDataPath = global.ApiStartPath + "characters/" + userid
        console.log("Call API to get all characters with userID" + userid)
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
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            characters.sort(function (a, b) {
                return parseInt(a.Id) - parseInt(b.Id);
            })
            return (
                <div id="CharacterListPanel">
                    <div id="CharacterListUlHolder">
                        <ul id="CharacterList">
                            {characters.map(character => (
                                <CharacterCard key={character.Id} Id={character.Id} Name={character.Name} Race={character.Race} Class={character.Class} RaceIconPath={character.RaceIconPath} ClassIconPath={character.ClassIconPath} Level={character.Level} setSelectedCharacterId={this.setSelectedCharacterId} />
                            ))}
                        </ul>
                    </div>
                    <CharacterListButtons selectedCharacterId={this.state.characterid} />
                </div>
            );
        }
    }
}
export default CharacterList;
import React, { Component } from 'react';
import CharacterListButtons from './characterlistbuttons';
import "../globalcontext";
import CharacterCard from '../charactercard/charactercard';
import "./characterlist.css";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import store from '../../store';
import Loading from '../loadingscreens/loading';

class CharacterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            characters: [],
            characterid: "",
            token: localStorage.getItem('token'),
            selectedCharacter: null,
        };
        // this.setSelectedCharacterId = this.setSelectedCharacterId.bind(this);
        this.selectCharacter = this.selectCharacter.bind(this);
    }

    componentWillMount() {
        if(!store.getState().app.userid) {
            this.props.history.push("/");
        }
        else {
            this.getCharacterData(store.getState().app.userid)
        }
        // if (store.getState().app.userid === 0) {
        //     if (localStorage.getItem('token')) {
        //         var base64url = localStorage.getItem('token').split('.')[1]
        //         var base64 = decodeURIComponent(atob(base64url).split('').map(function (c) {
        //             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        //         }).join(''));
        //         var base64json = JSON.parse(base64)
        //         this.getCharacterData(base64json.id)
        //     }
        //     else {
        //         this.props.history.push("/");
        //     }
        // }
    }
    // componentDidMount() {
    //     if (store.getState().app.userid === 0) {
    //         if (localStorage.getItem('token')) {
    //             var base64url = localStorage.getItem('token').split('.')[1]
    //             var base64 = decodeURIComponent(atob(base64url).split('').map(function (c) {
    //                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //             }).join(''));
    //             var base64json = JSON.parse(base64)
    //             this.getCharacterData(base64json.id)
    //         }
    //         else {
    //             this.props.history.push("/");
    //         }
    //     }
    //     else {
    //         this.getCharacterData(store.getState().app.userid)
    //     }
    // }

    selectCharacter(character) {
        console.log("Selected " + character.Name)
        this.setState({
            selectedCharacter: character
        });
    }

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
                        characters: result,
                        selectedCharacter: result[0]
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
            return <Loading />
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
                                <CharacterCard
                                    selected={`${this.state.selectedCharacter.Id === character.Id ? "yes" : "no"}`}
                                    onClick={this.selectCharacter}
                                    character={character}
                                    key={character.Id}
                                    Id={character.Id}
                                />
                            ))}
                        </ul>
                    </div>
                    <CharacterListButtons selectedCharacter={this.state.selectedCharacter} />
                </div>
            );
        }
    }
}
export default withRouter(CharacterList)
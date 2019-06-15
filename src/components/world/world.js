import React, { Component } from 'react';
import "../globalcontext";
import './world.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class World extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: [],
            characterloaded: false,
            error: null,
            savestateloaded: false,
            savestate: []
        };
    }

    componentDidMount() {
        console.log("World prop:" + this.props.characterid)
        this.getCharacterData();
        this.checkSaveState();
    }

    getCharacterData() {
        const getCharacterDataPath = global.ApiStartPath + "character/" + this.props.characterid
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
                        characterloaded: true,
                        character: result[0]
                    });
                },
                (error) => {
                    this.setState({
                        characterloaded: true,
                        error
                    });
                }
            )
    }

    checkSaveState() {
        const getSaveStatePath = global.ApiStartPath + "savestate/" + this.props.characterid
        fetch(getSaveStatePath,
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
                        savestate: result[0],
                        savestateloaded: true
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    createSaveState(value) {
        if(value == false) {
            console.log("Savestate not loaded!")
        }
        else {
            console.log("Savestate is loaded!")
        }

    }

    render() {
        const { error, character, characterloaded, savestate } = this.state;
        console.log(character);
        console.log(savestate);

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!characterloaded) {
            return <div>Loading...</div>;
        }

        return (
            <div id="WorldContainer">
                <p>Hello World</p>
                <p>character id: {this.props.characterid}</p>
                <p>character name: {character.Name}</p>
            </div>
        );
    }

}
export default World;
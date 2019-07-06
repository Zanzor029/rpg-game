import React, { Component } from 'react';
import "../globalcontext";
import './world.css';
import history from '../../history';
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

    routeChange(targetpath) {
        history.push(targetpath);
        setTimeout(function () {
            window.location.reload()
        }, 500)
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
                        savestate: result[0].Id,
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

    createSaveState() {
        console.log("No savestate found. Creating savestate for character id" + this.props.characterid);
        var payload = {
            Characterid: this.props.characterid,
            ZoneLocation: 1
        }
        var createCharacterApiPath = global.ApiStartPath + "savestate/create"
        fetch(createCharacterApiPath,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(payload)
            })
            .then(function (res) { return res.json(); })
            .then(function(res) {
                console.log(res);
            })
    }

    render() {
        const { error, character, characterloaded } = this.state;
        if(!this.props.characterid){
            this.routeChange("/auth/characterlist")
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!characterloaded) {
            return <div>Loading...</div>;
        }
        if(!this.state.savestate){
            this.createSaveState()
        }

        return (
            <div id="WorldContainer">
                <p>character id: {this.props.characterid}</p>
                <p>character name: {character.Name}</p>
                <p>savestate: {this.state.savestate}</p>
                <a href="#" data-wowhead="item-18608&domain=classic">Link</a>
            </div>
        );
    }

}
export default World;
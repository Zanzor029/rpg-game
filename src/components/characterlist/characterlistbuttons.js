import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from '../../history';

class CharacterListButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            deleteresult: [],
            isLoaded: false
        };
    }
    routeChange(targetpath) {
        history.push(targetpath);
        setTimeout(function () {
            window.location.reload()
        }, 500)
      }

    deleteCharacterApiCall(characterId) {
        console.log("ApiPath")

    };

    deleteCharacter() {
        if (global.SelectedCharacter === "0") {
            console.log("Selected Character is 0, will not delete");
            alert("No character is selected!");
        }
        else {

            var alertConfirmation = window.confirm("This will delete the character permantently!");
            if (alertConfirmation === true) {
                console.log("Delete character: " + global.SelectedCharacter);
                var apipath = global.ApiStartPath + "deletecharacter/" + global.SelectedCharacter
                fetch(apipath, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                deleteresult: result
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                    .then(
                        setTimeout(function () {
                            window.location.href = window.location.href
                        }, 500)
                    );

            }
            else {
                console.log("User changed his mind on character: " + global.SelectedCharacter);
            }

        }


    };

    enterWorld() {
        if(!this.props.selectedCharacterId)
        {
            alert("No character selected");
        }
        else
        {
            console.log(`Enter world with ${this.props.selectedCharacterId}`);
        }

    }

    render() {

        return (
            <div id="CharacterListBtnsPanel">
                <div className="CharacterListBtnPanel" id="CharacterListCreateNewBtnPanel">
                    <Link to="/auth/CreateCharacter" className="CharacterListBtn"><button className="CharacterListBtn" id="CharacterListCreateNewBtn" type="Button">Create New Character</button></Link>
                </div>
                <div className="CharacterListBtnPanel" id="CharacterListDeleteBtnPanel">
                    <button className="CharacterListBtn" id="CharacterListDeleteBtn" type="Button" onClick={() => { this.deleteCharacter() }}>Delete Character</button>
                </div>

                <div className="CharacterListBtnPanel" id="CharacterListEnterWorldBtnPanel">
                    <Link to="/auth/world"><button className="CharacterListBtn" id="CharacterListEnterWorldBtn" type="Button"  onClick={() => { this.enterWorld() }}>Enter World</button></Link>
                </div>
            </div>
        );
    }
};
export default CharacterListButtons;
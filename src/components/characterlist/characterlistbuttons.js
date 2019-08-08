import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from '../../history';
import Button from 'react-bootstrap/Button'


class CharacterListButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            deleteresult: [],
            isLoaded: false
        };
    }
    deleteCharacter() {
        if (this.props.selectedCharacter == null) {
            console.log("Selected Character is null, will not delete");
            alert("No character is selected!");
        }
        else {

            var alertConfirmation = window.confirm("This will delete the character permantently!");
            if (alertConfirmation === true) {
                console.log("Delete character: " + this.props.selectedCharacter.Id);
                var apipath = global.ApiStartPath + "deletecharacter/" + this.props.selectedCharacter.Id
                fetch(apipath, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                deleteresult: result
                            })
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    )
                    .then (
                        setTimeout(function () {
                            window.location.href = window.location.href
                        }, 500)
                    )
            }
            else {
                console.log("User changed his mind on character: " + this.props.selectedCharacter.Id);
            }

        }


    };

    enterWorld() {
        if (!this.props.selectedCharacter.Id) {
            alert("No character selected");
        }
        else {
            console.log(`Enter world with ${this.props.selectedCharacter.Id}`);
            
        }

    }

    render() {
        return (
            <div id="CharacterListBtnsPanel">
                <div className="CharacterListBtnPanel" id="CharacterListCreateNewBtnPanel">
                    <Link to="/auth/CreateCharacter" className="CharacterListBtn"><Button variant="dark" className="CharacterListBtn" id="CharacterListCreateNewBtn">Create New Character</Button></Link>
                </div>
                <div className="CharacterListBtnPanel" id="CharacterListDeleteBtnPanel">
                    <Link className="CharacterListBtn" to="#"><Button variant="dark" className="CharacterListBtn" id="CharacterListDeleteBtn" onClick={() => { this.deleteCharacter() }}>Delete Character</Button></Link>
                </div>

                <div className="CharacterListBtnPanel" id="CharacterListEnterWorldBtnPanel">
                    <Link className="CharacterListBtn" to={{
                        pathname: '/auth/world',
                        state: {
                            characterid: this.props.selectedCharacter.Id
                        }
                    }}>
                        <Button variant="dark" className="CharacterListBtn" id="CharacterListEnterWorldBtn" onClick={() => { this.enterWorld() }}>Enter World</Button></Link>
                </div>
            </div>
        );
    }
};
export default CharacterListButtons;
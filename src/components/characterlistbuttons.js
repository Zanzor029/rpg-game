import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

class CharacterListButtons extends Component {
    deleteCharacterApiCall(characterId) {
        console.log("ApiPath")
    };

    deleteCharacter(){
        if(global.SelectedCharacter === "0"){
            console.log("Selected Character is 0, will not delete");
            alert("No character is selected!");
        }
        else
        {
            
            var alertConfirmation = window.confirm("This will delete the character permantently!");
            if(alertConfirmation === true) {
                console.log("Delete character: "+global.SelectedCharacter);
                var apipath = global.DeleteCharacterApiStartPath+global.SelectedCharacter
                fetch(apipath, {
                    method: "DELETE",
                })
                window.location.reload(true);
            }
            else
            {
                console.log("User changed his mind on character: "+global.SelectedCharacter);
            }
            
        }


    };

    render() {

        return (
            <div id="CharacterListBtnsPanel">
                <div className="CharacterListBtnPanel" id="CharacterListCreateNewBtnPanel">
                <Link to="/CreateCharacter" className="CharacterListBtn"><button className="CharacterListBtn" id="CharacterListCreateNewBtn" type="Button">Create New Character</button></Link>    
                </div>
                <div className="CharacterListBtnPanel" id="CharacterListDeleteBtnPanel">
                    <button className="CharacterListBtn" id="CharacterListDeleteBtn" type="Button" onClick={() => {this.deleteCharacter()}}>Delete Character</button>
                </div>

                <div className="CharacterListBtnPanel" id="CharacterListEnterWorldBtnPanel">
                    <button className="CharacterListBtn" id="CharacterListEnterWorldBtn" type="Button">Enter World</button>
                </div>
            </div>
        );
    }
};
export default CharacterListButtons;
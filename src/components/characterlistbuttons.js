import React, { Component } from 'react';
import '../App.css';

class CharacterListButtons extends Component {
    render() {

        return (
                <div id="CharacterListBtnsPanel">
                    <div class="CharacterListBtnPanel" id="CharacterListCreateNewBtnPanel">
                        <button class="CharacterListBtn" id="CharacterListCreateNewBtn" type="Button">Create
                New Character</button>
                    </div>
                    <div class="CharacterListBtnPanel" id="CharacterListDeleteBtnPanel">
                        <button class="CharacterListBtn" id="CharacterListDeleteBtn" type="Button">Delete
                Character</button>
                    </div>

                    <div class="CharacterListBtnPanel" id="CharacterListEnterWorldBtnPanel">
                        <button class="CharacterListBtn" id="CharacterListEnterWorldBtn" type="Button">Enter
                World</button>
                    </div>
                </div>
        );
    }
}
export default CharacterListButtons;
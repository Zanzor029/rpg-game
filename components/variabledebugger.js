import React, { Component } from 'react';
import '../App.css';
import "./globalcontext"


class VariableDebugger extends Component {
    render() {
        return (
            <div>
                <p>SelectedCharacterListId: {global.SelectedCharacterListId}</p>
                <p>SelectedCharacterListName: {global.SelectedCharacterListName}</p>
                <p>SelectedCharacter: {global.SelectedCharacter}</p>
                <p>CreateCharacterSelectedRaceId: {global.CreateCharacterSelectedRaceId}</p>
                <p>CreateCharacterSelectedClassId: {global.CreateCharacterSelectedClassId}</p>

                <p>Base Stats:</p>
                <p>CreateCharacterSelectedClassBaseStrength: {global.CreateCharacterSelectedClassBaseStrength}</p>
                <p>CreateCharacterSelectedClassBaseAgility: {global.CreateCharacterSelectedClassBaseAgility}</p>
                <p>CreateCharacterSelectedClassBaseStamina: {global.CreateCharacterSelectedClassBaseStamina}</p>
                <p>CreateCharacterSelectedClassBaseIntellect: {global.CreateCharacterSelectedClassBaseIntellect}</p>
                <p>CreateCharacterSelectedClassBaseSpirit: {global.CreateCharacterSelectedClassBaseSpirit}</p>
                
                <p>CreateCharacterSelectedRaceBaseStrength: {global.CreateCharacterSelectedRaceBaseStrength}</p>
                <p>CreateCharacterSelectedRaceBaseAgility: {global.CreateCharacterSelectedRaceBaseAgility}</p>
                <p>CreateCharacterSelectedRaceBaseStamina: {global.CreateCharacterSelectedRaceBaseStamina}</p>
                <p>CreateCharacterSelectedRaceBaseIntellect: {global.CreateCharacterSelectedRaceBaseIntellect}</p>
                <p>CreateCharacterSelectedRaceBaseSpirit: {global.CreateCharacterSelectedRaceBaseSpirit}</p>

                <p>CreateCharacterSelectedCombinedBaseStrength: {global.CreateCharacterSelectedCombinedBaseStrength}</p>
                <p>CreateCharacterSelectedCombinedBaseAgility: {global.CreateCharacterSelectedCombinedBaseAgility}</p>
                <p>CreateCharacterSelectedCombinedBaseStamina: {global.CreateCharacterSelectedCombinedBaseStamina}</p>
                <p>CreateCharacterSelectedCombinedBaseIntellect: {global.CreateCharacterSelectedCombinedBaseIntellect}</p>
                <p>CreateCharacterSelectedCombinedBaseSpirit: {global.CreateCharacterSelectedCombinedBaseSpirit}</p>

            </div>
        );
    }
}
export default VariableDebugger;
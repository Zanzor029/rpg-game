import { GET_CHARACTERS, UPDATE_CHARACTER, SET_LOGGED_IN_CHARACTER } from './types'
import axios from 'axios'

export const getCharacters = () => dispatch => {
    console.log("get characters with redux function...")
    //API Request to get all characters
    axios.get(global.ApiStartPath + "characterstest")
        .then(
            res => dispatch({
                type: GET_CHARACTERS,
                payload: res.data
            })
        )
}

export const setLoggedInCharacter = (character) => dispatch => {
    dispatch({
        type: SET_LOGGED_IN_CHARACTER,
        payload: character
    })
}
import { GET_CHARACTERS, UPDATE_CHARACTER, SET_LOGGED_IN_CHARACTER } from '../actions/types'

const initialState = {
    characters: [],
    loggedincharacter: {},
    userid: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHARACTERS:
        console.log("action payload below")    
        console.log(action.payload)
            return {
                ...state,
                characters: action.payload
            }
        case SET_LOGGED_IN_CHARACTER:
            console.log("Logging in to world with character name:" + action.payload.Name)
            return {
                ...state,
                loggedincharacter: action.payload
            }
        default:
            return state
    }
}
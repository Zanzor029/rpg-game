import { LOGIN_ACCOUNT } from '../actions/types'
import { REGISTER_ACCOUNT } from '../actions/types'

const initialState = {
    jwt: null,
    userid: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_ACCOUNT:
            console.log("Login account with payload - appReducer")
            return {
                ...state,
                jwt: action.payload.token,
                userid: action.payload.userid
            }
        case REGISTER_ACCOUNT:
            console.log("register account with payload - appReducer")
        default:
            return state
    }
}
import { LOGIN_ACCOUNT } from '../actions/types'

const initialState = {
    jwt: null,
    userid: 0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_ACCOUNT:
        console.log("Login account with payload")    
        console.log(action.payload)
            return {
                ...state,
                jwt: action.payload.token,
                userid: action.payload.userid
            }
        default:
            return state
    }
}
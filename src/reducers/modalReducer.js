import { SHOW_MODAL, HIDE_MODAL } from '../actions/types'

const initialState = {
    modalType: null,
    modalProps: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            console.log("Show Modal - modalReducer")
            return {
                modalProps: action.modalProps,
                modalType: action.modalType,
                type: action.type
            }
        case HIDE_MODAL:
            console.log("Hide Modal - modalReducer")
            return initialState
        default:
            return state
    }
}
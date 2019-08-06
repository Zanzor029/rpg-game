import { SHOW_TOOLTIP, HIDE_TOOLTIP } from '../actions/types'

const initialState = {
    tooltipType: null,
    tooltipProps: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_TOOLTIP:
            return {
                tooltipProps: action.tooltipProps,
                tooltipType: action.tooltipType,
                type: action.type
            }
        case HIDE_TOOLTIP:
            return initialState
        default:
            return state
    }
}
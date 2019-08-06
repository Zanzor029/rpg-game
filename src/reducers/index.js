import { combineReducers } from 'redux'
import characterReducer from './characterReducer'
import accountReducer from './accountReducer';
import modalReducer from './modalReducer';
import tooltipReducer from './tooltipReducer'

export default combineReducers({
    world: characterReducer,
    app: accountReducer,
    modal: modalReducer,
    tooltip: tooltipReducer
});
import { combineReducers } from 'redux'
import worldReducer from './worldReducer'
import appReducer from './appReducer';
import modalReducer from './modalReducer';
import tooltipReducer from './tooltipReducer'

export default combineReducers({
    world: worldReducer,
    app: appReducer,
    modal: modalReducer,
    tooltip: tooltipReducer
});
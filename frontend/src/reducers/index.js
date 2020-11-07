import { combineReducers } from 'redux'
import roomReducer from './roomReducer'
import alertReducer from './alertReducer'
export default combineReducers({
    room:roomReducer,
    alert:alertReducer
    
});
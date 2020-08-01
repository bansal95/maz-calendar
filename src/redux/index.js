import { combineReducers } from 'redux';
import CalendarReducer from './calendar/reducer';

export default combineReducers({
    calendar : CalendarReducer
});
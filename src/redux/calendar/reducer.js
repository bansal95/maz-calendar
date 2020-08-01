import {ADD_EVENT, DELETE_EVENT, UPDATE_EVENT} from "../constants";

const initialState = {
    events: {},
    error: ''
};

const calendarReducer = (state = initialState,action) => {
    switch(action.type) {
        case ADD_EVENT:
            const add_events = { ...state.events };
            add_events[action.payload.event_id] = action.payload.event;

            return { ...state,events: add_events };

        case DELETE_EVENT:
            const del_events = { ...state.events };
            delete del_events[action.payload];

            return { ...state,events: del_events };

        case UPDATE_EVENT:
            const upd_events = { ...state.events };
            upd_events[action.payload.event_id] = action.payload.event;

            return { ...state,events: upd_events };

        default:
            return state;
    }
}

export default calendarReducer;

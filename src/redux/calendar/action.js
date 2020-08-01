import {ADD_EVENT, DELETE_EVENT, UPDATE_EVENT} from "../constants";

export const addEvent = (event_id,event) => {
  return (dispatch) => dispatch({
    type: ADD_EVENT,
    payload: { event_id,event }
  });
};

export const deleteEvent = (event_id) => {
  return (dispatch) => dispatch({
  type: DELETE_EVENT,
  payload: event_id
})
};

export const updateEvent = (event_id,event) => {
  return (dispatch) => dispatch({
    type: UPDATE_EVENT,
    payload: {event_id, event}
  })
};

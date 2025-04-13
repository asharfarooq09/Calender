
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  ADD_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
} from '../types';

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
        error: null,
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map(event =>
          event._id === action.payload._id ? action.payload : event
        ),
      };
    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload),
      };
    default:
      return state;
  }
};

export default eventReducer;


import {
  FETCH_GOALS_REQUEST,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAILURE,
  SELECT_GOAL,
} from '../types';

const initialState = {
  goals: [],
  loading: false,
  error: null,
  selectedGoal: null,
};

const goalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GOALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GOALS_SUCCESS:
      return {
        ...state,
        loading: false,
        goals: action.payload,
        error: null,
      };
    case FETCH_GOALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SELECT_GOAL:
      return {
        ...state,
        selectedGoal: action.payload,
      };
    default:
      return state;
  }
};

export default goalReducer;

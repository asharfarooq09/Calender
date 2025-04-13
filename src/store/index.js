
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import  thunk  from 'redux-thunk';
import eventReducer from './reducers/eventReducer';
import goalReducer from './reducers/goalReducer';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  goals: goalReducer,
  tasks: taskReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

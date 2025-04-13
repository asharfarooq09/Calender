
import axios from 'axios';
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from '../types';

const API_URL = 'http://localhost:5000/api';

export const fetchTasksByGoal = (goalId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TASKS_REQUEST });
    
    const res = await axios.get(`${API_URL}/tasks/goal/${goalId}`);
    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    
    const allMockTasks = {
      '3': [ 
        {
          _id: '1',
          name: 'AI based agents',
          goalId: '3',
          color: '#66BB6A',
        },
        {
          _id: '2',
          name: 'MLE',
          goalId: '3',
          color: '#66BB6A',
        },
        {
          _id: '3',
          name: 'DE related',
          goalId: '3',
          color: '#66BB6A',
        },
        {
          _id: '4',
          name: 'Basics',
          goalId: '3',
          color: '#66BB6A',
        },
      ],
      '1': [ 
        {
          _id: '5',
          name: 'Morning Run',
          goalId: '1',
          color: '#FF5252',
        },
        {
          _id: '6',
          name: 'Gym Workout',
          goalId: '1',
          color: '#FF5252',
        },
      ],
      '2': [ 
        {
          _id: '7',
          name: 'Study Math',
          goalId: '2',
          color: '#448AFF',
        },
        {
          _id: '8',
          name: 'Complete Assignment',
          goalId: '2',
          color: '#448AFF',
        },
      ],
      '4': [ 
        {
          _id: '9',
          name: 'Soccer Practice',
          goalId: '4',
          color: '#FFA726',
        },
        {
          _id: '10',
          name: 'Basketball Game',
          goalId: '4',
          color: '#FFA726',
        },
      ],
    };

    const mockTasks = allMockTasks[goalId] || [];

    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: mockTasks,
    });
  }
};

export const addTask = (taskData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/tasks`, taskData);
    
    if (taskData.goalId) {
      dispatch(fetchTasksByGoal(taskData.goalId));
    }
    
    return res.data;
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
    
    if (taskData.goalId) {
      dispatch(fetchTasksByGoal(taskData.goalId));
    }
    
    return res.data;
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = (taskId, goalId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
    
    if (goalId) {
      dispatch(fetchTasksByGoal(goalId));
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

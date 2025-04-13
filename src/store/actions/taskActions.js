
import axios from 'axios';
import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
} from '../types';

// API URL - replace with your actual MongoDB API endpoint
const API_URL = 'http://localhost:5000/api';

// Fetch tasks by goal
export const fetchTasksByGoal = (goalId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_TASKS_REQUEST });
    
    // Connect to real API endpoint
    const res = await axios.get(`${API_URL}/tasks/goal/${goalId}`);
    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    
    // Mock data as fallback for development
    const allMockTasks = {
      '3': [ // LEARN goal
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
      '1': [ // Be Fit goal
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
      '2': [ // Academics goal
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
      '4': [ // Sports goal
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

// Add a new task
export const addTask = (taskData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/tasks`, taskData);
    
    // After adding a task, fetch all tasks for the goal again
    if (taskData.goalId) {
      dispatch(fetchTasksByGoal(taskData.goalId));
    }
    
    return res.data;
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

// Update a task
export const updateTask = (taskId, taskData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
    
    // After updating a task, fetch all tasks for the goal again
    if (taskData.goalId) {
      dispatch(fetchTasksByGoal(taskData.goalId));
    }
    
    return res.data;
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

// Delete a task
export const deleteTask = (taskId, goalId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
    
    // After deleting a task, fetch all tasks for the goal again
    if (goalId) {
      dispatch(fetchTasksByGoal(goalId));
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

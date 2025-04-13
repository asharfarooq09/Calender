
import axios from 'axios';
import {
  FETCH_GOALS_REQUEST,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAILURE,
  SELECT_GOAL,
} from '../types';

// API URL - replace with your actual MongoDB API endpoint
const API_URL = 'http://localhost:5000/api';

// Fetch goals
export const fetchGoals = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_GOALS_REQUEST });
    
    // Connect to real API endpoint
    const res = await axios.get(`${API_URL}/goals`);
    dispatch({
      type: FETCH_GOALS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    // Fallback to mock data if API fails (for development)
    console.error('Error fetching goals:', error);
    
    // Mock data for testing
    const mockGoals = [
      {
        _id: '1',
        name: 'Be Fit',
        color: '#FF5252',
      },
      {
        _id: '2',
        name: 'Academics',
        color: '#448AFF',
      },
      {
        _id: '3',
        name: 'LEARN',
        color: '#66BB6A',
      },
      {
        _id: '4',
        name: 'Sports',
        color: '#FFA726',
      },
    ];

    dispatch({
      type: FETCH_GOALS_SUCCESS,
      payload: mockGoals,
    });
  }
};

// Select a goal
export const selectGoal = (goal) => ({
  type: SELECT_GOAL,
  payload: goal,
});

// Add a new goal
export const addGoal = (goalData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/goals`, goalData);
    
    // After adding a goal, fetch all goals again to update the list
    dispatch(fetchGoals());
    
    return res.data;
  } catch (error) {
    console.error('Error adding goal:', error);
  }
};

// Update a goal
export const updateGoal = (goalId, goalData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/goals/${goalId}`, goalData);
    
    // After updating a goal, fetch all goals again to update the list
    dispatch(fetchGoals());
    
    return res.data;
  } catch (error) {
    console.error('Error updating goal:', error);
  }
};

// Delete a goal
export const deleteGoal = (goalId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/goals/${goalId}`);
    
    // After deleting a goal, fetch all goals again to update the list
    dispatch(fetchGoals());
  } catch (error) {
    console.error('Error deleting goal:', error);
  }
};


import axios from 'axios';
import {
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  ADD_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
} from '../types';

const API_URL = 'http://localhost:5000/api';

export const fetchEvents = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_EVENTS_REQUEST });
    
    const res = await axios.get(`${API_URL}/events`);
    
    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    
    const mockEvents = [
      {
        _id: '1',
        title: 'Monday Wake-up Hour',
        category: 'exercise',
        start: new Date(2023, 3, 22, 8, 0),
        end: new Date(2023, 3, 22, 9, 0),
        color: '#4CAF50',
      },
      {
        _id: '2',
        title: 'All-Team Kickoff',
        category: 'work',
        start: new Date(2023, 3, 22, 9, 0),
        end: new Date(2023, 3, 22, 10, 0),
        color: '#2196F3',
      },
      {
        _id: '3',
        title: 'Coffee Chat',
        category: 'social',
        start: new Date(2023, 3, 23, 9, 0),
        end: new Date(2023, 3, 23, 9, 30),
        color: '#FF9800',
      },
    ];

    dispatch({
      type: FETCH_EVENTS_SUCCESS,
      payload: mockEvents,
    });
  }
};

export const addEvent = (eventData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/events`, eventData);
    
    dispatch({
      type: ADD_EVENT_SUCCESS,
      payload: res.data,
    });
    
    return res.data;
  } catch (error) {
    console.error('Error adding event:', error);
    
    const newEvent = {
      ...eventData,
      _id: Math.random().toString(36).substr(2, 9),
    };

    dispatch({
      type: ADD_EVENT_SUCCESS,
      payload: newEvent,
    });
    
    return newEvent;
  }
};

export const updateEvent = (eventId, eventData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/events/${eventId}`, eventData);
    
    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: res.data,
    });
    
    return res.data;
  } catch (error) {
    console.error('Error updating event:', error);
    
    const updatedEvent = {
      ...eventData,
      _id: eventId,
    };

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: updatedEvent,
    });
    
    return updatedEvent;
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/events/${eventId}`);
    
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: eventId,
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    
    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: eventId,
    });
  }
};

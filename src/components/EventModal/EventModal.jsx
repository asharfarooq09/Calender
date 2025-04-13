
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent } from '../../store/actions/eventActions';
import { format, parse } from 'date-fns';
import './EventModal.css';

const EventModal = ({ show, onClose, selectedEvent, selectedTimeSlot }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'exercise',
    startDate: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endDate: format(new Date(), 'yyyy-MM-dd'),
    endTime: '10:00',
  });
  
  useEffect(() => {
    if (selectedEvent) {
      const start = new Date(selectedEvent.start);
      const end = new Date(selectedEvent.end);
      
      setFormData({
        title: selectedEvent.title,
        category: selectedEvent.category,
        startDate: format(start, 'yyyy-MM-dd'),
        startTime: format(start, 'HH:mm'),
        endDate: format(end, 'yyyy-MM-dd'),
        endTime: format(end, 'HH:mm'),
      });
    } else if (selectedTimeSlot) {
      const { start, end } = selectedTimeSlot;
      
      setFormData({
        title: '',
        category: 'exercise',
        startDate: format(start, 'yyyy-MM-dd'),
        startTime: format(start, 'HH:mm'),
        endDate: format(end, 'yyyy-MM-dd'),
        endTime: format(end, 'HH:mm'),
      });
    }
  }, [selectedEvent, selectedTimeSlot]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const startDateTime = parseDateTime(formData.startDate, formData.startTime);
    const endDateTime = parseDateTime(formData.endDate, formData.endTime);
    
    const eventData = {
      title: formData.title,
      category: formData.category,
      start: startDateTime,
      end: endDateTime,
      color: getCategoryColor(formData.category),
    };
    
    if (selectedEvent) {
      dispatch(updateEvent(selectedEvent._id, eventData));
    } else {
      dispatch(addEvent(eventData));
    }
    
    onClose();
  };
  
  const parseDateTime = (dateString, timeString) => {
    return parse(`${dateString} ${timeString}`, 'yyyy-MM-dd HH:mm', new Date());
  };
  
  const handleDelete = () => {
    if (selectedEvent) {
      if (window.confirm('Are you sure you want to delete this event?')) {
        dispatch(deleteEvent(selectedEvent._id));
        onClose();
      }
    }
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      exercise: '#4CAF50',
      eating: '#FF5722',
      work: '#2196F3',
      relax: '#9C27B0',
      family: '#795548',
      social: '#FF9800',
    };
    
    return colors[category] || '#2196F3';
  };
  
  if (!show) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{selectedEvent ? 'Edit Event' : 'Create New Event'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Event title"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="exercise">Exercise</option>
              <option value="eating">Eating</option>
              <option value="work">Work</option>
              <option value="relax">Relax</option>
              <option value="family">Family</option>
              <option value="social">Social</option>
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>
          
          <div className="modal-actions">
            {selectedEvent && (
              <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="save-button">
              {selectedEvent ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;

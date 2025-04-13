
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

const CalendarEvent = ({ event, style, onClick, onDrop }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: 'EVENT',
    item: { 
      id: event._id,
      title: event.title,
      category: event.category,
      start: event.start,
      end: event.end,
      color: event.color
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(event._id, dropResult.start, dropResult.end);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  // Toggle expanded state
  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  // Format event time
  const formatTime = (date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  
  // Calculate event duration in minutes
  const getDuration = () => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const durationMs = end - start;
    return Math.round(durationMs / (1000 * 60));
  };
  
  // Determine if event is short (less than 30 minutes)
  const isShortEvent = getDuration() < 30;
  
  return (
    <div
      ref={drag}
      className={`event event-${event.category}`}
      style={{
        ...style,
        opacity: isDragging ? 0.5 : 1,
        height: isExpanded && !isShortEvent ? '120px' : style.height,
        zIndex: isExpanded ? 10 : 1,
        cursor: 'grab',
        backgroundColor: event.color || undefined,
        boxShadow: isDragging ? '0 0 10px rgba(0,0,0,0.3)' : undefined,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onDoubleClick={toggleExpand}
    >
      <div className="event-title" style={{ fontWeight: 'bold' }}>
        {event.title}
      </div>
      {(!isShortEvent || isExpanded) && (
        <div className="event-time">
          {formatTime(event.start)} - {formatTime(event.end)}
        </div>
      )}
      {isExpanded && (
        <div className="event-category">
          Category: {event.category}
        </div>
      )}
      {isDragging && (
        <div className="drag-preview" style={{ 
          position: 'fixed',
          pointerEvents: 'none',
          width: '200px',
          padding: '8px',
          backgroundColor: event.color || '#2196F3',
          color: 'white',
          borderRadius: '4px',
          opacity: 0.8,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          {event.title}
        </div>
      )}
    </div>
  );
};

export default CalendarEvent;

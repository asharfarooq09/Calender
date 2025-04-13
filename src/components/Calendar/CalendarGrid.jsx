
import React, { useState } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { useDrop } from 'react-dnd';
import CalendarEvent from './CalendarEvent';

const CalendarGrid = ({
  days,
  events,
  handleCellClick,
  handleEventClick,
  handleEventDrop,
}) => {
  // State to track which cell is currently being dragged over
  const [dragOverCell, setDragOverCell] = useState(null);
  
  // Generate time slots from 7 AM to 8 PM
  const timeSlots = Array.from({ length: 14 }, (_, i) => i + 7);
  
  // Check if event should be displayed in this day and time
  const shouldDisplayEvent = (event, day, hour) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    
    return (
      isSameDay(eventStart, day.date) &&
      eventStart.getHours() <= hour &&
      eventEnd.getHours() > hour
    );
  };
  
  // Calculate event position and height
  const getEventStyle = (event, hour) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    
    const startHour = eventStart.getHours();
    const startMinute = eventStart.getMinutes();
    const endHour = eventEnd.getHours();
    const endMinute = eventEnd.getMinutes();
    
    const top = (startHour === hour) ? (startMinute / 60) * 100 : 0;
    
    let height;
    if (endHour > hour + 1) {
      height = 100 - top;
    } else {
      height = ((endHour - hour) * 60 + endMinute) / 60 * 100 - top;
    }
    
    return {
      top: `${top}%`,
      height: `${height}%`,
    };
  };

  // Create a drop target for each cell
  const TimeCell = ({ day, hour, children }) => {
    const cellId = `${day.dayName}-${day.dayNumber}-${hour}`;
    
    const [{ isOver, canDrop }, drop] = useDrop({
      accept: ['EVENT', 'TASK'],
      drop: () => {
        const dropDate = new Date(day.date);
        dropDate.setHours(hour);
        dropDate.setMinutes(0);
        dropDate.setSeconds(0);
        
        const endDate = new Date(dropDate);
        endDate.setHours(hour + 1);
        
        return {
          start: dropDate,
          end: endDate,
        };
      },
      hover: () => {
        setDragOverCell(cellId);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    });
    
    return (
      <div
        ref={drop}
        className={`calendar-cell ${isOver ? 'cell-drop-hover' : ''} ${dragOverCell === cellId ? 'drag-over' : ''}`}
        onClick={() => handleCellClick(hour, day)}
        style={{ 
          position: 'relative',
          backgroundColor: isOver ? 'rgba(0, 123, 255, 0.2)' : 
                        dragOverCell === cellId ? 'rgba(0, 123, 255, 0.1)' : undefined,
          transition: 'background-color 0.2s ease',
          border: isOver ? '1px dashed #2196F3' : '1px solid #f0f0f0'
        }}
        onMouseLeave={() => {
          if (dragOverCell === cellId) {
            setDragOverCell(null);
          }
        }}
      >
        {isOver && canDrop && (
          <div className="drop-indicator" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px dashed #2196F3',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 1
          }} />
        )}
        {children}
      </div>
    );
  };
  
  return (
    <div className="calendar-grid">
      {/* Time labels column */}
      <div className="time-labels">
        <div className="day-header" style={{ backgroundColor: '#f5f5f5', height: '64px' }}></div>
        {timeSlots.map(hour => (
          <div key={hour} className="time-label">
            {hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}
          </div>
        ))}
      </div>
      
      {/* Day columns */}
      {days.map(day => (
        <div key={day.dayName + day.dayNumber} className="day-column">
          {/* Day header */}
          <div className={`day-header ${isSameDay(day.date, new Date()) ? 'current-day' : ''}`}>
            <div className="day-name">{day.dayName}</div>
            <div className="day-number">{day.dayNumber}</div>
          </div>
          
          {/* Time cells */}
          {timeSlots.map(hour => (
            <TimeCell key={`${day.dayNumber}-${hour}`} day={day} hour={hour}>
              {/* Events */}
              {events
                .filter(event => shouldDisplayEvent(event, day, hour))
                .map(event => (
                  <CalendarEvent
                    key={event._id}
                    event={event}
                    style={getEventStyle(event, hour)}
                    onClick={() => handleEventClick(event)}
                    onDrop={handleEventDrop}
                  />
                ))}
            </TimeCell>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;

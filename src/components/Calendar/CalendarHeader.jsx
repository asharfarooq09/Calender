
import React from 'react';
import { format } from 'date-fns';

const CalendarHeader = ({
  currentDate,
  view,
  setView,
  handlePrevious,
  handleNext,
  handleToday,
}) => {
  // Format the current month and year for display
  const dateFormat = view === 'month' ? 'MMMM yyyy' : 'MMMM d, yyyy';

  return (
    <div className="calendar-header">
      <div className="header-left">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 mr-2"
          onClick={handleToday}
        >
          Today
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-2 mr-1"
          onClick={handlePrevious}
        >
          &lt;
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded px-3 py-2"
          onClick={handleNext}
        >
          &gt;
        </button>
        <h2 className="header-title">{format(currentDate, dateFormat)}</h2>
      </div>
      <div className="header-right">
        <div className="view-selector">
          <button
            className={`view-option ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button
            className={`view-option ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button
            className={`view-option ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
          <button
            className={`view-option ${view === 'year' ? 'active' : ''}`}
            onClick={() => setView('year')}
          >
            Year
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;

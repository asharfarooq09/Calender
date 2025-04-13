import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { fetchEvents, updateEvent } from "../../store/actions/eventActions";
import EventModal from "../EventModal/EventModal";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import "./Calendar.css";

const Calendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const generateDays = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      days.push({
        date,
        dayName: format(date, "EEE"),
        dayNumber: format(date, "d"),
      });
    }

    return days;
  };

  const handlePrevious = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else if (view === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else {
    }
  };

  const handleNext = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleCellClick = (time, day) => {
    const startTime = new Date(day.date);
    startTime.setHours(time);
    startTime.setMinutes(0);

    const endTime = new Date(startTime);
    endTime.setHours(time + 1);

    setSelectedTimeSlot({
      start: startTime,
      end: endTime,
    });

    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedTimeSlot(null);
    setShowModal(true);
  };

  const getEventsForView = () => {
    if (view === "day") {
      return events.filter((event) =>
        isSameDay(new Date(event.start), selectedDate)
      );
    } else {
      const days = generateDays();
      return events.filter((event) =>
        days.some((day) => isSameDay(new Date(event.start), day.date))
      );
    }
  };

  const handleEventDrop = (eventId, start, end) => {
    console.log("Event dropped:", eventId, start, end);
    const eventToUpdate = events.find((event) => event._id === eventId);
    if (eventToUpdate) {
      const updatedEvent = {
        ...eventToUpdate,
        start,
        end,
      };
      dispatch(updateEvent(eventId, updatedEvent));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setSelectedTimeSlot(null);
  };

  return (
    <div className="calendar-container">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        setView={setView}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleToday={handleToday}
      />
      <CalendarGrid
        days={generateDays()}
        events={getEventsForView()}
        handleCellClick={handleCellClick}
        handleEventClick={handleEventClick}
        handleEventDrop={handleEventDrop}
      />
      {showModal && (
        <EventModal
          show={showModal}
          onClose={handleCloseModal}
          selectedEvent={selectedEvent}
          selectedTimeSlot={selectedTimeSlot}
        />
      )}
    </div>
  );
};

export default Calendar;

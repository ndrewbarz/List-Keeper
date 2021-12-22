import React, { useRef } from "react";
import "react-day-picker/lib/style.css";
import { CalendarBackground, CalendarStyled } from "../../../styled/style";

const Calendar = ({ showCalendar, setShowCalendar, children }) => {
  const calendarRef = useRef();


  const closeCalendar = (e) => {
    e.preventDefault();
    setShowCalendar(false);
  };

  return showCalendar ? (
    <CalendarBackground
      ref={calendarRef}
      onClick={(e) => calendarRef.current === e.target && closeCalendar(e)}
    >
      <CalendarStyled>
        {children}
      </CalendarStyled>
    </CalendarBackground>
  ) : null;
};

export default Calendar;

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterActionCreators } from "../store/reducers/filter/action-creator";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { CalendarBackground, CalendarStyled } from "../styled/style";

const Calendar = ({ showCalendar, setShowCalendar }) => {
  const { filterByDate } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const calendarRef = useRef();

  const handleDayClick = (day) => {
    dispatch(FilterActionCreators.setFilterByDate(day.toLocaleDateString()));
    setShowCalendar(false);
  };

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
        <DayPicker selectedDays={filterByDate} onDayClick={handleDayClick} />
        <p style={{ textAlign: "center" }}>
          {filterByDate ? filterByDate : "Please select a day 👻"}
        </p>
      </CalendarStyled>
    </CalendarBackground>
  ) : null;
};

export default Calendar;

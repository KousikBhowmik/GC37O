import React from "react";
import CurrentTime from "./CurrentTime.jsx";
import CalendarCom from "./CalendarCom.jsx";

const TimeAndCalendarCom = () => {
  return (
    <div className="flex flex-col  gap-2">
      <CurrentTime />
      <CalendarCom />
    </div>
  );
};

export default TimeAndCalendarCom;

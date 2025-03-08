import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDarkMode } from "../store/useStore.js";

const CalendarCom = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const today = new Date();

  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startWeek = startOfWeek(startMonth);
  const endWeek = endOfWeek(endMonth);

  const days = [];
  let day = startWeek;

  while (day <= endWeek) {
    days.push(day);
    day = addDays(day, 1);
  }

  const prevMonth = () => setCurrentDate(addDays(startMonth, -1));
  const nextMonth = () => setCurrentDate(addDays(endMonth, 1));

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-black text-white border-gray-700"
          : "bg-white text-black border-gray-300"
      } w-full max-w-sm p-3 rounded-lg border transition duration-300 text-sm`}
    >
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={prevMonth}
          className="p-1 hover:bg-gray-300 cursor-pointer dark:hover:bg-[#242424] rounded-md"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-base font-medium">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 hover:bg-gray-300 cursor-pointer dark:hover:bg-[#242424] rounded-md"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-gray-800 dark:text-gray-200">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-1 font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, index) => (
          <div
            key={index}
            className={`p-2 rounded-md transition duration-200 cursor-pointer ${
              isSameMonth(day, currentDate)
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-500 dark:text-gray"
            } ${
              isSameDay(day, today)
                ? `bg-black dark:bg-gray-800 text-white   `
                : "hover:bg-gray-200 dark:hover:bg-[#242424]"
            }`}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarCom;

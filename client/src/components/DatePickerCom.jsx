import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isBefore,
  isSameMonth,
  isToday,
  startOfDay,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const DatePickerCom = ({ selectedDate, setSelectedDate }) => {
  const today = startOfDay(new Date());
  const [currentMonth, setCurrentMonth] = useState(today);
  const [isOpen, setIsOpen] = useState(false);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => {
    const previousMonth = subMonths(currentMonth, 1);
    if (!isBefore(startOfMonth(previousMonth), startOfMonth(today))) {
      setCurrentMonth(previousMonth);
    }
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setIsOpen(false);
  };

  const isPastDate = (date) => isBefore(date, today);

  return (
    <div className="relative ">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" flex items-center text-center gap-2.5 border border-gray-300 dark:border-gray-800 px-4 py-2 rounded-md shadow-sm bg-white dark:bg-black text-gray-800 dark:text-white"
      >
        <CalendarIcon className="w-5 h-5" />
        <p className="text-center"> {format(selectedDate, `dd`)}</p>
        <p className="text-center"> {format(selectedDate, `MMM `)}</p>
        <p className="text-center"> {format(selectedDate, `yyyy`)}</p>
      </div>

      {isOpen && (
        <div className="absolute top-10 sm:top-12 -right-20 sm:right-0 z-50 bg-white dark:bg-black p-4 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-80">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              disabled={isBefore(
                startOfMonth(subMonths(currentMonth, 1)),
                startOfMonth(today)
              )}
              className="cursor-pointer p-2 rounded-md bg-gray-100 dark:bg-gray-900 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-900"
            >
              <ChevronRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isDisabled =
                isPastDate(day) || !isSameMonth(day, currentMonth);
              const isSelected =
                format(day, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");
              const dayIsToday = isToday(day);

              return (
                <button
                  key={format(day, "yyyy-MM-dd")}
                  onClick={() => handleDateClick(day)}
                  disabled={isDisabled}
                  className={`
                    w-10 h-10 flex cursor-pointer items-center justify-center rounded-full text-sm
                    ${
                      isSelected
                        ? "bg-indigo-600 dark:bg-indigo-700 text-white font-medium"
                        : dayIsToday
                        ? "bg-gray-200 dark:bg-gray-900 text-indigo-700  dark:text-indigo-300 font-medium"
                        : "text-gray-800 dark:text-gray-200"
                    }
                    ${
                      !isDisabled &&
                      !isSelected &&
                      "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }
                    ${isDisabled && "opacity-40 cursor-not-allowed"}
                    ${
                      !isSameMonth(day, currentMonth) &&
                      "text-gray-400 dark:text-gray-600 "
                    }
                  `}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerCom;

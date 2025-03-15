import React, { useState, useEffect } from "react";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

const TimePickerCom = ({ selectedTime, setSelectedTime }) => {
  const [isOpen, setIsOpen] = useState(false);

  const displayHours = selectedTime.hours % 12 || 12;

  const timeString = `${displayHours}:${String(selectedTime.minutes).padStart(
    2,
    "0"
  )} ${selectedTime.period}`;

  const handleHourChange = (hour) => {
    const newHour =
      hour === 12
        ? selectedTime.period === "PM"
          ? 12
          : 0
        : selectedTime.period === "PM"
        ? hour + 12
        : hour;

    setSelectedTime({ ...selectedTime, hours: newHour });
  };

  const handleMinuteChange = (minute) => {
    setSelectedTime({ ...selectedTime, minutes: minute });
  };

  const handlePeriodChange = (period) => {
    let newHours = selectedTime.hours;
    if (period === "AM" && selectedTime.hours >= 12) {
      newHours -= 12;
    } else if (period === "PM" && selectedTime.hours < 12) {
      newHours += 12;
    }

    setSelectedTime({ ...selectedTime, hours: newHours, period });
  };

  const incrementHour = () => {
    const currentHour = displayHours;
    const nextHour = currentHour === 12 ? 1 : currentHour + 1;
    handleHourChange(nextHour);
  };

  const decrementHour = () => {
    const currentHour = displayHours;
    const prevHour = currentHour === 1 ? 12 : currentHour - 1;
    handleHourChange(prevHour);
  };

  const incrementMinute = () => {
    const nextMinute = (selectedTime.minutes + 1) % 60;
    handleMinuteChange(nextMinute);
  };

  const decrementMinute = () => {
    const prevMinute = (selectedTime.minutes - 1 + 60) % 60;
    handleMinuteChange(prevMinute);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".time-picker-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative time-picker-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-300 dark:border-gray-800 px-4 py-2 rounded-md shadow-sm bg-white dark:bg-black text-gray-800 dark:text-white"
      >
        <Clock className="w-5 h-5" />
        {timeString}
      </button>

      {isOpen && (
        <div className="absolute top-10 sm:top-12 -right-10 sm:left-0  z-50 bg-white dark:bg-black p-4 rounded-lg shadow-lg border border-gray-300 dark:border-gray-800 w-64">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Time
            </span>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="flex flex-col items-center">
              <button
                onClick={incrementHour}
                className="p-2 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                <ChevronUp className="w-5 h-5" />
              </button>

              <div className="text-2xl  font-bold my-2 text-gray-800 dark:text-white">
                {displayHours}
              </div>

              <button
                onClick={decrementHour}
                className="p-2 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              :
            </div>

            <div className="flex flex-col items-center">
              <button
                onClick={incrementMinute}
                className="p-2 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                <ChevronUp className="w-5 h-5" />
              </button>

              <div className="text-2xl font-bold my-2 text-gray-800 dark:text-white">
                {String(selectedTime.minutes).padStart(2, "0")}
              </div>

              <button
                onClick={decrementMinute}
                className="p-2 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col ml-4">
              <button
                onClick={() => handlePeriodChange("AM")}
                className={`px-3 py-2 rounded-md mb-2 cursor-pointer ${
                  selectedTime.period === "AM"
                    ? "bg-indigo-600 dark:bg-indigo-700 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                AM
              </button>

              <button
                onClick={() => handlePeriodChange("PM")}
                className={`px-3 py-2 rounded-md cursor-pointer ${
                  selectedTime.period === "PM"
                    ? "bg-indigo-600 dark:bg-indigo-700 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                PM
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {["00", "15", "30", "45"].map((minute) => (
              <button
                key={minute}
                onClick={() => handleMinuteChange(parseInt(minute))}
                className={`px-2 py-1 cursor-pointer rounded-md text-sm ${
                  selectedTime.minutes === parseInt(minute)
                    ? "bg-indigo-600 dark:bg-indigo-700 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                :{minute}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 px-4 py-2 cursor-pointercursor-pointer bg-indigo-600 dark:bg-indigo-700 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default TimePickerCom;

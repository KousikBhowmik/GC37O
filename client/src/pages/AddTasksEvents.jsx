import React, { useState } from "react";
import DatePickerCom from "../components/DatePickerCom";
import TimePickerCom from "../components/TimePickerCom";
import {
  useEventState,
  useTaskState,
  useTaskPageState,
} from "../store/useStore.js";
import { IoCloseOutline } from "react-icons/io5";

const AddTasksEvents = () => {
  const { taskEdit, setTastEdit } = useTaskState();
  const { eventEdit, setEventEdit } = useEventState();
  const { setAddPageState } = useTaskPageState();

  const [type, setType] = useState("task");
  const [fromDate, setFromDate] = useState(
    Object.keys(taskEdit).length !== 0 ? taskEdit : new Date()
  );
  const [toDate, setToDate] = useState(
    Object.keys(taskEdit).length !== 0 ? taskEdit : new Date()
  );
  const [fromTime, setFromTime] = useState(
    Object.keys(eventEdit).length !== 0
      ? eventEdit
      : {
          hours: new Date().getHours(),
          minutes: 0,
          period: new Date().getHours() >= 12 ? "PM" : "AM",
        }
  );
  const [toTime, setToTime] = useState(
    Object.keys(eventEdit).length !== 0
      ? eventEdit
      : {
          hours: new Date().getHours(),
          minutes: 0,
          period: new Date().getHours() >= 12 ? "PM" : "AM",
        }
  );

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      <div className="w-[90%]  relative  lg:w-[60%] h-[75vh]  xl:h-[70vh]  bg-white dark:bg-[#0a0a0a] rounded-xl flex   justify-center dark:border  dark:border-gray-900 gap-4">
        <IoCloseOutline className="absolute top-4 dark:text-white right-4 text-xl cursor-pointer" onClick={() => setAddPageState(false)} />
        <div className="w-[85%] lg:w-[50%] flex flex-col gap-4  justify-center  ">
          {/* ----------------- Heading ------------------- */}
          <div className="flex items-center justify-center gap-2  ">
            <h1 className="text-3xl  md:text-4xl dark:text-white  my-4  md:my-6 ">
              Add
            </h1>
            <div className="flex gap-2 text-3xl md:text-4xl text-black dark:text-white ">
              <p className="  p-1 rounded-md transition-all duration-300 ease-in-out bg-transparent">
                {type === "task" ? "Task" : "Event"}
              </p>
              <p
                onClick={() => {
                  if (type === "task") {
                    setType("event");
                  } else {
                    setType("task");
                  }
                }}
                className="cursor-pointer  opacity-60 p-1 rounded-md transition-all duration-300 ease-in-out bg-transparent"
              >
                {type !== "task" ? "Task" : "Event"}
              </p>
            </div>
          </div>

          {/* ----------------------- Form ------------------------ */}
          <div className="flex flex-col gap-3   ">
            <div className=" flex flex-col gap-3 sm:gap-0 sm:flex-row justify-around   items-center   ">
              <DatePickerCom
                selectedDate={fromDate}
                setSelectedDate={setFromDate}
              />

              <TimePickerCom
                selectedTime={fromTime}
                setSelectedTime={setFromTime}
              />
            </div>
            {type === "task" && (
              <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-around  items-center  ">
                <DatePickerCom
                  selectedDate={toDate}
                  setSelectedDate={setToDate}
                />

                <TimePickerCom
                  selectedTime={toTime}
                  setSelectedTime={setToTime}
                />
              </div>
            )}
          </div>

          <input
            type="text"
            className="border border-gray-300 shadow-sm w-full dark:border-gray-700  text-sm rounded-sm h-[40px] text-black dark:text-white placeholder-gray-500   dark:placeholder:text-white  px-4 dark:bg-black"
            placeholder={`Enter ${type} heading`}
          />
          <textarea
            className=" dark:border-gray-700 w-full rounded-sm  h-32 text-sm px-3 py-2 dark:text-white dark:placeholder:text-white placeholder-gray-500 border border-gray-300 text-black shadow-sm resize-none dark:bg-black "
            placeholder={`Enter ${type} description`}
          ></textarea>

          <button className=" py-1 rounded-sm border-none bg-black dark:bg-white text-gray-100 dark:text-black font-semibold cursor-pointer ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTasksEvents;

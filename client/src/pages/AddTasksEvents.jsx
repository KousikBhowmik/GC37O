import React, { useState, useEffect } from "react";
import DatePickerCom from "../components/DatePickerCom";
import TimePickerCom from "../components/TimePickerCom";
import {
  useTaskPageState,
  useFormType,
  useTasks,
  useEvents,
} from "../store/useStore.js";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { apiClient } from "../libs/axiosConfig.js";
import { addEventRoute, addTaskRoute } from "../utils/constant.js";
import { toTimeObject } from "../utils/helperFunctions.js";
import LoadingCom from "../components/LoadingCom.jsx";

const AddTasksEvents = () => {
  const { setAddPageState } = useTaskPageState();
  const { formType, setFormType } = useFormType();
  const { setUserTasks } = useTasks();
  const { setUserEvents } = useEvents();
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [fromTime, setFromTime] = useState({
    hours: new Date().getHours(),
    minutes: 0,
    period: new Date().getHours() >= 12 ? "PM" : "AM",
  });
  const [toTime, setToTime] = useState({
    hours: new Date().getHours(),
    minutes: 0,
    period: new Date().getHours() >= 12 ? "PM" : "AM",
  });

  const addTask = async () => {
    if (heading.length < 5 || heading.length > 60) {
      toast.error("Valid heading is reuired");
      toast.info("Heading length min 5 max 60");
      return;
    }
    if (description.length < 10 || description.length > 250) {
      toast.error("Valid description is reuired ");
      toast.info("Description len min 10 max 250");
      return;
    }

    const starTime = toTimeObject(fromDate, fromTime);
    const endTime = toTimeObject(toDate, toTime);

    if (starTime.getTime() >= endTime.getTime()) {
      toast.error("Invalid time selection");
      return;
    }
    setIsLoading((prev) => !prev);

    try {
      const { data } = await apiClient.post(
        addTaskRoute,
        {
          heading: heading,
          description: description,
          startTime: starTime.toISOString(),
          endTime: endTime.toISOString(),
        },
        { withCredentials: true }
      );
      if (data?.success) {
        setUserTasks(data.tasks);
        setHeading("");
        setDescription("");
      } else toast.error("Unable to add task");
    } catch (error) {
      toast.error("Unable to add task");
    }
    setIsLoading((prev) => !prev);
    setAddPageState(false);
  };

  const addEvent = async () => {
    if (heading.length < 5 || heading.length > 60) {
      toast.error("Valid heading is reuired");
      toast.info("Heading length min 5 max 60");
      return;
    }
    if (description.length < 10 || description.length > 250) {
      toast.error("Valid description is reuired ");
      toast.info("Description len min 10 max 250");
      return;
    }

    const starTime = toTimeObject(fromDate, fromTime);
    setIsLoading((prev) => !prev);

    try {
      const { data } = await apiClient.post(
        addEventRoute,
        {
          heading: heading,
          description: description,
          eventTime: starTime.toISOString(),
        },
        { withCredentials: true }
      );
      if (data?.success) {
        setUserEvents(data.events);
        setHeading("");
        setDescription("");
      } else toast.error("Unable to add task");
    } catch (error) {
      toast.error("Unable to add task");
    }

    setIsLoading((prev) => !prev);
    setAddPageState(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex items-center justify-center">
      {isLoading && (
        <div className="w-[90%]  relative  lg:w-[60%] h-[75vh]  xl:h-[70vh]  bg-white dark:bg-[#0a0a0a] rounded-xl flex   justify-center dark:border  dark:border-gray-900 gap-4">
          <LoadingCom />
        </div>
      )}

      {!isLoading && (
        <div className="w-[90%]  relative  lg:w-[60%] h-[75vh]  xl:h-[70vh]  bg-white dark:bg-[#0a0a0a] rounded-xl flex   justify-center dark:border  dark:border-gray-900 gap-4">
          <IoCloseOutline
            className="absolute top-4 dark:text-white right-4 text-xl cursor-pointer"
            onClick={() => setAddPageState(false)}
          />
          <div className="w-[85%] lg:w-[50%] flex flex-col gap-4    ">
            {/* ----------------- Heading ------------------- */}
            <div className="flex items-center justify-center gap-2 mt-2 ">
              <h1 className="text-3xl  md:text-5xl dark:text-white  my-4  md:my-6 ">
                Add
              </h1>
              <div className="flex gap-2 text-3xl md:text-5xl text-black dark:text-white ">
                <p className="  p-1 rounded-md transition-all duration-300 ease-in-out bg-transparent">
                  {formType === "task" ? "Task" : "Event"}
                </p>
                <p
                  onClick={() => {
                    if (formType === "task") {
                      setFormType("event");
                    } else {
                      setFormType("task");
                    }
                  }}
                  className="cursor-pointer  opacity-60 p-1 rounded-md transition-all duration-300 ease-in-out bg-transparent"
                >
                  {formType !== "task" ? "Task" : "Event"}
                </p>
              </div>
            </div>

            {/* ----------------------- Form ------------------------ */}
            <div className="flex flex-col gap-3   ">
              <div className=" flex flex-col gap-3 sm:gap-0 sm:flex-row justify-around   items-center   ">
                <DatePickerCom
                  type={formType}
                  selectedDate={fromDate}
                  setSelectedDate={setFromDate}
                />

                <TimePickerCom
                  selectedTime={fromTime}
                  setSelectedTime={setFromTime}
                />
              </div>
              {formType === "task" && (
                <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-around  items-center  ">
                  <DatePickerCom
                    type={"to"}
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
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              type="text"
              className="border border-gray-300 shadow-sm w-full dark:border-gray-700  text-sm rounded-sm h-[40px] text-black dark:text-white placeholder-gray-500   dark:placeholder:text-white  px-4 dark:bg-black"
              placeholder={`Enter ${formType} heading`}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" dark:border-gray-700 w-full rounded-sm  h-32 text-sm px-3 py-3 dark:text-white dark:placeholder:text-white placeholder-gray-500 border border-gray-300 text-black shadow-sm resize-none dark:bg-black "
              placeholder={`Enter ${formType} description`}
            ></textarea>

            <button
              onClick={() => {
                if (formType === "task") addTask();
                else addEvent();
              }}
              className=" py-1 rounded-sm border-none bg-black dark:bg-white text-gray-100 dark:text-black font-semibold cursor-pointer "
            >
              {formType === "task" ? "Add task" : "Add Event"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTasksEvents;

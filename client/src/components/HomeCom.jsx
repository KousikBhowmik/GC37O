import React, { useState, useEffect } from "react";
import CalendarCom from "./CalendarCom";
import CurrentTime from "./CurrentTime";
import { IoMdAddCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

const HomeCom = () => {
  const [toggleText, setToggleText] = useState("tasks");
  useEffect(() => {
    const interval = setInterval(() => {
      setToggleText(toggleText === "tasks" ? "events" : "tasks");
    }, 3000);
    return () => clearInterval(interval);
  }, [toggleText]);
  return (
    <div className="px-[4vw] grid grid-cols-4 pt-4  w-full">
      <div className="grid grid-rows-5 pr-3">
        <div className="w-full row-span-2 bg-gray-200 dark:bg-[#0a0a0a] h-[100%] flex flex-col border border-white dark:border-gray-700 items-center justify-center gap-2 rounded-md  ">
          <IoMdAddCircleOutline className="text-6xl text-gray-400 cursor-pointer" />
          <div className="grid grid-cols-5">
            <span className="text-2xl col-span-3 font-serif dark:text-gray-200 ">Add a new</span>
            <motion.span
              key={toggleText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-semibold dark:text-gray-50 pl-2 col-span-2"
            >
              {toggleText === "tasks" ? "Task" : "Event"}
            </motion.span>
          </div>
        </div>

        <div>To Do</div>
        <div>In Progress</div>
        <div>Completed</div>
        <div>Pending</div>
      </div>
      <div className="px-3">
        <h1>Tasks</h1>
        <div></div>
      </div>
      <div>Events</div>
      <div>
        <div className="flex  flex-col  gap-2">
          <CurrentTime />
          <CalendarCom />
        </div>
      </div>
    </div>
  );
};

export default HomeCom;

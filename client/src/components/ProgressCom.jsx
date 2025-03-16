import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { ScrollText, Zap, AlarmClockMinus, CircleCheckBig } from "lucide-react";
import { useTaskPageState, useFormType } from "../store/useStore.js";

const ProgressCom = () => {
  const [toggleText, setToggleText] = useState("tasks");
  const { setAddPageState } = useTaskPageState();
  const { setFormType} = useFormType();
  useEffect(() => {
    const interval = setInterval(() => {
      setToggleText(toggleText === "tasks" ? "events" : "tasks");
    }, 3000);
    return () => clearInterval(interval);
  }, [toggleText]);

  return (
    <div className=" w-full h-[500px] items-center grid sm:mb-5 lg:mb-0 grid-rows-5 gap-4 pr-3 ">
      <div className="w-full row-span-2 bg-gray-200 dark:bg-[#0a0a0a] h-[100%] flex flex-col border border-white dark:border-gray-700 items-center justify-center gap-2 rounded-md   ">
        <IoMdAddCircleOutline
          className="text-6xl text-gray-400 cursor-pointer"
          onClick={() => {
            setFormType(toggleText === "tasks" ? "task" : "event");
            setAddPageState(true);
          }}
        />
        <div className="grid grid-cols-5">
          <span className="text-2xl col-span-3 font-serif dark:text-gray-200 ">
            Add a new
          </span>
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

      <div className="bg-gradient-to-br from-[#b875fb] to-[#ce9dfe]  rounded-2xl pl-4 pr-6 py-1 flex  gap-3 shadow-xl ">
        <ScrollText className="text-[#b875fb] size-10  rounded-full bg-white p-2 place-self-center" />
        <div className="w-[70%] flex flex-col justify-between py-3">
          <p className="text-white text-lg font-semibold">Todo</p>
          <div className="w-full  rounded-full h-2"></div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#fe8421] to-[#fba466] rounded-2xl pl-4 pr-6 py-1 flex  gap-3 shadow-xl ">
        <Zap className="text-[#fe8421] size-10  rounded-full bg-white p-2 place-self-center" />
        <div className="w-[70%] flex flex-col justify-between py-3">
          <p className="text-white text-lg font-semibold"> In Progress</p>
          <div className="w-full rounded-full h-2"></div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#33fa93] to-[#39e7ad] rounded-2xl pl-4 pr-6 py-1 flex  gap-3 shadow-xl ">
        <CircleCheckBig className="text-[#33fa93] size-10  rounded-full bg-white p-2 place-self-center" />
        <div className="w-[70%] flex flex-col justify-between py-3">
          <p className="text-white text-lg font-semibold"> Completed</p>
          <div className="w-full  rounded-full h-2"></div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-[#fc4845] to-[#ff7961] rounded-2xl pl-4 pr-6 py-1 flex  gap-3 shadow-xl ">
        <AlarmClockMinus className="text-[#fc4845] size-10  rounded-full bg-white p-2 place-self-center" />

        <div className="w-[70%] flex flex-col justify-between py-3">
          <p className="text-white text-lg font-semibold"> Pending</p>
          <div className="w-ful  rounded-full h-2">
            <div className="w-[70%] bg-white h-2 rounded-full "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCom;

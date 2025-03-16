import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useTasks } from "../store/useStore.js";
import TasksCard from "./TasksCard.jsx";
import { useTaskPageState, useFormType } from "../store/useStore.js";
import { IoMdAddCircleOutline } from "react-icons/io";
const TasksCom = () => {
  const { userTasks, setUserTasks } = useTasks();
  const { setAddPageState } = useTaskPageState();
  const { setFormType} = useFormType();

  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  const deleteHandel = (index) => {
    setUserTasks(userTasks.filter((_, i) => i != index));
  };

  return userTasks.length !== 0 ? (
    <div className="px-[4%]  w-full pt-2 flex flex-col gap-4">
      <h1 className="dark:text-white text-2xl mt-2">All tasks</h1>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4  "
        columnClassName="masonry-column"
      >
        <div className="w-full  bg-gray-200 dark:bg-[#0a0a0a] mb-4 py-6 flex flex-col border border-white dark:border-gray-700 items-center justify-center gap-2 rounded-md   ">
          <IoMdAddCircleOutline
            className="text-6xl text-gray-400 cursor-pointer"
            onClick={() => {
              setFormType("task")
              setAddPageState(true)}}
          />
          <div className="flex items-center justify-center">
            <span className="text-2xl col-span-3 font-serif dark:text-gray-200 ">
              Add a new Task
            </span>
          </div>
        </div>
        {userTasks.map((cardValue, index) => (
          <TasksCard
            key={index}
            cardValue={cardValue}
            id={index}
            deleteHandel={deleteHandel}
          />
        ))}
      </Masonry>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TasksCom;

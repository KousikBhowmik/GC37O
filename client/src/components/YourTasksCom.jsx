import React from "react";
import { LuCat } from "react-icons/lu";
import TaskCardSmall from "./TaskCardSmall.jsx";
import { useTasks } from "../store/useStore.js";
import { useNavigate } from "react-router-dom";

const YourTasksCom = () => {
  const { userTasks, setUserTasks } = useTasks();
  const navigate = useNavigate();
  return userTasks.length === 0 ? (
    <div className=" h-[440px] flex  w-full flex-col items-center justify-center dark:text-white border border-gray-300 dark:border-gray-700 rounded-md p-4  bg-gray-200 dark:bg-[#0a0a0a] gap-5">
      <LuCat className="text-[200px]" />
      <h1 className="text-3xl font-semibold">Add Tasks</h1>
    </div>
  ) : (
    <div className="flex flex-col w-full pb-4  dark:text-white border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 bg-gray-200 dark:bg-[#0a0a0a] gap-2 ">
      <h1 className="py-2 text-xl font-semibold  ">Your tasks</h1>

      {userTasks.slice(0, 5).map((value, _) => (
        <TaskCardSmall key={`${value._id}${value.status}`} cardValue={value} />
      ))}

      {userTasks.length > 5 && (
        <button
          onClick={() => navigate("/dashboard/tasks")}
          className="py-1 rounded-md my-2 cursor-pointer text-white bg-black w-full  dark:bg-blue-500  "
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default YourTasksCom;

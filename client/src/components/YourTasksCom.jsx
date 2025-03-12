import React from "react";
import TaskCardSmall from "./TaskCardSmall.jsx";
import { LuCat } from "react-icons/lu";

const YourTasksCom = () => {
  const tempTasks = [
    {
      heading: "Task 1",
      description: "Description for task 1",
      startTime: "2025-03-10 09:00:00 AM",
      endTime: "2025-03-10 10:00:00 AM",
      status: "todo",
    },
    {
      heading: "Task 2",
      description: "Description for task 2",
      startTime: "2025-03-10 10:15:00 AM",
      endTime: "2025-03-10 11:00:00 AM",
      status: "progress",
    },
    {
      heading: "Task 3",
      description: "Description for task 3",
      startTime: "2025-03-10 11:30:00 AM",
      endTime: "2025-03-10 12:15:00 PM",
      status: "pending",
    },
    {
      heading: "Task 4",
      description: "Description for task 4",
      startTime: "2025-03-10 01:00:00 PM",
      endTime: "2025-03-10 02:00:00 PM",
      status: "completed",
    },
    {
      heading: "Task 5",
      description: "Description for task 5",
      startTime: "2025-03-10 02:30:00 PM",
      endTime: "2025-03-10 03:30:00 PM",
      status: "todo",
    },
    {
      heading: "Task 6",
      description: "Description for task 6",
      startTime: "2025-03-10 04:00:00 PM",
      endTime: "2025-03-10 05:00:00 PM",
      status: "progress",
    },
    {
      heading: "Task 7",
      description: "Description for task 7",
      startTime: "2025-03-11 09:00:00 AM",
      endTime: "2025-03-11 10:00:00 AM",
      status: "pending",
    },
    {
      heading: "Task 8",
      description: "Description for task 8",
      startTime: "2025-03-11 10:30:00 AM",
      endTime: "2025-03-11 11:30:00 AM",
      status: "completed",
    },
    {
      heading: "Task 9",
      description: "Description for task 9",
      startTime: "2025-03-11 12:00:00 PM",
      endTime: "2025-03-11 01:00:00 PM",
      status: "todo",
    },
    {
      heading: "Task 10",
      description: "Description for task 10",
      startTime: "2025-03-11 02:00:00 PM",
      endTime: "2025-03-11 03:00:00 PM",
      status: "progress",
    },
    {
      heading: "Task 11",
      description: "Description for task 11",
      startTime: "2025-03-11 04:00:00 PM",
      endTime: "2025-03-11 05:00:00 PM",
      status: "pending",
    },
    {
      heading: "Task 12",
      description: "Description for task 12",
      startTime: "2025-03-11 06:00:00 PM",
      endTime: "2025-03-11 07:00:00 PM",
      status: "completed",
    },
  ];
  return tempTasks.length === 0 ? (
    <div className=" h-[440px] flex  w-full flex-col items-center justify-center dark:text-white border border-gray-300 dark:border-gray-700 rounded-md p-4  bg-gray-200 dark:bg-[#0a0a0a] gap-5">
      <LuCat className="text-[200px]" />
      <h1 className="text-3xl font-semibold">Add Tasks</h1>
    </div>
  ) : (
    <div className="flex flex-col w-full dark:text-white border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 bg-gray-200 dark:bg-[#0a0a0a] gap-2 ">
      <h1 className="py-2 text-xl font-semibold  ">Your tasks</h1>

      {tempTasks.slice(0, 5).map((value, index) => (
        <TaskCardSmall key={index} cardValue={value} />
      ))}

      {tempTasks.length > 5 && (
        <button className="py-1 rounded-md my-2 cursor-pointer text-white bg-black w-full  dark:bg-blue-500  ">
          Show more
        </button>
      )}
    </div>
  );
};

export default YourTasksCom;

import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useTasks } from "../store/useStore.js";
import TasksCard from "./TasksCard.jsx";

const TasksCom = () => {
  const { userTasks, setUserTasks } = useTasks();

  const tempTasks = [
    {
      heading: "Finish the assignment before the deadline.",
      description:
        "Complete the website's frontend design, ensuring responsiveness across all devices, optimize performance, and test functionality before finalizing deployment next week..",
      startTime: new Date(2025, 2, 10, 9, 0),
      endTime: new Date(2025, 2, 10, 10, 0),
      status: "todo",
    },
    {
      heading: "Task 2",
      description: "Description for task 2",
      startTime: new Date(2025, 2, 10, 10, 15),
      endTime: new Date(2025, 2, 10, 11, 0),
      status: "progress",
    },
    {
      heading: "Task 3",
      description: "Description for task 3",
      startTime: new Date(2025, 2, 10, 11, 30),
      endTime: new Date(2025, 2, 10, 12, 15),
      status: "pending",
    },
    {
      heading: "Task 4",
      description: "Description for task 4",
      startTime: new Date(2025, 2, 10, 13, 0),
      endTime: new Date(2025, 2, 10, 14, 0),
      status: "completed",
    },
    {
      heading: "Task 5",
      description: "Description for task 5",
      startTime: new Date(2025, 2, 10, 14, 30),
      endTime: new Date(2025, 2, 10, 15, 30),
      status: "todo",
    },
    {
      heading: "Task 6",
      description: "Description for task 6",
      startTime: new Date(2025, 2, 10, 16, 0),
      endTime: new Date(2025, 2, 10, 17, 0),
      status: "progress",
    },
    {
      heading: "Task 7",
      description: "Description for task 7",
      startTime: new Date(2025, 2, 11, 9, 0),
      endTime: new Date(2025, 2, 11, 10, 0),
      status: "pending",
    },
    {
      heading: "Task 8",
      description: "Description for task 8",
      startTime: new Date(2025, 2, 11, 10, 30),
      endTime: new Date(2025, 2, 11, 11, 30),
      status: "completed",
    },
    {
      heading: "Task 9",
      description: "Description for task 9",
      startTime: new Date(2025, 2, 11, 12, 0),
      endTime: new Date(2025, 2, 11, 13, 0),
      status: "todo",
    },
    {
      heading: "Task 10",
      description: "Description for task 10",
      startTime: new Date(2025, 2, 11, 14, 0),
      endTime: new Date(2025, 2, 11, 15, 0),
      status: "progress",
    },
    {
      heading: "Task 11",
      description: "Description for task 11",
      startTime: new Date(2025, 2, 11, 16, 0),
      endTime: new Date(2025, 2, 11, 17, 0),
      status: "pending",
    },
    {
      heading: "Task 12",
      description: "Description for task 12",
      startTime: new Date(2025, 2, 11, 18, 0),
      endTime: new Date(2025, 2, 11, 19, 0),
      status: "completed",
    },
  ];

  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  useEffect(() => {
    setUserTasks(tempTasks);
  }, []);

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

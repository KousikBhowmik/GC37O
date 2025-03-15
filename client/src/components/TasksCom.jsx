import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useTasks } from "../store/useStore.js";
import TasksCard from "./TasksCard.jsx";

const TasksCom = () => {
  const { userTasks, setUserTasks } = useTasks();

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

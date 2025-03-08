import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import AllCom from "../components/AllCom.jsx";
import TasksCom from "../components/TasksCom.jsx";
import EventsCom from "../components/EventsCom.jsx";

const Dashboard = () => {
  const [activeState, setActiveState] = useState("all");

  return (
    <div className="w-full h-screen dark:bg-black  ">
      <Navbar activeState={activeState} setActiveState={setActiveState} />

      {activeState === "all" ? (
        <AllCom />
      ) : activeState === "tasks" ? (
        <TasksCom />
      ) : (
        <EventsCom />
      )}
    </div>
  );
};

export default Dashboard;

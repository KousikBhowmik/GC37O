import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import EventsCom from "../components/EventsCom.jsx";
import TasksCom from "../components/TasksCom.jsx";
import HomeCom from "../components/HomeCom.jsx";
const Dashboard = () => {
  const [activeState, setActiveState] = useState("home");

  return (
    <div className="w-full h-screen dark:bg-black  ">
      <Navbar activeState={activeState} setActiveState={setActiveState} />

      {activeState === "home" ? (
        <HomeCom />
      ) : activeState === "tasks" ? (
        <TasksCom />
      ) : (
        <EventsCom />
      )}
    </div>
  );
};

export default Dashboard;

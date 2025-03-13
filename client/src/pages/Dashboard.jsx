import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const [activeState, setActiveState] = useState("home");

  return (
    <div className="w-full min-h-screen dark:bg-black    ">
      <Navbar activeState={activeState} setActiveState={setActiveState} />

      <Outlet />



    </div>
  );
};

export default Dashboard;

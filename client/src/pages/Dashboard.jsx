import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useTaskPageState } from "../store/useStore.js";
import AddTasksEvents from "./AddTasksEvents.jsx";
const Dashboard = () => {
  const { addPageState } = useTaskPageState();

  return (
    <div className="w-full min-h-screen dark:bg-black ">
      {addPageState && <AddTasksEvents />}
      
      <Navbar />

      <Outlet />
    </div>
  );
};

export default Dashboard;

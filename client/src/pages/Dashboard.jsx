import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useTaskPageState } from "../store/useStore.js";
import AddTasksEvents from "./AddTasksEvents.jsx";
import { useAccountSettingsPage } from "../store/useStore.js";
import AccountSettings from "./AccountSettings.jsx";
const Dashboard = () => {
  const { addPageState } = useTaskPageState();
const { isAccountSettingsPage } =
  useAccountSettingsPage();
  return (
    <div className="w-full min-h-screen dark:bg-black ">
      {addPageState && <AddTasksEvents />}
      {isAccountSettingsPage && <AccountSettings/>}
      
      <Navbar />

      <Outlet />
    </div>
  );
};

export default Dashboard;

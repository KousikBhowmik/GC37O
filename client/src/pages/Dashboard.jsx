import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
const Dashboard = () => {

  return (
    <div className="w-full min-h-screen dark:bg-black    ">
      <Navbar  />

      <Outlet />



    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useTaskPageState } from "../store/useStore.js";
import AddTasksEvents from "./AddTasksEvents.jsx";
import {
  useAccountSettingsPage,
  useTasks,
  useEvents,
} from "../store/useStore.js";
import AccountSettings from "./AccountSettings.jsx";
import { toast } from "react-toastify";
import { apiClient } from "../libs/axiosConfig.js";
import { getEventsRoute, getTasksRoute } from "../utils/constant.js";
const Dashboard = () => {
  const { addPageState } = useTaskPageState();
  const { isAccountSettingsPage } = useAccountSettingsPage();

  const { userTasks, setUserTasks } = useTasks();
  const { userEvents, setUserEvents } = useEvents();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await apiClient.get(getTasksRoute, {
          withCredentials: true,
        });

        if (data?.success) {
          setUserTasks(data?.tasks);
          console.log(data);
        } else {
          toast.error("Error fetching user data!");
        }
      } catch (error) {
        toast.error("Error fetching user data!");
        setUserTasks([]);
        console.error("Error:", error);
      }
    };
    getTasks();
  }, []);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await apiClient.get(getEventsRoute, {
          withCredentials: true,
        });

        if (data?.success) {
          setUserEvents(data?.events);
          console.log(data);
        } else {
          toast.error("Error fetching user data!");
        }
      } catch (error) {
        toast.error("Error fetching user data!");
        setUserEvents([]);
        console.error("Error:", error);
      }
    };
    getEvents();
  }, []);
  return (
    <div className="w-full min-h-screen dark:bg-black ">
      {addPageState && <AddTasksEvents />}
      {isAccountSettingsPage && <AccountSettings />}

      <Navbar />

      <Outlet />
    </div>
  );
};

export default Dashboard;

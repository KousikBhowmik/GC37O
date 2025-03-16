import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { useTaskPageState } from "../store/useStore.js";
import AddTasksEvents from "./AddTasksEvents.jsx";
import {
  useAccountSettingsPage,
  useTasks,
  useEvents,
  useFeedbackPage,
} from "../store/useStore.js";
import AccountSettings from "./AccountSettings.jsx";
import { toast } from "react-toastify";
import { apiClient } from "../libs/axiosConfig.js";
import { getEventsRoute, getTasksRoute } from "../utils/constant.js";
import Feedback from "./Feedback.jsx";
const Dashboard = () => {
  const { addPageState } = useTaskPageState();
  const { isAccountSettingsPage } = useAccountSettingsPage();
  const { setUserTasks } = useTasks();
  const { setUserEvents } = useEvents();
  const { feedbackPageState } = useFeedbackPage();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await apiClient.get(getTasksRoute, {
          withCredentials: true,
        });

        if (data?.success) {
          setUserTasks(data?.tasks);
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
        } else {
          toast.error("Error fetching user data!");
        }
      } catch (error) {
        toast.error("Error fetching user data!");
        setUserEvents([]);
        console.error("Error:", error.message);
      }
    };
    getEvents();
  }, []);
  return (
    <div className="w-full min-h-screen dark:bg-black ">
      {addPageState && <AddTasksEvents />}
      {isAccountSettingsPage && <AccountSettings />}
      { feedbackPageState && <Feedback/>}

      <Navbar />

      <Outlet />
    </div>
  );
};

export default Dashboard;

import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginValid from "./components/LoginValid.jsx";
import { useDarkMode } from "./store/useStore.js";
import Login from "./pages/Login.jsx";
import HomeCom from "./components/HomeCom.jsx";
import TasksCom from "./components/TasksCom.jsx";
import EventsCom from "./components/EventsCom.jsx";
import Page404 from "./pages/Page404.jsx";
const App = () => {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="relative">
      {/* ------------------------ Notification container ---------------------- */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        limit={3}
        pauseOnHover
        theme={isDarkMode ? "light" : "dark"}
      />
      {/* ------------------------ Main Page Routes ---------------------- */}
      <div className="w-full h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/home" />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              <LoginValid>
                <Dashboard />
              </LoginValid>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeCom />} />
            <Route path="tasks" element={<TasksCom />} />
            <Route path="events" element={<EventsCom />} />
            <Route path="*" element={<Page404 />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

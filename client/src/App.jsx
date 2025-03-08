import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import UserInfo from "./pages/UserInfo.jsx";
import LoginValid from "./components/LoginValid.jsx";
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="relative">
      <button
        onClick={toggleDarkMode}
        className="p-2 cursor-pointer bg-yellow-300  rounded-full absolute top-3 right-3"
      >
        mode
      </button>
      {/* ------------------------ Notification container ---------------------- */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
          <Route
            path="/"
            element={
              <LoginValid>
                <Dashboard />
              </LoginValid>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

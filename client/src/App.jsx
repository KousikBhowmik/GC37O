import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import LoginValid from "./components/LoginValid.jsx";
import { useDarkMode } from "./store/useStore.js";
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
              <Dashboard />
              // <LoginValid>
              // </LoginValid>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

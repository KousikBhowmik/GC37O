import React from 'react'

const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
};

// Set theme on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
});

const App = () => {
  return (
    <div className="bg-background text-text" onClick={toggleDarkMode}>
      App
    </div>
  );
}

export default App;
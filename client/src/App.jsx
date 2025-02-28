import React from "react";
import { ToastContainer } from "react-toastify";
const App = () => {

  return (
    <div>
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
      />
      App
    </div>
  );
};

export default App;

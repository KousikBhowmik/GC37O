import React from "react";
import TimeAndCalendarCom from "./TimeAndCalendarCom.jsx";
import ProgressCom from "./ProgressCom.jsx";
import YourTasksCom from "./YourTasksCom.jsx";
import YourEventsCom from "./YourEventsCom.jsx";

const HomeCom = () => {
  return (
    <div className="px-[4vw] grid grid-cols-4 pt-4  w-full">
      {/* ------------------------- Progress and Add taks/event com --------------------------- */}
      <div className="relative">
        <ProgressCom />
      </div>
      {/* ------------------------------- Tasks Componet ------------------------------ */}
      <div className="px-3">
        <YourTasksCom/>
      </div>
      {/* ------------------------------- Events Component ---------------------------- */}
      <div className="px-3">
        <YourEventsCom/>
      </div>
      {/* ---------------------------- Time & CAlender Component ---------------------- */}
      <div className="relative">
        <div className="absolute left-0 top-0 w-full">
          <TimeAndCalendarCom />
        </div>
      </div>
    </div>
  );
};

export default HomeCom;

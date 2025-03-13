import React from "react";
import TimeAndCalendarCom from "./TimeAndCalendarCom.jsx";
import ProgressCom from "./ProgressCom.jsx";
import YourTasksCom from "./YourTasksCom.jsx";
import YourEventsCom from "./YourEventsCom.jsx";

const HomeCom = () => {
  return (
    <div className="px-[4vw] pb-4 grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4 gap-5 md:gap-0  w-full">
      {/* ------------------------- Progress and Add taks/event com --------------------------- */}

      <ProgressCom />

      {/* ------------------------------- Tasks Componet ------------------------------ */}
      <div className=" px-3">
        <YourTasksCom />
      </div>
      {/* ------------------------------- Events Component ---------------------------- */}
      <div className="px-3">
        <YourEventsCom />
      </div>
      {/* ---------------------------- Time & CAlender Component ---------------------- */}
      <div className="relative hidden xl:flex ">
        <div className="absolute left-0 top-0 w-full">
          <TimeAndCalendarCom />
        </div>
      </div>
    </div>
  );
};

export default HomeCom;

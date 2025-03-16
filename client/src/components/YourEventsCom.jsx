import React from "react";
import EventCardSmall from "./EventCardSmall.jsx";
import { PiDogLight } from "react-icons/pi";
import { useEvents } from "../store/useStore.js";

import { useNavigate } from "react-router-dom";

const YourEventsCom = () => {
  const { userEvents, setUserEvents } = useEvents();
  const navigate = useNavigate();

  return userEvents.length === 0 ? (
    <div className=" h-[440px] flex  w-full flex-col items-center justify-center dark:text-white border border-gray-300 dark:border-gray-700 rounded-md p-4  bg-gray-200 dark:bg-[#0a0a0a] gap-5">
      <PiDogLight className="text-[200px]" />
      <h1 className="text-3xl font-semibold">Add Events</h1>
    </div>
  ) : (
    <div className="flex flex-col w-full pb-4 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 bg-gray-200 dark:bg-[#0a0a0a] gap-2 ">
      <h1 className="py-2 text-xl font-semibold  ">Upcoming events</h1>

      {userEvents.slice(0, 5).map((value, index) => (
        <EventCardSmall key={value._id} cardValue={value} />
      ))}

      {userEvents.length > 5 && (
        <button
          onClick={() => navigate("/dashboard/events")}
          className="py-1 rounded-md my-2 cursor-pointer text-white bg-black w-full  dark:bg-blue-500  "
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default YourEventsCom;

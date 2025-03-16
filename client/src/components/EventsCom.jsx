import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useEvents } from "../store/useStore";
import EventsCard from "./EventsCard";
import { useTaskPageState, useFormType } from "../store/useStore.js";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiDogLight } from "react-icons/pi";

const EventsCom = () => {
  const { userEvents, setUserEvents } = useEvents();
  const { setAddPageState } = useTaskPageState();
  const { setFormType } = useFormType();

  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  return userEvents.length !== 0 ? (
    <div className="px-[4%]  w-full pt-2 flex flex-col gap-4">
      <h1 className="dark:text-white text-2xl mt-2">All events</h1>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4  "
        columnClassName="masonry-column"
      >
        <div className="w-full  bg-gray-200 dark:bg-[#0a0a0a] mb-4 py-6 flex flex-col border border-white dark:border-gray-700 items-center justify-center gap-2 rounded-md   ">
          <IoMdAddCircleOutline
            className="text-6xl text-gray-400 cursor-pointer"
            onClick={() => {
              setFormType("event");
              setAddPageState(true);
            }}
          />
          <div className="flex items-center justify-center">
            <span className="text-2xl col-span-3 font-serif dark:text-gray-200 ">
              Add a new Event
            </span>
          </div>
        </div>
        {userEvents.map((cardValue, _) => (
          <EventsCard key={cardValue._id} cardValue={cardValue} />
        ))}
      </Masonry>
    </div>
  ) : (
    <div className="w-full  flex items-center justify-center h-[60vh]">
      <div className=" px-10  bg-none mb-4 py-6 flex flex-col border-white  items-center justify-center gap-2 rounded-md   ">
        <PiDogLight className="text-[200px] dark:text-white" />
        <div
          onClick={() => {
            setFormType("event");
            setAddPageState(true);
          }}
          className="flex items-center cursor-pointer justify-center border dark:border-gray-700 dark:bg-[#0a0a0a] rounded-sm"
        >
          <span className="text-xl py-2 px-6   col-span-3 font-serif dark:text-gray-200 ">
            Add a new Event
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventsCom;

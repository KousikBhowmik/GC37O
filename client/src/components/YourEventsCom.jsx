import React from "react";
import EventCardSmall from "./EventCardSmall.jsx";
import { PiDogLight } from "react-icons/pi";

const YourEventsCom = () => {
  const tempEvent = [
    {
      heading: "Task 1",
      description: "Description for task 1",
      eventTime: new Date(2025, 2, 12, 10, 0), // 10:00 AM
      yearly: true,
    },
    {
      heading: "Task 2",
      description: "Description for task 2",
      eventTime: new Date(2025, 2, 12, 11, 30), // 11:30 AM
      yearly: false,
    },
    {
      heading: "Task 3",
      description: "Description for task 3",
      eventTime: new Date(2025, 2, 12, 14, 15), // 02:15 PM
      yearly: true,
    },
    {
      heading: "Task 4",
      description: "Description for task 4",
      eventTime: new Date(2025, 2, 12, 16, 0), // 04:00 PM
      yearly: false,
    },
    {
      heading: "Task 5",
      description: "Description for task 5",
      eventTime: new Date(2025, 2, 12, 18, 30), // 06:30 PM
      yearly: true,
    },
    {
      heading: "Task 6",
      description: "Description for task 6",
      eventTime: new Date(2025, 2, 12, 8, 0), // 08:00 AM
      yearly: false,
    },
    {
      heading: "Task 7",
      description: "Description for task 7",
      eventTime: new Date(2025, 2, 12, 9, 45), // 09:45 AM
      yearly: true,
    },
    {
      heading: "Task 8",
      description: "Description for task 8",
      eventTime: new Date(2025, 2, 12, 12, 0), // 12:00 PM
      yearly: false,
    },
    {
      heading: "Task 9",
      description: "Description for task 9",
      eventTime: new Date(2025, 2, 12, 13, 30), // 01:30 PM
      yearly: true,
    },
    {
      heading: "Task 10",
      description: "Description for task 10",
      eventTime: new Date(2025, 2, 12, 15, 45), // 03:45 PM
      yearly: false,
    },
    {
      heading: "Task 11",
      description: "Description for task 11",
      eventTime: new Date(2025, 2, 12, 17, 15), // 05:15 PM
      yearly: true,
    },
    {
      heading: "Task 12",
      description: "Description for task 12",
      eventTime: new Date(2025, 2, 12, 19, 0), // 07:00 PM
      yearly: false,
    },
  ];
  return tempEvent.length === 0 ? (
    <div className=" h-[440px] flex  w-full flex-col items-center justify-center dark:text-white border border-gray-300 dark:border-gray-700 rounded-md p-4  bg-gray-200 dark:bg-[#0a0a0a] gap-5">
      <PiDogLight className="text-[200px]" />
      <h1 className="text-3xl font-semibold">Add Events</h1>
    </div>
  ) : (
    <div className="flex flex-col w-full dark:text-white border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 bg-gray-200 dark:bg-[#0a0a0a] gap-2 ">
      <h1 className="py-2 text-xl font-semibold  ">Upcoming events</h1>

      {tempEvent.slice(0, 5).map((value, index) => (
        <EventCardSmall key={index} cardValue={value} />
      ))}

      {tempEvent.length > 5 && (
        <button className="py-1 rounded-md my-2 cursor-pointer text-white bg-black w-full  dark:bg-blue-500  ">
          Show more
        </button>
      )}
    </div>
  );
};

export default YourEventsCom;

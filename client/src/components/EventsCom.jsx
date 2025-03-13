import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useEvents } from "../store/useStore";
import EventsCard from "./EventsCard";

const EventsCom = () => {
  const { userEvents, setUserEvents } = useEvents();
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

    const breakpointColumns = {
      default: 4,
      1100: 3,
      768: 2,
      500: 1,
    };

      useEffect(() => {
        setUserEvents(tempEvent);
      }, []);

  return userEvents.length !== 0 ? (
    <div className="px-[4%]  w-full pt-2 flex flex-col gap-4">
      <h1 className="dark:text-white text-2xl mt-2">All events</h1>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4  "
        columnClassName="masonry-column"
      >
        {userEvents.map((cardValue, index) => (
          <EventsCard key={index} cardValue={cardValue} />
        ))}
      </Masonry>
    </div>
  ) : (
    <p>Loading...</p>
  );;
};

export default EventsCom;

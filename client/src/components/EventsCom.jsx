import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useEvents } from "../store/useStore";
import EventsCard from "./EventsCard";

const EventsCom = () => {
  const { userEvents, setUserEvents } = useEvents();
  
  const breakpointColumns = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  const deleteHandel = (index) => {
    setUserEvents(userEvents.filter((_, i) => i != index));
  };

  return userEvents.length !== 0 ? (
    <div className="px-[4%]  w-full pt-2 flex flex-col gap-4">
      <h1 className="dark:text-white text-2xl mt-2">All events</h1>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4  "
        columnClassName="masonry-column"
      >
        {userEvents.map((cardValue, index) => (
          <EventsCard
            key={index}
            cardValue={cardValue}
            id={index}
            deleteHandel={deleteHandel}
          />
        ))}
      </Masonry>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EventsCom;

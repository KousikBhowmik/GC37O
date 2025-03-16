// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  format,
} from "date-fns";
import { apiClient } from "../libs/axiosConfig.js";
import { useEvents } from "../store/useStore.js";
import { toast } from "react-toastify";
import LoadingCom from "./LoadingCom.jsx";
import { deleteEventRoute } from "../utils/constant.js";

const EventsCard = ({ cardValue}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [cardData, setCardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { userEvents, setUserEvents } = useEvents();

  useEffect(() => {
    const destructureTime = (date) => ({
      year: getYear(date).toString().slice(2),
      month: (getMonth(date) + 1).toString().padStart(2, "0"),
      day: getDate(date).toString().padStart(2, "0"),
      hour: getHours(date).toString().padStart(2, "0"),
      minute: getMinutes(date).toString().padStart(2, "0"),
      amPm: format(date, "a"),
      week: format(date, "EEEE").slice(0, 3),
    });

    const getTimeLeft = (eventTime, now = new Date()) => {
      // @ts-ignore
      const diff = new Date(eventTime).getTime() - now.getTime();

      if (diff <= 0) return "Event has Ended"; // If event time has passed

      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days} day${days > 1 ? "s left" : " left"}`;
      if (hours > 0) return `${hours} hour${hours > 1 ? "s left" : " left"}`;
      return `${minutes} min left`;
    };

    const eventTime = destructureTime(cardValue.eventTime);
    const timeLeft = getTimeLeft(cardValue.eventTime);

    setCardData((prev) => ({
      ...prev,
      heading: cardValue.heading,
      description: cardValue.description,
      status: cardValue.status,
      eventDate: `${eventTime.day}/${eventTime.month}/${eventTime.year}`,
      eventTime: `${eventTime.week}, ${
        Number(eventTime.hour) > 12
          ? Number(eventTime.hour) - 12
          : eventTime.hour
      }:${eventTime.minute} ${eventTime.amPm}`,
      timeLeft: timeLeft,
    }));
  }, [cardValue.eventTime]);

  const deleteEvent = async () => {
    setIsLoading((prev) => !prev);

    try {
      const { data } = await apiClient.delete(
        `${deleteEventRoute}/${cardValue._id}`,
        { withCredentials: true }
      );

      if (data?.success) {
        setUserEvents(userEvents.filter((item) => item._id !== cardValue._id));
      }
    } catch (error) {
      toast.error("Fieled to delete event");
    }
    setShowDelete(false);
    setIsLoading((prev) => !prev);
  };


  return (
    <div className="border border-gray-300 dark:border-gray-700 bg-gray-100 px-4 py-3 rounded-md flex flex-col gap-2 dark:bg-[#0a0a0a] mb-4">
      {showDelete && (
        <div className="fixed left-0 top-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex items-center justify-center  ">
          {showDelete && isLoading ? (
            <div className="bg-white dark:bg-[#0a0a0a]  dark:border-gray-700  w-70 md:w-100 h-40 md:h-50 rounded-xl flex items-center justify-center">
              <LoadingCom />
            </div>
          ) : (
            <div className="flex flex-col p-6 gap-6  rounded-md justify-center items-center bg-white mx-2 sm:mx-0">
              <p className="text-[16px] md:text-lg mt-2 ">
                Are you sure you want to{" "}
                <span className="font-semibold text-red-400">Delete</span>?
              </p>
              <div className="flex gap-6">
                <button
                  onClick={() => setShowDelete(false)}
                  className="py-1 px-4 border border-black hover:bg-gray-100  rounded-sm cursor-pointer"
                >
                  No
                </button>
                <button
                  onClick={deleteEvent}
                  className="py-1 px-4 border border-red-500 hover:bg-gray-100 rounded-sm  text-red-500 cursor-pointer"
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <p className="   font-semibold dark:text-white">{cardData.heading}</p>

      <p className="text-sm text-slate-600 dark:text-slate-400 max-h-[1000px] overflow-auto">
        {cardData.description}
      </p>
      <div className="flex items-center justify-between text-sm ">
        <p className="text-gray-500"> {cardData.eventDate}</p>
        <p className="text-gray-500">{cardData.eventTime}</p>
      </div>
      <div className="flex items-center justify-between gap-4 ">
        <p className="text-sm text-purple-500">{cardData.timeLeft}</p>
        <div className="flex items-center gap-3">
          {/* <p className="px-2 cursor-pointer text-sm bg-gray-100 rounded-sm border border-gray-300 hover:bg-gray-300">
            Edit
          </p> */}
          <p
            onClick={() => setShowDelete(true)}
            className="px-2 cursor-pointer text-sm text-red-400 rounded-sm hover:text-red-500 border "
          >
            Delete
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventsCard;

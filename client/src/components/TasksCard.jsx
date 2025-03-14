// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  format,
  set,
} from "date-fns";

const TasksCard = ({ cardValue, id, deleteHandel }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [cardData, setCardData] = useState({});

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

    const start = destructureTime(cardValue.startTime);
    const end = destructureTime(cardValue.endTime);

    setCardData((prev) => ({
      ...prev,
      heading: cardValue.heading,
      description: cardValue.description,
      status: cardValue.status,
      startDate: `${start.year}/${start.month}/${start.day}`,
      startTime: `${start.week}, ${start.hour}:${start.minute} ${start.amPm}`,
      endDate: `${end.year}/${end.month}/${end.day}`,
      endTime: `${end.week}, ${end.hour}:${end.minute} ${end.amPm}`,
    }));
  }, [cardValue.startTime, cardValue.endTime]);

  return (
    <div className="border border-gray-300 dark:border-gray-700 bg-gray-100 px-4 py-3 rounded-md flex flex-col gap-2 dark:bg-[#0a0a0a] mb-4">
      {showDelete && (
        <div className="fixed left-0 top-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 flex items-center justify-center  ">
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
                onClick={() => {
                  deleteHandel(id);
                  setShowDelete(false);
                }}
                className="py-1 px-4 border border-red-500 hover:bg-gray-100 rounded-sm  text-red-500 cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="   font-semibold dark:text-white">{cardData.heading}</p>

      <p className="text-sm text-slate-600 dark:text-slate-400 max-h-[1000px] overflow-auto">
        {cardData.description}
      </p>
      <div className="flex items-center justify-between text-sm ">
        <div className="flex flex-col">
          <p className="font-semibold text-green-500 ">From</p>
          <p className="text-gray-500"> {cardData.startDate}</p>
          <p className="text-gray-500">{cardData.startTime}</p>
        </div>
        <div className="flex flex-col items-end ">
          <p className="font-semibold text-red-500">To</p>
          <p className="text-gray-500"> {cardData.endDate}</p>
          <p className="text-gray-500">{cardData.endTime}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 ">
        <p
          className={`${
            cardData.status === "todo"
              ? "bg-purple-500"
              : cardData.status === "progress"
              ? "bg-orange-500"
              : cardData.status === "completed"
              ? "bg-green-500"
              : "bg-red-500"
          }  text-white text-sm  px-2 rounded-sm `}
        >
          {cardData.status === "todo"
            ? "Todo"
            : cardData.status === "progress"
            ? "Progress"
            : cardData.status == "completed"
            ? "Completed"
            : "Pending"}
        </p>
        <div className="flex items-center gap-3">
          <p className="px-2 cursor-pointer text-sm bg-gray-100 rounded-sm border border-gray-300 hover:bg-gray-300">
            Edit
          </p>
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

export default TasksCard;

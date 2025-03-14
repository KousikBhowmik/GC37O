import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  format,
} from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";

const TaskCardSmall = ({ cardValue }) => {
  const [cardData, setCardData] = useState(cardValue);
  const [showEidt, setShowEdit] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const tempTime = {
      year: getYear(cardData.endTime).toString().slice(2),
      month: (getMonth(cardData.endTime) + 1).toString().padStart(2, "0"),
      date: getDate(cardData.endTime).toString().padStart(2, "0"),
      hour: getHours(cardData.endTime).toString().padStart(2, "0"),
      minute: getMinutes(cardData.endTime).toString().padStart(2, "0"),
      amPm: format(cardData.endTime, "a"),
      week: format(cardData.endTime, "EEEE").slice(0, 3),
    };
    const date = `${tempTime.year}/${tempTime.month}/${tempTime.date}`;
    const time = `${tempTime.week}, ${tempTime.hour}:${tempTime.minute} ${tempTime.amPm}`;
    setCardData({ ...cardData, date: date, time: time });
  }, [cardValue]);

  return (
    <div onMouseLeave={() => setShowEdit(false)} className=" flex flex-col w-full bg-white cursor-pointer p-2  rounded-md  transition duration-200 hover:scale-105 ">
      <div className="flex items-center justify-between">
        <p className="text-black">{cardData.heading}</p>
        <div className="relative">
          {!showEidt ? (
            <BsThreeDotsVertical
              onClick={() => {
                setShowEdit((prev) => !prev);
              }}
              className=" text-gray-400 hover:text-black "
            />
          ) : (
            <IoClose
              onClick={() => {
                setShowEdit((prev) => !prev);
              }}
              className=" text-gray-400 hover:text-black "
            />
          )}
          {showEidt && (
            <div className="absolute top-0 right-4 w-[100px] z-10 rounded-md  flex flex-col justify-between bg-white border border-gray-300 p-2">
              <p className=" text-gray-500 pl-1 text-sm   hover:text-black">
                Edit task
              </p>
              <p className=" text-red-400 pl-1 text-sm   hover:text-red-500">
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between  items-center ">
        <p className="text-sm text-gray-500">{cardData.date}</p>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray-500 pr-1">{cardData.time}</p>
          <div className="relative">
            <p
              onMouseEnter={() => setShowStatus(true)}
              onMouseLeave={() => setShowStatus(false)}
              className={`${
                cardData.status === "todo"
                  ? "bg-purple-500"
                  : cardData.status === "progress"
                  ? "bg-orange-400"
                  : cardData.status == "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              } size-2 rounded-full mr-1 `}
            ></p>
            {showStatus && (
              <p
                className={`${
                  cardData.status === "todo"
                    ? "bg-purple-500"
                    : cardData.status === "progress"
                    ? "bg-orange-500"
                    : cardData.status === "completed"
                    ? "bg-green-500"
                    : "bg-red-500"
                }  pl-1 text-sm  text-white dark:text-black px-2 py-[1px] rounded-sm  absolute left-3 -bottom-2 `}
              >
                {cardData.status === "todo"
                  ? "Todo"
                  : cardData.status === "progress"
                  ? "Progress"
                  : cardData.status == "completed"
                  ? "completed"
                  : "Pending"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardSmall;

import React, { useEffect, useState } from "react";
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
    <div className=" flex flex-col w-full bg-white cursor-pointer p-2  rounded-md  transition duration-200 hover:scale-105 ">
      <div className="flex items-center justify-between">
        <p className="text-black">{cardData.heading}</p>
        <div className="relative">
          <BsThreeDotsVertical
            onClick={() => {
              {
                setShowEdit(!showEidt);
              }
            }}
            className=" text-gray-400 hover:text-black "
          />
          {showEidt && (
            <div className="absolute top-0 left-4 w-[100px] rounded-md  flex flex-col justify-between bg-white border border-gray-300 p-2">
              <p
                className={`${
                  cardData.status === "todo"
                    ? "text-purple-700"
                    : cardData.status === "progress"
                    ? "text-orange-400"
                    : cardData.status == "completed"
                    ? "text-green-500"
                    : "text-red-500"
                }  pl-1 text-sm   `}
              >
                {cardData.status}
              </p>
              <p className=" text-gray-500 pl-1 text-sm   hover:text-black">
                Edit task
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between  items-center ">
        <p className="text-sm text-gray-500">{cardData.date}</p>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-gray-500">{cardData.time}</p>
          <p
            className={`${
              cardData.status === "todo"
                ? "bg-purple-500"
                : cardData.status === "progress"
                ? "bg-orange-400"
                : cardData.status == "completed"
                ? "bg-green-500"
                : "bg-red-500"
            } size-2 rounded-full `}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default TaskCardSmall;

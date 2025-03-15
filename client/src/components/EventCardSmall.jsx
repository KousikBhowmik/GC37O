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

const EventCardSmall = ({ cardValue, id, deleteHandel }) => {
  const [cardData, setCardData] = useState(cardValue);
  const [showEidt, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const tempTime = { 
      year: getYear(cardData.eventTime).toString().slice(2),
      month: (getMonth(cardData.eventTime) + 1).toString().padStart(2, "0"),
      date: getDate(cardData.eventTime).toString().padStart(2, "0"),
      hour: getHours(cardData.eventTime).toString().padStart(2, "0"),
      minute: getMinutes(cardData.eventTime).toString().padStart(2, "0"),
      amPm: format(cardData.eventTime, "a"),
      week: format(cardData.eventTime, "EEEE").slice(0, 3),
    };
    const date = `${tempTime.year}/${tempTime.month}/${tempTime.date}`;
    const time = `${tempTime.week}, ${tempTime.hour}:${tempTime.minute} ${tempTime.amPm}`;
    setCardData({ ...cardData, date: date, time: time });
  }, [cardValue]);
  return showDelete ? (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-20 backdrop-blur-sm bg-black/30 text-black flex items-center justify-center  ">
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
              setShowEdit(false);
            }}
            className="py-1 px-4 border border-red-500 hover:bg-gray-100 rounded-sm  text-red-500 cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div
      onMouseLeave={() => setShowEdit(false)}
      className=" flex flex-col w-full bg-white cursor-pointer p-2  rounded-md  transition duration-200 hover:scale-105 "
    >
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
                Edit event
              </p>
              <p
                onClick={() => {
                  setShowDelete(true);
                }}
                className=" text-red-400 pl-1 text-sm   hover:text-red-500"
              >
                Delete
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between  items-center ">
        <p className="text-sm text-gray-500">{cardData.date}</p>
        <p className="text-sm text-gray-500 pr-1.5">{cardData.time}</p>
      </div>
    </div>
  );
};

export default EventCardSmall;

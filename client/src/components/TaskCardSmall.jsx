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
import { IoCloseOutline } from "react-icons/io5";
import LoadingCom from "./LoadingCom";
import { toast } from "react-toastify";
import { apiClient } from "../libs/axiosConfig.js";
import { deleteTaskRoute, updateTaskRoute } from "../utils/constant.js";
import { useTasks } from "../store/useStore.js";

const TaskCardSmall = ({ cardValue}) => {
  const [cardData, setCardData] = useState(cardValue);
  const [showEidt, setShowEdit] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userTasks, setUserTasks } = useTasks();

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

  const [status, setStatus] = useState(
    ["todo", "progress", "pending", "completed"].filter(
      (item) => item !== cardValue?.status
    )
  );

  const updateTask = async (e) => {
    setIsLoading((prev) => !prev);
    try {
      const { data } = await apiClient.put(
        `${updateTaskRoute}/${cardValue._id}`,
        {
          status: e.target.textContent,
        },
        { withCredentials: true }
      );
      if (data?.success) {

        setUserTasks(
          userTasks.map((task) =>
            task._id === data.task._id ? data.task : task
          )
        );
      }
    } catch (error) {
      toast.error("Try sometime later");
    }

    setShowEdit(false);
    setIsLoading((prev) => !prev);
    setIsEdit(false);
  };

  const deleteTask = async () => {
    setIsLoading((prev) => !prev);

    try {
      const { data } = await apiClient.delete(
        `${deleteTaskRoute}/${cardValue._id}`,
        { withCredentials: true }
      );

      if (data?.success) {
        setUserTasks(userTasks.filter((item) => item._id !== cardValue._id));
      }
    } catch (error) {
      toast.error("Fieled to delete task");
    }
    setShowDelete(false);
    setIsLoading((prev) => !prev);
  };

  if (isEdit)
    return (
      <div className="fixed mx-2 md:mx-0 left-0 top-0 right-0 bottom-0 z-20 backdrop-blur-sm text-black bg-black/30 flex items-center justify-center ">
        {isEdit && isLoading ? (
          <div className="bg-white dark:bg-[#0a0a0a]  dark:border-gray-700  w-70 md:w-100 h-40 md:h-50 rounded-xl flex items-center justify-center">
            <LoadingCom />
          </div>
        ) : (
          <div className="relative bg-white py-10 md:py-12 px-10 md:px-14 rounded-md flex flex-col  gap-6 items-center">
            <IoCloseOutline
              onClick={() => {
                setShowEdit(false);
                setIsEdit(false);
              }}
              className="absolute right-3 top-3 text-black text-xl cursor-pointer font-semibold"
            />
            <h1 className="text-2xl">Change status</h1>
            <div className="flex gap-3 flex-wrap items-center justify-center ">
              {status.map((item, index) => (
                <div
                  onClick={(e) => updateTask(e)}
                  key={index}
                  className="cursor-pointer hover:bg-gray-200 px-2 py-1 border border-gray-300 shadow-sm rounded-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

  return showDelete ? (
    <div className="fixed  left-0 top-0 right-0 bottom-0 z-20 backdrop-blur-sm text-black bg-black/30 flex items-center justify-center  ">
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
              onClick={() => {
                setShowEdit(false);
                setShowDelete(false);
              }}
              className="py-1 px-4 border border-black hover:bg-gray-100  rounded-sm cursor-pointer"
            >
              No
            </button>
            <button
              onClick={(deleteTask)}
              className="py-1 px-4 border border-red-500 hover:bg-gray-100 rounded-sm  text-red-500 cursor-pointer"
            >
              Yes
            </button>
          </div>
        </div>
      )}
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
              <p
                onClick={() => setIsEdit(true)}
                className=" text-gray-500 pl-1 text-sm   hover:text-black"
              >
                Edit task
              </p>
              <p
                onClick={() => setShowDelete(true)}
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../store/useStore.js";
import { CgProfile } from "react-icons/cg";
import { LuMoonStar } from "react-icons/lu";
import { IoSunny } from "react-icons/io5";

const Navbar = ({ activeState, setActiveState }) => {
  const [isProfileCard, setIsProfileCard] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <div className="w-full border flex flex-col gap-2  border-b-gray-300 dark:border-b-gray-700 px-[3vw] pt-2 pb-1 dark:bg-[#0a0a0a] ">
      <div className="flex justify-between">
        <h1
          onClick={() => navigate("/")}
          className="font-mono pl-2 text-2xl font-semibold  cursor-pointer dark:text-gray-100 "
        >
          GC37O
        </h1>
        <div
          onClick={toggleDarkMode}
          className="dark:text-white cursor-pointer"
        >
          mode
        </div>
        <div className="flex gap-5 items-center">
          <div className="relative">
            <CgProfile
              onClick={() => setIsProfileCard((prev) => !prev)}
              className=" text-3xl dark:text-white  cursor-pointer"
            />
            <div
              className={` ${
                isProfileCard ? " flex flex-col gap-2 " : "hidden"
              } absolute top-9 right-0 border border-gray-300 z-10 dark:text-white dark:border-gray-700 p-4 rounded-md bg-white dark:bg-[#0a0a0a]`}
            >
              <div className="flex flex-col gap-1 pl-2">
                <p className="font-semibold">Kousik Bhowmik</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  kousikbhowmik888@gamil.com
                </p>
              </div>
              <p className="pl-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:bg-gray-100 py-2 rounded-md hover:text-black dark:hover:bg-[#4545455b] dark:hover:text-white ">
                Account Settings
              </p>
              <div
                onClick={toggleDarkMode}
                className="flex justify-between items-center px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4545455b] rounded-md py-2 "
              >
                <p className=" text-gray-600 dark:text-gray-400    hover:text-black  dark:hover:text-white ">
                  Theme
                </p>
                <div className="flex items-center justify-center gap-2">
                  {isDarkMode ? (
                    <IoSunny className="text-green-500" />
                  ) : (
                    <LuMoonStar className="text-green-500" />
                  )}
                </div>
              </div>
              <p className="pl-2 cursor-pointer text-red-500 dark:text-red-400 hover:bg-gray-100 py-2 rounded-md hover:text-red-500 dark:hover:bg-[#4545455b]  ">
                Log Out
              </p>
            </div>
          </div>
          <button className=" cursor-pointer border-1 border-gray-300 dark:border-gray-500 rounded-sm dark:text-white px-3 lg:px-4 py-1  hidden md:flex hover:bg-gray-100 dark:hover:bg-[#0a0a0a]  font-semibold ">
            Feedback
          </button>
        </div>
      </div>
      <div>
        <ul className="flex text-gray-500 text-sm font-serif gap-2 ">
          <li
            onClick={() => setActiveState("all")}
            className={`relative cursor-pointer py-1 px-4 hover:bg-gray-200 dark:hover:bg-[#ffffff20] dark:hover:text-white  hover:text-black rounded-sm 
                after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-black dark:after:bg-white 
              after:transition-all after:duration-300  ${
                activeState === "all"
                  ? "after:w-full text-black dark:text-white"
                  : "after:w-0"
              }`}
          >
            All
          </li>
          <li
            onClick={() => setActiveState("tasks")}
            className={`relative cursor-pointer py-1 px-4 hover:bg-gray-200 dark:hover:bg-[#ffffff20] dark:hover:text-white  hover:text-black rounded-sm 
              after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-black dark:after:bg-white 
              after:transition-all after:duration-300 ${
                activeState === "tasks"
                  ? "after:w-full text-black dark:text-white"
                  : "after:w-0"
              } `}
          >
            Tasks
          </li>
          <li
            onClick={() => setActiveState("events")}
            className={`relative cursor-pointer py-1 px-4 hover:bg-gray-200 dark:hover:bg-[#ffffff20] dark:hover:text-white  hover:text-black rounded-sm 
              after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-black dark:after:bg-white 
              after:transition-all after:duration-300 ${
                activeState === "events"
                  ? "after:w-full text-black dark:text-white"
                  : "after:w-0"
              } `}
          >
            Events
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

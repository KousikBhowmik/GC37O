import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

const SingupForm = ({
  loginPage,
  setLoginPage,
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
}) => {
  const [singupState, setSingupState] = useState("sendOtp");
  const [showPassword, setShowPassword] = useState(true);
  const [showReenter, setShowReenter] = useState(true);

  return (
    <div className="w-full lg:px-8 flex flex-col gap-7 ">
      {(singupState === "sendOtp" || singupState === "verifyOtp") && (
        <div className="flex flex-col gap-7">
          <input
            className="placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
            type="email"
            placeholder="Enter email"
          />

          <input
            className="placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
            type="email"
            placeholder="Enter OTP"
          />
        </div>
      )}
      {singupState === "singUp" && (
        <div className="flex flex-col gap-7">
          <div className="relative">
            <input
              className="w-full placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
              type={showPassword ? "password" : "text"}
              placeholder="Enter password"
            />
            {showPassword ? (
              <FaRegEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[30%] right-[15px] dark:text-gray-500 cursor-pointer "
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[30%] right-[15px] dark:text-gray-500 cursor-pointer "
              />
            )}
          </div>

          <div className="relative">
            <input
              className=" w-full placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
              type={showReenter ? "password" : "text"}
              placeholder="Re-enter password"
            />
            {showReenter ? (
              <FaRegEye
                onClick={() => setShowReenter(!showReenter)}
                className="absolute top-[30%] right-[15px] dark:text-gray-500 cursor-pointer "
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowReenter(!showReenter)}
                className="absolute top-[30%] right-[15px] dark:text-gray-500 cursor-pointer "
              />
            )}
          </div>
        </div>
      )}
      {loginPage === "singUp" ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm  text-center dark:text-white">
            Already have an account?{" "}
            <span
              onClick={() => setLoginPage("login")}
              className="cursor-pointer font-semibold text-blue-500 "
            >
              Login
            </span>
          </p>
          <p className="text-sm  text-center dark:text-white opacity-0 font-semibold ">
            temp
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 ">
          <p className="text-sm  text-center dark:text-white">
            Back to
            <span
              onClick={() => setLoginPage("login")}
              className="cursor-pointer font-semibold text-blue-500 ml-1"
            >
              Login Page
            </span>
          </p>
          <p className="text-sm  text-center dark:text-white">
            Don't have an account?{" "}
            <span
              onClick={() => setLoginPage("singUp")}
              className="cursor-pointer font-semibold text-blue-500 "
            >
              SingUp
            </span>
          </p>
        </div>
      )}
      {/* --------------- Send OTP, Verify OTP, Sing up, Password reset Button ---------------- */}
      {loginPage === "singUp" ? (
        <button className="bg-black dark:bg-white text-white dark:text-black  font-semibold  py-2 rounded-md cursor-pointer">
          {" "}
          {singupState === "sendOtp" ? "Send OTP" : "Sing Up"}{" "}
        </button>
      ) : (
        <button className="bg-black dark:bg-white text-white dark:text-black  font-semibold  py-2 rounded-md cursor-pointer">
          {" "}
          {singupState === "sendOtp" ? "Send OTP" : "Reset Password"}{" "}
        </button>
      )}
    </div>
  );
};

export default SingupForm;

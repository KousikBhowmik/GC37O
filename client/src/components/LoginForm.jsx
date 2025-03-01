import React, { useState } from "react";

import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

const LoginForm = ({
  loginPage,
  setLoginPage,
  emailInput,
  setEmailInput,
  passwordInput,
  setPasswordInput,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  return (
    <div className="w-full lg:px-8 flex flex-col gap-7 ">
      <input
        className="placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
        type="email"
        placeholder="Enter email"
      />

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

      <div className="flex flex-col gap-2">
        <p className="text-sm  text-center dark:text-white">
          Don't have an account?{" "}
          <span
            onClick={() => setLoginPage("singUp")}
            className="cursor-pointer font-semibold text-blue-500 "
          >
            SingUp
          </span>
        </p>
        <p className="text-sm  text-center dark:text-white">
          <span
            onClick={() => setLoginPage("resetPass")}
            className="cursor-pointer font-semibold text-blue-500 mr-1 "
          >
            Reset
          </span>
          your password
        </p>
      </div>
      <button className="bg-black dark:bg-white text-white dark:text-black  font-semibold  py-2 rounded-md cursor-pointer ">
        Login
      </button>
    </div>
  );
};

export default LoginForm;

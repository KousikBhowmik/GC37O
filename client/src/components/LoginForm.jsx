import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { emailCheck, passwrodCheck } from "../utils/helperFunctions";
import { apiClient } from "../libs/axiosConfig";
import { emailExistRoute, singUpRoute } from "../utils/constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLoggedUser } from "../store/useStore.js";

const LoginForm = (props) => {
  const {
    setLoginPage,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    setIsLoading,
  } = props;
  const [showPassword, setShowPassword] = useState(true);
  const { setLoggedUser } = userLoggedUser();
  const navigate = useNavigate();

  const loginHandel = async () => {
    if (!emailCheck(emailInput)) return;
    if (passwordInput.length === 0) {
      toast.info("Enter a Password");
      return;
    } else if (passwordInput.length > 100) {
      toast.info("Password is too long");
      return;
    }

    setIsLoading((prev) => !prev);
    try {
      const { data } = await apiClient.get(emailExistRoute, {
        params: {
          email: emailInput,
        },
      });
      if (!data?.success) {
        toast.info("Email does not exist");
        setIsLoading((prev) => !prev);
        return;
      } else if (data?.success && data.loginType === "google") {
        toast.info("Account linked with Google");
        toast.info("Please Login with Google");
        setIsLoading((prev) => !prev);
        return;
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
      setIsLoading((prev) => !prev);
      return;
    }

    try {
      const { data } = await apiClient.post(
        singUpRoute,
        { email: emailInput, password: passwordInput },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success("You are logged in");

        setLoggedUser(data.user);
        navigate("/dashboard/home");
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }

    setIsLoading((prev) => !prev);
  };

  return (
    <div className="w-full lg:px-8 flex flex-col gap-7 ">
      <input
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        className="placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
        type="email"
        placeholder="Enter email"
      />

      <div className="relative">
        <input
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
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
            onClick={() => {
              setPasswordInput("");
              setLoginPage("singUp");
            }}
            className="cursor-pointer font-semibold text-blue-500 "
          >
            SingUp
          </span>
        </p>
        <p className="text-sm  text-center dark:text-white">
          <span
            onClick={() => {
              setPasswordInput("");
              setLoginPage("resetPass");
            }}
            className="cursor-pointer font-semibold text-blue-500 mr-1 "
          >
            Reset
          </span>
          your password
        </p>
      </div>
      <button
        onClick={loginHandel}
        className="bg-black dark:bg-white text-white dark:text-black  font-semibold  py-2 rounded-md cursor-pointer "
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;

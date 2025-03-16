import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  emailCheck,
  otpCheck,
  passwrodCheck,
} from "../utils/helperFunctions.js";
import { apiClient } from "../libs/axiosConfig.js";
import {
  emailExistRoute,
  otpSendRoute,
  otpVerifyRoute,
  resetPasswordRoute,
  singUpRoute,
} from "../utils/constant.js";
import { useNavigate } from "react-router-dom";
import { userLoggedUser } from "../store/useStore.js";

const SingupForm = (props) => {
  const {
    loginPage,
    setLoginPage,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    setIsLoading,
    singupState,
    setSingupState,
  } = props;
  const [showPassword, setShowPassword] = useState(true);
  const [showReenter, setShowReenter] = useState(true);
  const [reEnterPasssword, setReEnterPasssword] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const { setLoggedUser } = userLoggedUser();

  const navigate = useNavigate();

  const singUpOTPsend = async () => {
    if (!emailCheck(emailInput)) return;

    setIsLoading((prev) => !prev);

    if (loginPage === "singUp") {
      try {
        const { data } = await apiClient.get(emailExistRoute, {
          params: {
            email: emailInput,
          },
        });

        if (data?.success) {
          toast.info("Exail already exist");
          setIsLoading((prev) => !prev);
          return;
        }
      } catch (error) {
        toast.error(error?.response?.data.message);
        return;
      }
    }

    try {
      // @ts-ignore
      const { data } = await apiClient.post(
        otpSendRoute,
        {
          email: emailInput,
          otpType:
            loginPage === "singUp" ? "Email verification" : "Reset password",
        },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success("OTP sent to you email");
        setSingupState("verifyOtp");
      } else toast.error(data?.message);
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
    setIsLoading((prev) => !prev);
  };

  const otpVerify = async () => {
    if (!otpCheck(otpInput)) return;
    setIsLoading((prev) => !prev);
    try {
      // @ts-ignore
      const { data } = await apiClient.post(
        otpVerifyRoute,
        {
          email: emailInput,
          otp: otpInput,
        },
        { withCredentials: true }
      );

      if (data?.success) {
        setOtpInput("");
        toast.success("OTP Verified");
        setSingupState("singUp");
      } else {
        toast.error(data?.message);
        setSingupState("sendOtp");
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
    setIsLoading((prev) => !prev);
  };

  const userRegister = async () => {
    if (!passwrodCheck(passwordInput)) return;
    if (!emailCheck(emailInput)) return;
    if (!(passwordInput === reEnterPasssword)) {
      toast.error("Both password should be match");
      return;
    }

    try {
      // @ts-ignore
      const { data } = await apiClient.post(
        singUpRoute,
        { email: emailInput, password: passwordInput },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success("SingUp successfully 🥳");
        setLoggedUser(data.user);
        navigate("/dashboard/home");
      } else {
        toast.error(data?.message);
        setLoggedUser("");
        setSingupState("sendOtp");
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
    setIsLoading((prev) => !prev);
  };

  const resetPasswordFun = async () => {
    if (!passwrodCheck(passwordInput)) return;
    if (!emailCheck(emailInput)) return;
    if (!(passwordInput === reEnterPasssword)) {
      toast.error("Both password should be match");
      return;
    }
    setIsLoading((prev) => !prev);
    try {
      const { data } = await apiClient.put(
        resetPasswordRoute,
        { email: emailInput, password: passwordInput },
        { withCredentials: true }
      );
      if (data?.success) {
        toast.success("Password reset successful");
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
    setEmailInput("");
    setPasswordInput("");
    setIsLoading((prev) => !prev);
    setLoginPage("login");
  };

  return (
    <div className="w-full lg:px-8 flex flex-col gap-7 ">
      {(singupState === "sendOtp" || singupState === "verifyOtp") && (
        <div className="flex flex-col gap-7">
          <input
            value={emailInput}
            onChange={(e) => {
              singupState === "sendOtp" && setEmailInput(e.target.value);
            }}
            className="placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
            type="email"
            placeholder="Enter email"
          />

          <input
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
            className="placeholder:text-gray-500 px-3 py-2 rounded-md border-[2px] dark:text-gray-300  border-black-400 dark:border-gray-500 outline-blue-500 dark:outline-white "
            type="number"
            placeholder="Enter OTP"
          />
        </div>
      )}
      {singupState === "singUp" && (
        <div className="flex flex-col gap-7">
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

          <div className="relative">
            <input
              value={reEnterPasssword}
              onChange={(e) => setReEnterPasssword(e.target.value)}
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
              onClick={() => {
                setSingupState("sendOtp");
                setLoginPage("login");
              }}
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
              onClick={() => {
                setSingupState("sendOtp");
                setLoginPage("login");
              }}
              className="cursor-pointer font-semibold text-blue-500 ml-1"
            >
              Login Page
            </span>
          </p>
          <p className="text-sm  text-center dark:text-white">
            Don't have an account?{" "}
            <span
              onClick={() => {
                setSingupState("sendOtp");
                setLoginPage("singUp");
              }}
              className="cursor-pointer font-semibold text-blue-500 "
            >
              SingUp
            </span>
          </p>
        </div>
      )}
      {/* --------------- Send OTP, Verify OTP, Sing up, Password reset Button ---------------- */}
      {loginPage === "singUp" ? (
        <button
          onClick={() => {
            switch (singupState) {
              case "sendOtp":
                singUpOTPsend();
                break;
              case "verifyOtp":
                otpVerify();
                break;
              default:
                userRegister();
                break;
            }
          }}
          className="bg-black dark:bg-white text-white dark:text-black  font-semibold  py-2 rounded-md cursor-pointer"
        >
          {" "}
          {singupState === "sendOtp"
            ? "Send OTP"
            : singupState === "verifyOtp"
            ? "Verify OTP"
            : "Sing Up"}{" "}
        </button>
      ) : (
        <button
          onClick={() => {
            switch (singupState) {
              case "sendOtp":
                singUpOTPsend();
                break;
              case "verifyOtp":
                otpVerify();
                break;
              default:
                resetPasswordFun();
                break;
            }
          }}
          className="bg-black dark:bg-white text-white dark:text-black  font-semibold  py-2 rounded-md cursor-pointer"
        >
          {" "}
          {singupState === "sendOtp"
            ? "Send OTP"
            : singupState === "verifyOtp"
            ? "Verify OTP"
            : "Reset Password"}
        </button>
      )}
    </div>
  );
};

export default SingupForm;

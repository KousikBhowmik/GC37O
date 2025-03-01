// @ts-nocheck
import React, { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import SingupForm from "../components/SingupForm.jsx";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [loginPage, setLoginPage] = useState("login");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-100 dark:bg-black-400">
      {/* --------------------- User loign/singup div ---------------------- */}
      <div className="w-[90vw] md:w-[50vw] max-w-[500px] h-[62vh] flex flex-col gap-7  items-center p-6 rounded-md  bg-white dark:bg-black-200 shadow-2xl dark:shadow-xl dark:shadow-black-500 ">
        <h1 className="text-2xl lg:text-3xl font-semibold dark:text-gray-300 mt-[15px] ">
          {loginPage === "login"
            ? "Login"
            : loginPage === "singUp"
            ? "Sing Up"
            : "Reset Password"}
        </h1>

        {/* ------------------------- Login and sing up forms ------------------------ */}
        {loginPage === "login" ? (
          <LoginForm
            loginPage={loginPage}
            setLoginPage={setLoginPage}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
          />
        ) : loginPage === "singUp" ? (
          <SingupForm
            loginPage={loginPage}
            setLoginPage={setLoginPage}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
          />
        ) : (
          <SingupForm
            loginPage={loginPage}
            setLoginPage={setLoginPage}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
          />
        )}
        <div className="w-full lg:px-8">
          <button className="w-full cursor-pointer font-semibold flex items-center justify-center  gap-2 py-2  rounded-md bg-gray-300 text-black ">
            {loginPage === "login" || loginPage === "resetPass" ? "Login with" : "SingUp with"}
            <FcGoogle className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

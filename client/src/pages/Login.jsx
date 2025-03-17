// @ts-nocheck
import React, { Profiler, useEffect, useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import SingupForm from "../components/SingupForm.jsx";
import { FcGoogle } from "react-icons/fc";
import LoadingCom from "../components/LoadingCom.jsx";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { apiClient } from "../libs/axiosConfig.js";
import { googleLoginRoute } from "../utils/constant.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { userLoggedUser } from "../store/useStore.js";
import Cookies from "js-cookie";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = () => {
  const [loginPage, setLoginPage] = useState("login");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [singupState, setSingupState] = useState("sendOtp");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoggedUser } = userLoggedUser();

  const loginWithGoogle = async () => {
    try {
      setIsLoading((prev) => !prev);
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const { data } = await apiClient.post(
        googleLoginRoute,
        { idToken: token },
        { withCredentials: true }
      );

      if (data?.success) {
        toast.success("Logged in with Google");
        setLoggedUser(data.user);
        navigate("/dashboard/home");
      } else {
        toast.error(data?.message);
        setLoggedUser("");
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Sign-in cancelled!");
      } else {
        toast.error(error?.response?.data.message);
      }
      setLoggedUser("");
    }
    setIsLoading((prev) => !prev);
  };

  useEffect(() => {
    if (Cookies.get("user-token")) {
      navigate("/dashboard/home");
    }
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-100 dark:bg-black-400  ">
      <h1 className="font-mono font-semibold text-2xl text-blue-500 absolute top-3 left-3">
        GC37O
      </h1>
      {isLoading ? (
        // ------------------------ Loading screen ----------------------------
        <div className="w-[90vw] md:w-[50vw] max-w-[500px] h-[62vh] flex items-center justify-center  rounded-md  bg-white dark:bg-black-200 shadow-2xl dark:shadow-xl dark:shadow-black-500">
          <LoadingCom />
        </div>
      ) : (
        <div className="w-[90vw] md:w-[50vw] max-w-[500px] h-[62vh] flex flex-col gap-7  items-center p-6 rounded-md  bg-white dark:bg-black-200 shadow-2xl dark:shadow-xl dark:shadow-black-500 ">
          {/* ----------------------------- Heading -------------------------- */}
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
              setLoginPage={setLoginPage}
              emailInput={emailInput}
              setEmailInput={setEmailInput}
              passwordInput={passwordInput}
              setPasswordInput={setPasswordInput}
              setIsLoading={setIsLoading}
            />
          ) : loginPage === "singUp" ? (
            <SingupForm
              loginPage={loginPage}
              setLoginPage={setLoginPage}
              emailInput={emailInput}
              setEmailInput={setEmailInput}
              passwordInput={passwordInput}
              setPasswordInput={setPasswordInput}
              setIsLoading={setIsLoading}
              singupState={singupState}
              setSingupState={setSingupState}
            />
          ) : (
            <SingupForm
              loginPage={loginPage}
              setLoginPage={setLoginPage}
              emailInput={emailInput}
              setEmailInput={setEmailInput}
              passwordInput={passwordInput}
              setPasswordInput={setPasswordInput}
              setIsLoading={setIsLoading}
              singupState={singupState}
              setSingupState={setSingupState}
            />
          )}
          {/* --------------------------- Google singup / Login button ------------------------ */}
          <div className="w-full lg:px-8">
            <button
              onClick={loginWithGoogle}
              className="w-full cursor-pointer font-semibold flex items-center justify-center  gap-2 py-2  rounded-md bg-gray-300 text-black "
            >
              {loginPage === "login" || loginPage === "resetPass"
                ? "Login with"
                : "SingUp with"}
              <FcGoogle className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

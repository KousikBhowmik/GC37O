import React, { useEffect, useState } from "react";
import LoadingCom from "../components/LoadingCom.jsx";
import { apiClient } from "../libs/axiosConfig.js";
import { getUserRoute } from "../utils/constant.js";
import { toast } from "react-toastify";
import Login from "../pages/Login.jsx";
import { userLoggedUser } from "../store/useStore.js";
import Cookies from "js-cookie";

const LoginValid = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { loggedUser, setLoggedUser } = userLoggedUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await apiClient.get(getUserRoute, {
          withCredentials: true,
        });

        if (data?.success) {
          setLoggedUser(data.user);
          console.log(data.user);
        } else {
          toast.error(data?.message || "Authentication failed!");
          Cookies.remove("user-token");
        }
      } catch (error) {
        toast.error("Error fetching user data!");
        console.error("Error:", error);
        Cookies.remove("user-token");
      } finally {
        console.log("success");
        setIsLoading((prev) => !prev);
      }
    };
    if (loggedUser === "") getUser();
  }, [loggedUser]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingCom />
      </div>
    );

  return loggedUser ? <>{children}</> : <Login />;
};

export default LoginValid;

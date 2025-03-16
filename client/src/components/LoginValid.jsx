import React, { useEffect, useState } from "react";
import LoadingCom from "../components/LoadingCom.jsx";
import { apiClient } from "../libs/axiosConfig.js";
import { getUserRoute } from "../utils/constant.js";
import { toast } from "react-toastify";
import { userLoggedUser } from "../store/useStore.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginValid = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { loggedUser, setLoggedUser } = userLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      setIsLoading((prev) => !prev);
      try {
        const { data } = await apiClient.get(getUserRoute, {
          withCredentials: true,
        });

        if (data?.success) {
          setLoggedUser(data.user);
        } else {
          handleAuthFailure(data?.message || "Authentication failed!");
        }
      } catch (error) {
        handleAuthFailure("Error fetching user data!");
      }
      setIsLoading((prev) => !prev);
    };

    const handleAuthFailure = (message) => {
      navigate("/login");
      Cookies.remove("user-token");
    };
    if (!loggedUser) getUser();
  }, [loggedUser, setLoggedUser, navigate]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingCom />
      </div>
    );

  return loggedUser ? <>{children}</> : null;
};

export default LoginValid;

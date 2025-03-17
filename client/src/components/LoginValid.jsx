import React, { useEffect, useState } from "react";
import LoadingCom from "../components/LoadingCom.jsx";
import { apiClient } from "../libs/axiosConfig.js";
import { getUserRoute } from "../utils/constant.js";
import { toast } from "react-toastify";
import { userLoggedUser } from "../store/useStore.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginValid = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { loggedUser, setLoggedUser } = userLoggedUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("user-token");

    if (!token) {
      navigate("/login");
      return;
    }

    const getUser = async () => {
      try {
        const { data } = await apiClient.get(getUserRoute, {
          withCredentials: true,
        });

        if (data?.success) {
          setLoggedUser(data.user);
        } else {
          handleAuthFailure();
        }
      } catch (error) {
        console.error(
          "Authentication Error:",
          error?.response?.data || error.message
        );
        handleAuthFailure();
      } finally {
        setIsLoading(false);
      }
    };

    const handleAuthFailure = () => {
      Cookies.remove("user-token");
      navigate("/login");
    };

    getUser();
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingCom />
      </div>
    );

  return loggedUser ? <>{children}</> : null;
};

export default LoginValid;

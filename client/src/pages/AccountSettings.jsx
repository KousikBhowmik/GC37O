import React, { useState, useEffect } from "react";
import { useAccountSettingsPage, userLoggedUser } from "../store/useStore.js";
import { MdOutlineCloudUpload } from "react-icons/md";

const AccountSettings = () => {
  const { isAccountSettingsPage, setIsAccountSettingsPage } =
    useAccountSettingsPage();
  const { loggedUser, setLoggedUser } = userLoggedUser();

  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(loggedUser.name || "");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // @ts-ignore
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 backdrop-blur-sm bg-black/30 z-20 flex items-center justify-center">
      <div className="w-[90%]    lg:w-[60%] h-[75vh]  xl:h-[70vh]  bg-white dark:bg-[#0a0a0a] rounded-xl flex justify-center dark:border  dark:border-gray-900 gap-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl md:text-4xl dark:text-white font-semibold mt-6 mb-4">
            Account Settings
          </h1>
          <div className="flex flex-col gap-4 items-center ">
            {image ? (
              <img
                src={image}
                alt="Profile Preview"
                className="size-30  rounded-full object-cover"
              />
            ) : (
              <div className="size-30  rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center">
                <MdOutlineCloudUpload className="text-[65px] text-gray-400 dark:text-gray-300" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-upload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="profile-upload"
              className="cursor-pointer border border-gray-300 dark:bg-black dark:text-gray-400 dark:border-gray-700 shadow-sm  text-black  w-64 text-center py-2 rounded-sm"
            >
              Upload picture
            </label>
          </div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="w-64 border border-gray-300 dark:border-gray-700 shadow-sm p-2 pl-4 rounded-sm dark:bg-black dark:text-gray-400 placeholder:text-gray-400"
            
          />
          <div className="flex items-center justify-center gap-4 mt-2">
            <button className="cursor-pointer  px-4 py-1 rounded-sm bg-blue-500 text-white   ">
              Save
            </button>
            <button
              className="cursor-pointer  px-4 py-1 rounded-sm bg-black dark:bg-white text-white dark:text-black"
              onClick={() => {
                setIsAccountSettingsPage(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

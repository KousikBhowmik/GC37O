import React, { useState } from "react";
import LoadingCom from "../components/LoadingCom";
import { IoCloseOutline } from "react-icons/io5";
import { useFeedbackPage } from "../store/useStore.js";
import { toast } from "react-toastify";
import { apiClient } from "../libs/axiosConfig.js";
import { feedbackRoute } from "../utils/constant.js";

const Feedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("Feedback");
  const [description, setDescription] = useState("");
  const { feedbackPageState, setFeedbackPageState } = useFeedbackPage();

  const sendFeedback = async () => {
    if (subject.length > 40) {
      toast.error("Enter a valid subject");
      toast.info("Message max length is 40");
      return;
    }
    if (description.length < 20 || description.length > 500) {
      toast.error("Enter a valid message");
      toast.info("Message length min 20 to 500");
      return;
    }

    setIsLoading((prev) => !prev);

    try {
      const { data } = await apiClient.post(
        feedbackRoute,
        {
          subject: subject.length < 5 ? "Feedback" : subject,
          message: description,
        },
        {
          withCredentials: true,
        }
      );
      if (data?.success) {
        toast.success("Feddback sent successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Unable to send Feedback");
    }

    setIsLoading((prev) => prev);
    setFeedbackPageState(false);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 backdrop-blur-sm bg-black/30 z-20 flex items-center justify-center">
      <div className="w-[90%]  relative  lg:w-[60%] h-[75vh]  xl:h-[70vh]  bg-white dark:bg-[#0a0a0a] rounded-xl flex   justify-center dark:border  dark:border-gray-900 gap-4">
        {isLoading ? (
          <LoadingCom />
        ) : (
          <div className="flex items-center flex-col w-[90%] sm:w-[70%] lg:-[60%]  p-8 md:p-14 gap-4">
            <IoCloseOutline
              className="absolute top-4 dark:text-white right-4 text-xl cursor-pointer"
              onClick={() => setFeedbackPageState(false)}
            />
            <h1 className="dark:text-white text-2xl md:text-4xl mb-3">
              Feedback Form
            </h1>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              className="border border-gray-300 shadow-sm w-full dark:border-gray-700   text-sm rounded-sm h-[40px] text-black dark:text-white placeholder-gray-500   dark:placeholder:text-white  px-4 dark:bg-black"
              placeholder={`Enter subject`}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 dark:border-gray-700 w-full rounded-sm text-sm px-3 py-3 dark:text-white dark:placeholder:text-white placeholder-gray-500 border border-gray-300 text-black shadow-sm resize-y dark:bg-black"
              placeholder="Enter description"
            ></textarea>

            <button
              onClick={sendFeedback}
              className="py-2 px-10 bg-black dark:bg-white text-white dark:text-black  mt-3 rounded-md font-semibold cursor-pointer "
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;

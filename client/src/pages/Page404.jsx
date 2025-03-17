import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const Page404 = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-20 flex flex-col items-center justify-center bg-gray-100 dark:bg-[#0a0a0a] text-black dark:text-gray-200 p-4">
      <FaExclamationTriangle className="text-red-500 text-7xl sm:text-8xl mb-4" />
      <h1 className="text-3xl sm:text-5xl font-bold">404</h1>
      <p className="text-center text-base sm:text-lg md:text-xl max-w-md mb-4">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Page404;

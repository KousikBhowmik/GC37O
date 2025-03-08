import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white border border-gray-300 dark:border-gray-700 w-full max-w-sm p-3 rounded-lg transition duration-300 text-sm text-center">
      <h2 className="text-lg font-semibold">
        {format(currentTime, "EEEE, dd MMMM yyyy")}
      </h2>
      <h1 className="text-2xl font-semibold mt-2">
        {format(currentTime, "hh:mm:ss a")}
      </h1>
    </div>
  );
};

export default CurrentTime;

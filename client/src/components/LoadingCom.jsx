import { motion } from "framer-motion";
import React from "react";

const LoadingCom = () => {
  return (
    <div className="flex justify-center items-center  ">
      <motion.div
        className="w-10 lg:w-12 h-10 lg:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default LoadingCom;

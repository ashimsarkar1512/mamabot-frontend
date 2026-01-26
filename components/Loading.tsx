"use client";
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const dotTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex space-x-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-5 h-5 bg-gray-400 rounded-full"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{ ...dotTransition, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;

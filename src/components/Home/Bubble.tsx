"use client";
import "../../styles/bubble.scss";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { getRandomNumber } from "@/utils/randomGen";

const Bubble = () => {
  const bubblee = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubblee && bubblee.current) {
      const bubbleElement = bubblee.current;
      console.log(window.innerHeight);
      bubbleElement.style.left = `${getRandomNumber(
        80,
        window.innerWidth - 200
      )}px`;
      bubbleElement.style.top = `${getRandomNumber(
        80,
        window.innerHeight - 200
      )}px`;
    }
  }, [bubblee]);

  return (
    <motion.div
      drag={true}
      whileTap={{ scale: 0.99 }}
      className="bubble-wrapper"
      ref={bubblee}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
        className="bubble"
      >
        <motion.div className="bubble-fill"></motion.div>
      </motion.div>

      <motion.div initial={false} className="bubble-shine"></motion.div>
    </motion.div>
  );
};

export default Bubble;

import "../../styles/pointer2d.scss";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Pointer2d = () => {
  const trackPointer2d = useRef<HTMLDivElement>(null);
  const innerSpacePointer2d = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add the event listener
    document.addEventListener("mousemove", followMovements);

    // Remove the event listener in the cleanup function
    return () => {
      document.removeEventListener("mousemove", followMovements);
    };
  }, []);

  // Define the event listener function
  function followMovements(e: MouseEvent) {
    console.log("moving");
    if (trackPointer2d && trackPointer2d.current) {
      console.log("DIV", trackPointer2d);
      console.log("MOUSE", e);
      trackPointer2d.current.style.top =
        e.clientY - trackPointer2d.current.offsetHeight / 2 + "px";
      trackPointer2d.current.style.left =
        e.clientX - trackPointer2d.current.offsetWidth / 2 + "px";
    }
  }

  return (
    <motion.div
      className="pointer2d"
      ref={trackPointer2d}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1,
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
    >
      <div className="innerSpacePointer2d" ref={innerSpacePointer2d}></div>
    </motion.div>
  );
};

export default Pointer2d;

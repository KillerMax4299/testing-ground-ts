import React, { useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { cn } from "@/lib/utils";

const FramerMotion = () => {
  const [frame, setFrame] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);

  const nextFrame = () => {
    setDirection(1);
    setFrame((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const prevFrame = () => {
    setDirection(-1);
    setFrame((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="mx-auto mt-20 w-36">
      <div className="relative h-36 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          {frame === 1 && (
            <Frame
              key={1}
              frameNum={1}
              className="bg-green-500"
              custom={direction}
            />
          )}
          {frame === 2 && (
            <Frame
              key={2}
              frameNum={2}
              className="bg-amber-400"
              custom={direction}
            />
          )}
          {frame === 3 && (
            <Frame
              key={3}
              frameNum={3}
              className="bg-red-600"
              custom={direction}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="mt-2 flex justify-between">
        <button
          className={cn(
            "rounded-md bg-blue-400 px-2 py-1 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300",
          )}
          onClick={prevFrame}
          disabled={frame === 1}
        >
          prev
        </button>
        <button
          className={cn(
            "rounded-md bg-blue-400 px-2 py-1 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300",
          )}
          onClick={nextFrame}
          disabled={frame === 3}
        >
          next
        </button>
      </div>
    </div>
  );
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0.7,
      scale:1
    };
  },
  center: {
    x: 0,
    opacity: 1,
    scale:1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0.7,
      scale:0.3
    };
  },
};

const Frame = ({
  frameNum,
  className,
  custom,
}: {
  frameNum: number;
  className: string;
  custom: number;
}) => {
  return (
    <motion.div
      variants={variants}
      custom={custom}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        // x: { type: "spring", stiffness: 300, damping: 30 },
        duration: 0.3,
        ease: cubicBezier(0.4, 0, 0.2, 1),
        opacity: { duration: 0.2 },
      }}
      className={cn(
        "absolute left-0 top-0 flex size-36 items-center justify-center rounded-md border bg-neutral-400 capitalize text-black",
        className,
      )}
    >
      <div>

      frame {frameNum}
      </div>
    </motion.div>
  );
};

export default FramerMotion;
